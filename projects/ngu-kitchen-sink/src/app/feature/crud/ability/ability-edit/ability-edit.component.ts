import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from 'angular-develop-universe/inputs';
import { AbilityService } from '../ability.service';
import { AbilityCreate } from '../ability.model';

@Component({
  selector: 'app-ability-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextComponent],
  templateUrl: './ability-edit.component.html',
  styleUrl: './ability-edit.component.scss',
})
export class AbilityEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private abilityService = inject(AbilityService);

  isCreateMode = signal(true);
  name = signal('');
  title = computed(() => this.isCreateMode() ? 'Crea Ability' : 'Modifica Ability');

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
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
        this.getAbility();
      }
    });
  }

  getAbility(): void {
    this.abilityService.getByName(this.name()).subscribe(ability => {
      this.editForm.patchValue({ name: ability.name });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const payload = this.editForm.value as AbilityCreate;
      const action$ = this.isCreateMode()
        ? this.abilityService.create(payload)
        : this.abilityService.update(payload);
      action$.subscribe({
        next: () => this.router.navigate(['/crud/ability']),
      });
    }
  }
}
