# Input Email

Input per inserimento di un indirizzo email valido

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
autofocus: InputSignal<boolean> = input<boolean>(false)
maxLength: InputSignal<number> = input<number>(0)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-email',
    templateUrl: './input-email.component.html',
    styleUrl: './input-email.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputEmailComponent {
  test: FormGroup = new FormGroup<{ email: AbstractControl<string | null> }>({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
}
```

```html
<section>
  <h2>Input email</h2>
  <form [formGroup]="test">
    <ngu-input-email
      formControlName="email"
      [id]="'email'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'email'"
      [maxLength]="30"
    ></ngu-input-email>
  </form>
</section>
```
