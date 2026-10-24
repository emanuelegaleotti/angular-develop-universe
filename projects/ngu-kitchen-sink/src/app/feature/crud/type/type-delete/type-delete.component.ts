import { Component, inject, input, InputSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { NguDialogService } from 'angular-develop-universe/dialogs';
import { TypeActions } from '../state/type.actions';

@Component({
  selector: 'app-type-delete',
  standalone: true,
  imports: [],
  templateUrl: './type-delete.component.html',
  styleUrl: './type-delete.component.scss',
})
export class TypeDeleteComponent {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private store = inject(Store);
  private dialogService = inject(NguDialogService);

  get name(): string {
    return this.dialogData()?.['name'] ?? '';
  }

  onCancel(): void {
    this.dialogService.hide();
  }

  onDelete(): void {
    this.store.dispatch(TypeActions.deleteType({ name: this.name }));
    this.dialogService.hide();
  }
}
