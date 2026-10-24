# Input Datalist

Input per scelta di un elemento assegnata una datalist iniziale

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
options: InputSignal<string[]> = input<string[]>([])
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-datalist',
    templateUrl: './input-datalist.component.html',
    styleUrl: './input-datalist.component.scss',
    standalone: false
})
export class InputDatalistComponent {
  test: FormGroup = new FormGroup<{ datalist: AbstractControl<string | null> }>({
    datalist: new FormControl('', [Validators.required]),
  })

  datalist: string[] = [
    'Edge', 'Firefox', 'Chrome', 'Opera', 'Safari'
  ]
}
```

```html
<section>
  <h2>Input Datalist</h2>
  <form [formGroup]="test">
    <ngu-input-datalist
      formControlName="datalist"
      [id]="'datalist'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'datalist'"
      [options]="datalist"
    ></ngu-input-datalist>
  </form>
</section>
```
