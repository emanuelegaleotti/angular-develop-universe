
# Input Date

Input per inserimento di una data standard (gg/mm/aaaa)

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
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-date',
    templateUrl: './input-date.component.html',
    styleUrl: './input-date.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputDateComponent {
  test: FormGroup = new FormGroup<{ date: AbstractControl<string | null> }>({
    date: new FormControl('', [Validators.required]),
  })
}
```

```html
<section class="ngu-grid">
  <h2>Input date</h2>
  <form [formGroup]="test">
    <ngu-input-date
      formControlName="date"
      [id]="'date'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'bday'"
      [min]="'2026-01-01'"
      [max]="'2026-05-15'"
    ></ngu-input-date>
  </form>
</section>
```
