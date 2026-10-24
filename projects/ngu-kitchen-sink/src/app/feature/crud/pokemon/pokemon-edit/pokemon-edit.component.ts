import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextComponent, InputNumberComponent} from 'angular-develop-universe/inputs';
import {PokemonService} from '../pokemon.service';
import {Pokemon, PokemonCreate} from '../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextComponent, InputNumberComponent],
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.scss',
})
export class PokemonEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  isCreateMode = signal(true);
  name = signal('');
  title = computed(() => this.isCreateMode() ? 'Crea Pokémon' : 'Modifica Pokémon');

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    height: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    weight: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    base_experience: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    this.observeParams()
  }

  observeParams(): void {
    this.route.params.subscribe(params => {
      this.name.set(params['name']);
      if (this.name() === 'create') {
        this.isCreateMode.set(true);
      } else {
        this.isCreateMode.set(false);
        this.getPokemon()
      }
    });
  }

  getPokemon(): void {
    this.pokemonService.getByName(this.name()).subscribe(pokemon => {
      this.editForm.patchValue({
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        base_experience: pokemon.base_experience,
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const payload = this.editForm.value as PokemonCreate;
      const action$ = this.isCreateMode()
        ? this.pokemonService.create(payload)
        : this.pokemonService.update(payload);
      action$.subscribe({
        next: () => this.router.navigate(['/crud/pokemon']),
      });
    }
  }
}
