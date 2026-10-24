# Input Radio

Radio button per selezioni multiple esclusive.

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
name: InputSignal<string> = input<string>('')
radioValue: InputSignal<string> = input<string>('')
radioLabel: InputSignal<string> = input<string>('')
labelIsVisible: InputSignal<boolean> = input<boolean>(true)
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-radio',
    templateUrl: './input-radio.component.html',
    styleUrl: './input-radio.component.scss',
    standalone: false
})
export class InputRadioComponent {
  test: FormGroup = new FormGroup<{ radio: AbstractControl<string | null> }>({
    radio: new FormControl('value-0', [Validators.required]),
  })
  options: { [key: string]: string | number }[] = [
    { id: 1, color: 'white' },
    { id: 2, color: 'red' },
    { id: 3, color: 'black' },
    { id: 4, color: 'blue' }
  ]
}
```

```html
<section>
  <h2>Input radio</h2>
  <form [formGroup]="test">
    @for (o of options; let i = $index; track i) {
      <ngu-input-radio
        formControlName="radio"
        [id]="'text-' + i"
        [name]="'radio'"
        [radioLabel]="'label-' + i"
        [radioValue]="'value-' + i"
        [feature]="'input'"
        [helpMsg]="true"
        [successMsg]="true"
        [errorMsg]="true"
        [autocomplete]="'radio'"
      ></ngu-input-radio>
    }
  </form>
  <dl>
    <dt>Value:</dt>
    <dd>{{ test.controls['radio'].value }}</dd>
  </dl>
</section>
```
