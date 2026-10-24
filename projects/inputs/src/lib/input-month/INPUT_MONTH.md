# Input Month

Input che permette l'inserimento del mese e dell'anno scelto

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
min: InputSignal<string> = input<string>('')
max: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngu-kitchensink-input-month',
  standalone: false,
  templateUrl: './input-month.component.html',
  styleUrl: './input-month.component.scss',
})
export class InputMonthComponent {
  test: FormGroup = new FormGroup<{ month: AbstractControl<string | null> }>({
    month: new FormControl('', Validators.required),
  })
}
```

```html
<section class="ngu-grid">
  <h2>Input month</h2>
  <form [formGroup]="test">
    <ngu-input-month
      formControlName="month"
      [id]="'month'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [min]="'2026-06'"
      [max]="'2026-10'"
    ></ngu-input-month>
  </form>
</section>
```
