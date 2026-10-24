import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [
    ReactiveFormsModule,
    SelectComponent
  ]
})
export class SelectDemoComponent {
  options: string[] = ['blue', 'black', 'red', 'white']
  test: FormGroup = new FormGroup<{ select: AbstractControl<string | null> }>({
    select: new FormControl('', [Validators.required]),
  })
  disable(): void {
    if(this.test.controls['select'].disabled){
      this.test.controls['select'].enable()
    } else {
      this.test.controls['select'].disable()
    }
  }
}
