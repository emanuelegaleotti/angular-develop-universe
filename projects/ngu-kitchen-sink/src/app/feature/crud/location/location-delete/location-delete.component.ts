import { Component, inject, input, InputSignal } from '@angular/core';
import { NguDialogService } from 'angular-develop-universe/dialogs';
import { LocationStore } from '../location.store';

@Component({
  selector: 'app-location-delete',
  standalone: true,
  imports: [],
  templateUrl: './location-delete.component.html',
  styleUrl: './location-delete.component.scss',
})
export class LocationDeleteComponent {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);
  private dialogService = inject(NguDialogService);
  private locationStore = inject(LocationStore);

  get name(): string {
    return this.dialogData()?.['name'] ?? '';
  }

  onCancel(): void {
    this.dialogService.hide();
  }

  onDelete(): void {
    this.locationStore.setLocationToDelete(this.name);
    this.dialogService.hide('deleted');
  }
}
