import { Component } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectObjectComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-select-object',
  templateUrl: './select-object.component.html',
  styleUrl: './select-object.component.scss',
  imports: [
    ReactiveFormsModule,
    SelectObjectComponent
  ]
})
export class SelectObjectDemoComponent {
  options: {[key:string]: string | number}[] = [
    {id: 1, color: 'white'},
    {id: 2, color: 'red'},
    {id: 3, color: 'black'},
    {id: 4, color: 'blue'}
  ]
  test: FormGroup = new FormGroup({
    selectObject: new FormControl(null, [Validators.required]),
  })
  disable(): void {
    if(this.test.controls['selectObject'].disabled){
      this.test.controls['selectObject'].enable()
    } else {
      this.test.controls['selectObject'].disable()
    }
  }
}
