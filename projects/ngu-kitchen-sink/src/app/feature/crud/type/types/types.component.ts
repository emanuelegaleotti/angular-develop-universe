import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {PagerComponent} from 'angular-develop-universe/components';
import {InputSearchComponent, SelectComponent} from 'angular-develop-universe/inputs';
import {NguOffcanvasService, NguDialogService} from 'angular-develop-universe/dialogs';
import {TypeActions} from '../state/type.actions';
import {
  selectCount,
  selectCurrentPage,
  selectPageSize,
  selectResults,
  selectSearchTerm,
} from '../state/type.selectors';
import {TypeDetailComponent} from '../type-detail/type-detail.component';
import {TypeDeleteComponent} from '../type-delete/type-delete.component';
import {NamedApiResource} from '../../shared/pokeapi.utils';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [RouterLink, PagerComponent, ReactiveFormsModule, InputSearchComponent, SelectComponent],
  templateUrl: './types.component.html',
  styleUrl: './types.component.scss',
})
export class TypesComponent implements OnInit {
  private store = inject(Store);
  private offcanvasService = inject(NguOffcanvasService);
  private dialogService = inject(NguDialogService);

  readonly pageSizeOptions: string[] = ['10', '15', '20', '25'];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  pageForm = new FormGroup({
    pageSize: new FormControl('20'),
  });

  results = this.store.selectSignal(selectResults);
  count = this.store.selectSignal(selectCount);
  page = this.store.selectSignal(selectCurrentPage);
  pageSize = this.store.selectSignal(selectPageSize);
  search = this.store.selectSignal(selectSearchTerm);

  ngOnInit(): void {
    this.pageForm.controls['pageSize'].setValue(String(this.pageSize()), {emitEvent: false});
    this.observePage();
    this.store.dispatch(TypeActions.initTypeFeature());
  }

  searchTypes(): void {
    this.store.dispatch(TypeActions.setSearchTerm({
      searchTerm: this.searchForm.controls['search'].value?.trim() ?? ''
    }));
  }

  observePage(): void {
    this.pageForm.controls['pageSize'].valueChanges.subscribe(val => {
      this.store.dispatch(TypeActions.setPageSize({pageSize: Number(val ?? '20')}));
    });
  }

  onPageSelected(page: number): void {
    this.store.dispatch(TypeActions.setPage({page}));
  }

  onView(item: NamedApiResource): void {
    this.store.dispatch(TypeActions.selectType({name: item.name}));
    const o = this.offcanvasService.createOffcanvas(
      TypeDetailComponent,
      {
        position: 'right',
        offcanvasCloseIcon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        `,
        id: 'type-detail-offcanvas',
        offcanvasData: {name: item.name},
        offcanvasTitle: item.name,
      }
    );
    o.show();
  }

  onDelete(item: NamedApiResource): void {
    const d = this.dialogService.createDialog(
      TypeDeleteComponent,
      {
        id: 'type-delete-dialog',
        dialogData: {name: item.name},
      }
    );
    d.show();
  }
}
