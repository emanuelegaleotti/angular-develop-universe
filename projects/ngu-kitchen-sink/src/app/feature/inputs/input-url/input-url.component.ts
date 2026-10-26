import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputUrlComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-url',
  templateUrl: './input-url.component.html',
  styleUrl: './input-url.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputUrlComponent, ControlStateComponent]
})
export class InputUrlDemoComponent {
  readonly form = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern('http://.*')])
  })
}
