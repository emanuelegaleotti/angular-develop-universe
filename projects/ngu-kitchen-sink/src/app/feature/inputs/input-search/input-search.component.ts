import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputSearchComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'ngu-kitchensink-input-search',
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    ReactiveFormsModule,
    InputSearchComponent
  ]
})
export class InputSearchDemoComponent {
  test: FormGroup = new FormGroup<{ search: AbstractControl<string | null> }>({
    search: new FormControl('', [Validators.required]),
  })
}
