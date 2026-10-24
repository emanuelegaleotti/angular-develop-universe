# Input Range

Input slider per valori numerici in un range.

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
options: InputSignal<string[]> = input<string[]>([])
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-range',
    templateUrl: './input-range.component.html',
    styleUrl: './input-range.component.scss',
    standalone: false
})
export class InputRangeComponent {
  test: FormGroup = new FormGroup<{ range: AbstractControl<number | null> }>({
    range: new FormControl(0, [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input range</h2>
  <form [formGroup]="test">
    <ngu-input-range
      formControlName="range"
      [id]="'range'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'range'"
    ></ngu-input-range>
  </form>
</section>
```
