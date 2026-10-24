import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputWeekComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-week',
  standalone: true,
  imports: [ReactiveFormsModule, InputWeekComponent],
  templateUrl: './input-week.component.html',
  styleUrl: './input-week.component.scss',
})
export class InputWeekDemoComponent {
  test: FormGroup = new FormGroup<{ week: AbstractControl<string | null> }>({
    week: new FormControl('', Validators.required),
  })
}
