import { Component, inject, input, InputSignal, OnInit, signal } from '@angular/core';
import { PokemonSpeciesService } from '../pokemon-species.service';
import { PokemonSpecies } from '../pokemon-species.model';

@Component({
  selector: 'app-pokemon-species-detail',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-species-detail.component.html',
  styleUrl: './pokemon-species-detail.component.scss',
})
export class PokemonSpeciesDetailComponent implements OnInit {
  offcanvasData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private service = inject(PokemonSpeciesService);

  species = signal<PokemonSpecies | null>(null);

  ngOnInit(): void {
      this.getSpecies();
  }

  getSpecies(): void {
    this.service.getByName(this.offcanvasData()?.['name']).subscribe(data => this.species.set(data));
  }
}
