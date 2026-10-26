import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputHiddenComponent } from 'angular-develop-universe/inputs'
import { ControlStateComponent } from '../../../shared/control-state/control-state.component'

@Component({
  selector: 'ngu-kitchensink-input-hidden',
  templateUrl: './input-hidden.component.html',
  styleUrl: './input-hidden.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputHiddenComponent, ControlStateComponent]
})
export class InputHiddenDemoComponent {
  readonly form = new FormGroup({
    hidden: new FormControl('', [Validators.required])
  })

  fill (): void {
    this.form.controls.hidden.setValue('segreto-123')
    this.form.controls.hidden.markAsDirty()
  }
}
