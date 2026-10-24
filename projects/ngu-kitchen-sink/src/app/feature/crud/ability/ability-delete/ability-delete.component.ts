import { Component, inject, input, InputSignal } from '@angular/core';
import { NguDialogService } from 'angular-develop-universe/dialogs';
import { AbilityService } from '../ability.service';

@Component({
  selector: 'app-ability-delete',
  standalone: true,
  imports: [],
  templateUrl: './ability-delete.component.html',
  styleUrl: './ability-delete.component.scss',
})
export class AbilityDeleteComponent {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private dialogService = inject(NguDialogService);
  private abilityService = inject(AbilityService);

  get name(): string {
    return this.dialogData()?.['name'] ?? '';
  }

  onCancel(): void {
    this.dialogService.hide();
  }

  onDelete(): void {
    this.abilityService.delete(this.name).subscribe(() => {
      this.dialogService.hide('deleted');
    });
  }
}
