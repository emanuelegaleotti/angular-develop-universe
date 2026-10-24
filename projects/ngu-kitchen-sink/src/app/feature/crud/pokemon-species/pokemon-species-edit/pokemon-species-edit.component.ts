import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent, InputNumberComponent } from 'angular-develop-universe/inputs';
import { PokemonSpeciesService } from '../pokemon-species.service';
import { PokemonSpeciesCreate } from '../pokemon-species.model';

@Component({
  selector: 'app-pokemon-species-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextComponent, InputNumberComponent],
  templateUrl: './pokemon-species-edit.component.html',
  styleUrl: './pokemon-species-edit.component.scss',
})
export class PokemonSpeciesEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private speciesService = inject(PokemonSpeciesService);

  isCreateMode = signal(true);
  name = signal('');
  title = computed(() => this.isCreateMode() ? 'Crea Pokémon Species' : 'Modifica Pokémon Species');

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    capture_rate: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    base_happiness: new FormControl<number | null>(null),
    gender_rate: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.observeParams();
  }

  observeParams(): void {
    this.route.params.subscribe(params => {
      this.name.set(params['name']);
      if (this.name() === 'create') {
        this.isCreateMode.set(true);
      } else {
        this.isCreateMode.set(false);
        this.getSpecies();
      }
    });
  }

  getSpecies(): void {
    this.speciesService.getByName(this.name()).subscribe(species => {
      this.editForm.patchValue({
        name: species.name,
        capture_rate: species.capture_rate,
        base_happiness: species.base_happiness,
        gender_rate: species.gender_rate,
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const payload = this.editForm.value as PokemonSpeciesCreate;
      const action$ = this.isCreateMode()
        ? this.speciesService.create(payload)
        : this.speciesService.update(payload);
      action$.subscribe({
        next: () => this.router.navigate(['/crud/pokemon-species']),
      });
    }
  }
}
