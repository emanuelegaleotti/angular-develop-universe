import { Component, inject, input, InputSignal } from '@angular/core';
import { NguDialogService } from 'angular-develop-universe/dialogs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-delete',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-delete.component.html',
  styleUrl: './pokemon-delete.component.scss',
})
export class PokemonDeleteComponent {
  dialogData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private dialogService = inject(NguDialogService);
  private pokemonService = inject(PokemonService);

  get name(): string {
    return this.dialogData()?.['name'] ?? '';
  }

  onCancel(): void {
    this.dialogService.hide();
  }

  onDelete(): void {
    this.pokemonService.delete(this.name).subscribe(() => {
      this.dialogService.hide('deleted');
    });
  }
}
