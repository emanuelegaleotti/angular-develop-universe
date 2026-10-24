import { Component, inject, input, InputSignal, OnInit, signal } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [ NgOptimizedImage],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  offcanvasData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private service = inject(PokemonService);

  pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
      this.getPokemon();
  }

  getPokemon(): void {
    this.service.getByName(this.offcanvasData()?.['name']).subscribe(
      data => this.pokemon.set(data)
    );
  }
}
