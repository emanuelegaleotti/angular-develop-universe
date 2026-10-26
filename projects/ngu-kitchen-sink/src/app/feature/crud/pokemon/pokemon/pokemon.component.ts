import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputSearchComponent, SelectComponent} from 'angular-develop-universe/inputs';
import { NguOffcanvasService, NguDialogService } from 'angular-develop-universe/dialogs';
import {PokemonService} from '../pokemon.service';
import {PokemonListItem} from '../pokemon.model';
import {NgOptimizedImage} from "@angular/common";
import {PokeApiPage} from "../../shared/pokeapi.utils";
import {PokemonDetailComponent} from '../pokemon-detail/pokemon-detail.component';
import { PokemonDeleteComponent } from '../pokemon-delete/pokemon-delete.component';
import {CrudPagerComponent} from '../../shared/crud-pager/crud-pager.component';
import {CrudRowActionsComponent} from '../../shared/crud-row-actions/crud-row-actions.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [RouterLink, CrudPagerComponent, CrudRowActionsComponent, ReactiveFormsModule, InputSearchComponent, SelectComponent, NgOptimizedImage],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit {
  page = signal(1);
  pageData = signal<PokeApiPage<PokemonListItem> | null>(null);
  pageSize = signal(20);
  search = signal<string>('');
  count = computed(() => this.pageData()?.count ?? 0);
  results = computed(() => this.pageData()?.results ?? []);

  private pokemonService = inject(PokemonService);
  private offcanvasService = inject(NguOffcanvasService);
  private dialogService = inject(NguDialogService);
  readonly pageSizeOptions: string[] = ['10', '15', '20', '25'];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  pageForm = new FormGroup({
    pageSize: new FormControl('20'),
  });

  ngOnInit(): void {
    this.observePage();
    this.getPokemon();
  }

  searchPokemon(): void {
    this.search.set(this.searchForm.controls['search'].value?.trim() ?? '');
    this.page.set(1);
    this.getPokemon();
  }

  observePage(): void {
    this.pageForm.controls['pageSize'].valueChanges.subscribe(val => {
      this.pageSize.set(Number(val ?? '20'));
      this.page.set(1);
      this.getPokemon();
    });
  }

  onPageSelected(page: number): void {
    this.page.set(page);
    this.getPokemon();
  }

  onView(name: string): void {
    const o = this.offcanvasService.createOffcanvas(
      PokemonDetailComponent,
      {
        position: 'right',
        offcanvasCloseIcon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        `,
        id: 'pokemon-detail-offcanvas',
        offcanvasData: {name},
        offcanvasTitle: name,
      }
    );
    o.show();
  }

  onDelete(name: string): void {
    const d = this.dialogService.createDialog(
      PokemonDeleteComponent,
      {
        id: 'pokemon-delete-dialog',
        dialogData: { name },
      }
    );
    d.whenClose.subscribe((result: any) => {
      if (result === 'deleted') this.getPokemon();
    });
    d.show();
  }

  private getPokemon(): void {
    this.pokemonService.getPage(this.page(), this.pageSize(), this.search()).subscribe(
      data => this.pageData.set(data)
    );
  }
}
