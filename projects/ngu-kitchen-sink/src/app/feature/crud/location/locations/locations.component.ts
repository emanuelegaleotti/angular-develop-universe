import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrudPagerComponent } from '../../shared/crud-pager/crud-pager.component';
import { CrudRowActionsComponent } from '../../shared/crud-row-actions/crud-row-actions.component';
import { NguDialogService, NguOffcanvasService } from 'angular-develop-universe/dialogs';
import { InputSearchComponent, SelectComponent } from 'angular-develop-universe/inputs';
import { LocationStore } from '../location.store';
import { NamedApiResource } from '../../shared/pokeapi.utils';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { LocationDeleteComponent } from '../location-delete/location-delete.component';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [RouterLink, CrudPagerComponent, CrudRowActionsComponent, ReactiveFormsModule, InputSearchComponent, SelectComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent implements OnInit {
  protected locationStore = inject(LocationStore);
  private offcanvasService = inject(NguOffcanvasService);
  private dialogService = inject(NguDialogService);

  readonly pageSizeOptions: string[] = ['10', '15', '20', '25'];

  searchForm = new FormGroup({ search: new FormControl('') });
  pageForm = new FormGroup({ pageSize: new FormControl('20') });

  ngOnInit(): void {
    this.pageForm.controls['pageSize'].setValue(String(this.locationStore.pageSize()), { emitEvent: false });
    this.observePage();
  }

  searchLocations(): void {
    this.locationStore.setSearchTerm(this.searchForm.controls['search'].value?.trim() ?? '');
  }

  observePage(): void {
    this.pageForm.controls['pageSize'].valueChanges.subscribe(val => {
      this.locationStore.setPageSize(Number(val ?? '20'));
    });
  }

  onPageSelected(page: number): void {
    this.locationStore.setPage(page);
  }

  onView(item: NamedApiResource): void {
    const o = this.offcanvasService.createOffcanvas(LocationDetailComponent, {
      position: 'right',
      offcanvasCloseIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`,
      id: 'location-detail-offcanvas',
      offcanvasData: { name: item.name },
      offcanvasTitle: item.name,
    });
    o.show();
  }

  onDelete(name: string): void {
    this.dialogService.createDialog(LocationDeleteComponent, {
      id: 'location-delete-dialog',
      dialogData: { name },
    }).show();
  }
}
