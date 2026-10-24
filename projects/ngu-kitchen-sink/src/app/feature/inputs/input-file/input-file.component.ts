import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputFileComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-file',
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  imports: [
    ReactiveFormsModule,
    InputFileComponent
  ]
})
export class InputFileDemoComponent {
  test1: FormGroup = new FormGroup<{ file: AbstractControl<any> }>({
    file: new FormControl(null, [Validators.required]),
  })

  test2: FormGroup = new FormGroup<{ file: AbstractControl<any> }>({
    file: new FormControl(null, [Validators.required]),
  })

  // disable (): void {
  //   if (this.test.controls['file'].disabled) {
  //     this.test.controls['file'].enable()
  //   } else {
  //     this.test.controls['file'].disable()
  //   }
  // }
}
