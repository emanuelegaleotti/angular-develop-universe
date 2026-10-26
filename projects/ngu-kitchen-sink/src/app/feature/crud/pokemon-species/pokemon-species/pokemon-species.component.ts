import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CrudPagerComponent } from '../../shared/crud-pager/crud-pager.component';
import { CrudRowActionsComponent } from '../../shared/crud-row-actions/crud-row-actions.component';
import { InputSearchComponent, SelectComponent } from 'angular-develop-universe/inputs';
import { NguOffcanvasService, NguDialogService } from 'angular-develop-universe/dialogs';
import { PokemonSpeciesService } from '../pokemon-species.service';
import { NamedApiResource, PokeApiPage } from '../../shared/pokeapi.utils';
import { PokemonSpeciesActions } from '../state/pokemon-species.actions';
import { selectCurrentPage, selectPageSize, selectSearchTerm } from '../state/pokemon-species.selectors';
import { PokemonSpeciesDetailComponent } from '../pokemon-species-detail/pokemon-species-detail.component';
import { PokemonSpeciesDeleteComponent } from '../pokemon-species-delete/pokemon-species-delete.component';

@Component({
  selector: 'app-pokemon-species',
  standalone: true,
  imports: [RouterLink, CrudPagerComponent, CrudRowActionsComponent, ReactiveFormsModule, InputSearchComponent, SelectComponent],
  templateUrl: './pokemon-species.component.html',
  styleUrl: './pokemon-species.component.scss',
})
export class PokemonSpeciesComponent implements OnInit {
  private store = inject(Store);
  private pokemonSpeciesService = inject(PokemonSpeciesService);
  private offcanvasService = inject(NguOffcanvasService);
  private dialogService = inject(NguDialogService);

  page = this.store.selectSignal(selectCurrentPage);
  pageSize = this.store.selectSignal(selectPageSize);
  search = this.store.selectSignal(selectSearchTerm);

  pageData = signal<PokeApiPage | null>(null);
  count = computed(() => this.pageData()?.count ?? 0);
  results = computed(() => this.pageData()?.results ?? []);

  readonly pageSizeOptions: string[] = ['10', '15', '20', '25'];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  pageForm = new FormGroup({
    pageSize: new FormControl('20'),
  });

  ngOnInit(): void {
    this.pageForm.controls['pageSize'].setValue(String(this.pageSize()), { emitEvent: false });
    this.observePage();
    this.getPokemonSpecies();
  }

  searchPokemonSpecies(): void {
    const term = this.searchForm.controls['search'].value?.trim() ?? '';
    this.store.dispatch(PokemonSpeciesActions.setSearchTerm({ searchTerm: term }));
    this.getPokemonSpecies();
  }

  observePage(): void {
    this.pageForm.controls['pageSize'].valueChanges.subscribe(val => {
      this.store.dispatch(PokemonSpeciesActions.setPageSize({ pageSize: Number(val ?? '20') }));
      this.getPokemonSpecies();
    });
  }

  onPageSelected(page: number): void {
    this.store.dispatch(PokemonSpeciesActions.setPage({ page }));
    this.getPokemonSpecies();
  }

  onView(item: NamedApiResource): void {
    const o = this.offcanvasService.createOffcanvas(
      PokemonSpeciesDetailComponent,
      {
        position: 'right',
        offcanvasCloseIcon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        `,
        id: 'pokemon-species-detail-offcanvas',
        offcanvasData: { name: item.name },
        offcanvasTitle: item.name,
      }
    );
    o.show();
  }

  onDelete(item: NamedApiResource): void {
    const d = this.dialogService.createDialog(
      PokemonSpeciesDeleteComponent,
      {
        id: 'pokemon-species-delete-dialog',
        dialogData: { name: item.name },
      }
    );
    d.whenClose.subscribe((result: any) => {
      if (result === 'deleted') this.getPokemonSpecies();
    });
    d.show();
  }

  private getPokemonSpecies(): void {
    this.pokemonSpeciesService.getPage(this.page(), this.pageSize(), this.search()).subscribe(data =>
      this.pageData.set(data),
    );
  }
}
