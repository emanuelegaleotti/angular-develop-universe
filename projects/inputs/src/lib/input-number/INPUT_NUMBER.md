# Input Number

Input che permette l'inserimento di un numero al suo interno

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
min: InputSignal<number> = input<string>(0)
max: InputSignal<number> = input<string>(0)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-number',
    templateUrl: './input-number.component.html',
    styleUrl: './input-number.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputNumberComponent {
  test: FormGroup = new FormGroup<{ number: AbstractControl<number | null> }>({
    number: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(15)]),
  })
}
```

```html
<section>
  <h2>Input number</h2>
  <form [formGroup]="test">
    <ngu-input-number
      formControlName="number"
      [id]="'number'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'age'"
      [min]="0"
      [max]="15"
    ></ngu-input-number>
  </form>
</section>
```
