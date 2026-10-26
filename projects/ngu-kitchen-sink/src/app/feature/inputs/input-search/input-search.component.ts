import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputSearchComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-search',
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputSearchComponent, ControlStateComponent]
})
export class InputSearchDemoComponent {
  readonly form = new FormGroup({
    search: new FormControl('', [Validators.required])
  })
}
