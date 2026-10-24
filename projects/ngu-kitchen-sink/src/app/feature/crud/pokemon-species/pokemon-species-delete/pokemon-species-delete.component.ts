import { Component, inject, input, InputSignal } from '@angular/core';
import { NguDialogService } from 'angular-develop-universe/dialogs';
import { PokemonSpeciesService } from '../pokemon-species.service';

@Component({
  selector: 'app-pokemon-species-delete',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-species-delete.component.html',
  styleUrl: './pokemon-species-delete.component.scss',
})
export class PokemonSpeciesDeleteComponent {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private dialogService = inject(NguDialogService);
  private speciesService = inject(PokemonSpeciesService);

  get name(): string {
    return this.dialogData()?.['name'] ?? '';
  }

  onCancel(): void {
    this.dialogService.hide();
  }

  onDelete(): void {
    this.speciesService.delete(this.name).subscribe(() => {
      this.dialogService.hide('deleted');
    });
  }
}
