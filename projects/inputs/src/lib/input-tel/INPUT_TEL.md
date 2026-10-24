# Input Tel

Input per numeri di telefono.

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
pattern: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-tel',
    templateUrl: './input-tel.component.html',
    styleUrl: './input-tel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputTelComponent {
  test: FormGroup = new FormGroup<{ tel: AbstractControl<string | null> }>({
    tel: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input tel</h2>
  <form [formGroup]="test">
    <ngu-input-tel
      formControlName="tel"
      [id]="'tel'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'tel'"
    ></ngu-input-tel>
  </form>
</section>
```
