# Input Password

Input per password con caratteri mascherati.

### Props comuni

Le seguenti props sono condivise dalla maggior parte dei componenti input:

```typescript
id: InputSignal<string> = input<string>('')
feature: InputSignal<string> = input<string>('')
autocomplete: InputSignal<string> = input<string>('off')
errorMsg: InputSignal<boolean> = input<boolean>(false)
successMsg: InputSignal<boolean> = input<boolean>(false)
helpMsg: InputSignal<boolean> = input<boolean>(false)
```

### Props specifiche
```typescript
maxLength: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-password',
    templateUrl: './input-password.component.html',
    styleUrl: './input-password.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputPasswordComponent {
  test: FormGroup = new FormGroup<{ password: AbstractControl<string | null> }>({
    password: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input password</h2>
  <form [formGroup]="test">
    <ngu-input-password
      formControlName="password"
      [id]="'password'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'new-password'"
      [maxLength]="30"
    ></ngu-input-password>
  </form>
</section>
```
