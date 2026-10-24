import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from 'angular-develop-universe/inputs';
import { LocationStore } from '../location.store';
import { LocationCreate } from '../location.model';

@Component({
  selector: 'app-location-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextComponent],
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.scss',
})
export class LocationEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private locationStore = inject(LocationStore);

  isCreateMode = signal(true);
  name = signal('');
  title = computed(() => this.isCreateMode() ? 'Crea Location' : 'Modifica Location');

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      const loc = this.locationStore.selectedLocation();
      if (loc) {
        this.editForm.patchValue({ name: loc.name });
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
        this.locationStore.selectLocation(null);
      } else {
        this.isCreateMode.set(false);
        this.locationStore.selectLocation(this.name());
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const payload = this.editForm.value as LocationCreate;
      if (this.isCreateMode()) {
        this.locationStore.createLocation(payload);
      } else {
        this.locationStore.updateLocation(payload);
      }
    }
  }
}
