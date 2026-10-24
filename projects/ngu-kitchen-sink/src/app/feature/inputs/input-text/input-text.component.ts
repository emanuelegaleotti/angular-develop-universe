import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    ReactiveFormsModule,
    InputTextComponent
  ]
})
export class InputTextDemoComponent {
  test: FormGroup = new FormGroup<{ text: AbstractControl<string | null> }>({
    text: new FormControl('', [Validators.required]),
  })

  disable (): void {
    if (this.test.controls['text'].disabled) {
      this.test.controls['text'].enable()
    } else {
      this.test.controls['text'].disable()
    }
  }
}
