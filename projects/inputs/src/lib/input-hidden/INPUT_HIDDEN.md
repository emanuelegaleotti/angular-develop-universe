# Input Hidden

Input hidden

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

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-hidden',
    templateUrl: './input-hidden.component.html',
    styleUrl: './input-hidden.component.scss',
    standalone: false
})
export class InputHiddenComponent {
  test: FormGroup = new FormGroup<{ hidden: AbstractControl<string | null> }>({
    hidden: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input Hidden</h2>
  <form [formGroup]="test">
    <ngu-input-hidden
      formControlName="hidden"
      [id]="'hidden'"
      [feature]="'input'"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'hidden'"
    ></ngu-input-hidden>
  </form>
</section>
```
