import { Component, inject, input, InputSignal, OnInit, signal } from '@angular/core';
import { AbilityService } from '../ability.service';
import { Ability } from '../ability.model';

@Component({
  selector: 'app-ability-detail',
  standalone: true,
  imports: [],
  templateUrl: './ability-detail.component.html',
  styleUrl: './ability-detail.component.scss',
})
export class AbilityDetailComponent implements OnInit {
  offcanvasData: InputSignal<{ [key: string]: any } | undefined> = input<{ [key: string]: any } | undefined>(undefined);

  private service = inject(AbilityService);

  ability = signal<Ability | null>(null);

  get name(): string {
    return this.offcanvasData()?.['name'] ?? '';
  }

  ngOnInit(): void {
    this.getAbility();
  }

  getAbility(): void {
    this.service.getByName(this.name).subscribe(data => this.ability.set(data));
  }
}
