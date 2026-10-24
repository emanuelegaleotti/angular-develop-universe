import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InputTextComponent } from 'angular-develop-universe/inputs';
import { TypeActions } from '../state/type.actions';
import { selectSelectedType } from '../state/type.selectors';
import { PokeTypeCreate } from '../type.model';

@Component({
  selector: 'app-type-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextComponent],
  templateUrl: './type-edit.component.html',
  styleUrl: './type-edit.component.scss',
})
export class TypeEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  isCreateMode = signal(true);
  name = signal('');
  title = computed(() => this.isCreateMode() ? 'Crea Type' : 'Modifica Type');

  selectedType = this.store.selectSignal(selectSelectedType);

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      const t = this.selectedType();
      if (t && !this.isCreateMode()) {
        this.editForm.patchValue({ name: t.name });
      }
    });
  }

  ngOnInit(): void {
    this.observeParams();
  }

  observeParams(): void {
    this.route.params.subscribe(params => {
      this.name.set(params['name']);
      if (this.name() === 'create') {
        this.isCreateMode.set(true);
        this.editForm.reset();
      } else {
        this.isCreateMode.set(false);
        this.store.dispatch(TypeActions.selectType({ name: this.name() }));
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const payload = this.editForm.value as PokeTypeCreate;
      if (this.isCreateMode()) {
        this.store.dispatch(TypeActions.createType({ payload }));
      } else {
        this.store.dispatch(TypeActions.updateType({ payload }));
      }
    }
  }
}
