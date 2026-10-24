# Input Week

Input per la selezione della settimana.

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
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ngu-kitchensink-input-week',
  standalone: false,
  templateUrl: './input-week.component.html',
  styleUrl: './input-week.component.scss',
})
export class InputWeekComponent {
  test: FormGroup = new FormGroup<{ week: AbstractControl<string | null> }>({
    week: new FormControl('', Validators.required),
  })
}
```

```html
<section class="ngu-grid">
  <h2>Input week</h2>
  <form [formGroup]="test">
    <ngu-input-week
      formControlName="week"
      [id]="'week'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
    ></ngu-input-week>
  </form>
</section>
```
