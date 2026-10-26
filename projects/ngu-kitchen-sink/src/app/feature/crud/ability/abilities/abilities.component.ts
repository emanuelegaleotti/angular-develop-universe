import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrudPagerComponent } from '../../shared/crud-pager/crud-pager.component';
import { CrudRowActionsComponent } from '../../shared/crud-row-actions/crud-row-actions.component';
import { InputSearchComponent, SelectComponent } from 'angular-develop-universe/inputs';
import { NguOffcanvasService, NguDialogService } from 'angular-develop-universe/dialogs';
import { AbilityService } from '../ability.service';
import { AbilityStore } from '../ability.store';
import { NamedApiResource, PokeApiPage } from '../../shared/pokeapi.utils';
import { AbilityDetailComponent } from '../ability-detail/ability-detail.component';
import { AbilityDeleteComponent } from '../ability-delete/ability-delete.component';

@Component({
  selector: 'app-abilities',
  standalone: true,
  imports: [RouterLink, CrudPagerComponent, CrudRowActionsComponent, ReactiveFormsModule, InputSearchComponent, SelectComponent],
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent implements OnInit {
  private abilityService = inject(AbilityService);
  private abilityStore = inject(AbilityStore);
  private offcanvasService = inject(NguOffcanvasService);
  private dialogService = inject(NguDialogService);

  readonly pageSizeOptions: string[] = ['10', '15', '20', '25'];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  pageForm = new FormGroup({
    pageSize: new FormControl('20'),
  });

  page = this.abilityStore.currentPage;
  pageSize = this.abilityStore.pageSize;
  search = this.abilityStore.searchTerm;

  pageData = signal<PokeApiPage<NamedApiResource> | null>(null);
  count = computed(() => this.pageData()?.count ?? 0);
  results = computed(() => this.pageData()?.results ?? []);

  ngOnInit(): void {
    this.pageForm.controls['pageSize'].setValue(String(this.pageSize()), { emitEvent: false });
    this.observePage();
    this.getAbilities();
  }

  searchAbilities(): void {
    const term = this.searchForm.controls['search'].value?.trim() ?? '';
    this.abilityStore.setSearchTerm(term);
    this.getAbilities();
  }

  observePage(): void {
    this.pageForm.controls['pageSize'].valueChanges.subscribe(val => {
      this.abilityStore.setPageSize(Number(val ?? '20'));
      this.getAbilities();
    });
  }

  onPageSelected(page: number): void {
    this.abilityStore.setPage(page);
    this.getAbilities();
  }

  onView(item: NamedApiResource): void {
    const o = this.offcanvasService.createOffcanvas(
      AbilityDetailComponent,
      {
        position: 'right',
        offcanvasCloseIcon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        `,
        id: 'ability-detail-offcanvas',
        offcanvasData: { name: item.name },
        offcanvasTitle: item.name,
      }
    );
    o.show();
  }

  onDelete(item: NamedApiResource): void {
    const d = this.dialogService.createDialog(
      AbilityDeleteComponent,
      {
        id: 'ability-delete-dialog',
        dialogData: { name: item.name },
      }
    );
    d.whenClose.subscribe((result: any) => {
      if (result === 'deleted') this.getAbilities();
    });
    d.show();
  }

  private getAbilities(): void {
    this.abilityService.getPage(this.page(), this.pageSize(), this.search()).subscribe(data =>
      this.pageData.set(data),
    );
  }
}
