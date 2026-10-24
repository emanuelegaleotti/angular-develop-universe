import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputDatetimeLocalComponent } from 'angular-develop-universe/inputs'


@Component({
  selector: 'ngu-kitchensink-input-datetime-local',
  templateUrl: './input-datetime-local.component.html',
  styleUrl: './input-datetime-local.component.scss',
  imports: [
    ReactiveFormsModule,
    InputDatetimeLocalComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDatetimeLocalDemoComponent {
  now: Date = new Date()
  test: FormGroup = new FormGroup<{ datetime: AbstractControl<string | null> }>({
    datetime: new FormControl('', [Validators.required]),
  })

  disable (): void {
    if (this.test.controls['datetime'].disabled) {
      this.test.controls['datetime'].enable()
    } else {
      this.test.controls['datetime'].disable()
    }
  }
}

