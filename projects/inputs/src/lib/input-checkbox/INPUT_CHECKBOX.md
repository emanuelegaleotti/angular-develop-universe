# Input Checkbox

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
value: InputSignal<string> = input<string>('')
label: InputSignal<string> = input<string>('')
labelIsVisible: InputSignal<boolean> = input<boolean>(true)
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-checkbox',
    templateUrl: './input-checkbox.component.html',
    styleUrl: './input-checkbox.component.scss',
    standalone: false
})
export class InputCheckboxComponent {
  test: FormGroup = new FormGroup<{ checkbox: AbstractControl<boolean | null> }>({
    checkbox: new FormControl(false, [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input checkbox</h2>
  <form [formGroup]="test">
    <ngu-input-checkbox
      formControlName="checkbox"
      [id]="'checkbox'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'checkbox'"
      [label]="'label'"
    ></ngu-input-checkbox>
  </form>
</section>
```
