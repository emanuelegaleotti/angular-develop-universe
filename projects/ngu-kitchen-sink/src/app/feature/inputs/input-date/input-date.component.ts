import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDateComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputDateComponent,
    ReactiveFormsModule
  ]
})
export class InputDateDemoComponent {
  test: FormGroup = new FormGroup<{ date: AbstractControl<string | null> }>({
    date: new FormControl('', [Validators.required]),
  })
  disable (): void {
    if (this.test.controls['date'].disabled) {
      this.test.controls['date'].enable()
    } else {
      this.test.controls['date'].disable()
    }
  }
}
