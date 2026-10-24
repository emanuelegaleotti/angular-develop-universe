# Input Color
Input per la scelta del colore

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
    selector: 'ngu-kitchensink-input-color',
    templateUrl: './input-color.component.html',
    styleUrl: './input-color.component.scss',
    standalone: false
})
export class InputColorComponent {
  test: FormGroup = new FormGroup<{ color: AbstractControl<string | null> }>({
    color: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input color</h2>
  <form [formGroup]="test">
    <ngu-input-color
      formControlName="color"
      [id]="'color'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'color'"
      [options]="['red', 'white']"
    ></ngu-input-color>
  </form>
</section>
```
