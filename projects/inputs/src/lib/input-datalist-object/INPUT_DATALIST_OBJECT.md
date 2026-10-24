# Input Datalist Object

Input per la scelta di un elemento assegnata una datalist-object, la scelta restituirà un valore

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
options: InputSignal<{ [key: string]: string | number }[]> = input<{ [key: string]: string | number }[]>([])
valueKey: InputSignal<string> = input<string>('')
optionKey: InputSignal<string> = input<string>('')
```

Essendo options un array di oggetti definiti come chiave-valore, le props **valueKey** e **optionKey** servono per poter recuperare rispettivamente il valore e la chiave da options

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-datalist-object',
    templateUrl: './input-datalist-object.component.html',
    styleUrl: './input-datalist-object.component.scss',
    standalone: false
})
export class InputDatalistObjectComponent {
  test: FormGroup = new FormGroup<{ datalistObject: AbstractControl<number | null> }>({
    datalistObject: new FormControl(null, [Validators.required]),
  })

  datalist: { [key: string]: string | number }[] = [
    { id: 1, browser: 'Edge' },
    { id: 2, browser: 'Firefox' },
    { id: 3, browser: 'Chrome' },
    { id: 4, browser: 'Opera' },
    { id: 5, browser: 'Safari' }
  ]
}
```

```html
<section>
<h2>Input Datalist Object</h2>
  <form [formGroup]="test">
    <ngu-input-datalist-object
      formControlName="datalistObject"
      [id]="'datalist'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'datalist'"
      [options]="datalist"
      [optionKey]="'browser'"
      [valueKey]="'id'"
    ></ngu-input-datalist-object>
  </form>
</section>
```
