# Input Datetime

Input per inserimento di una data standard compreso l'orario (gg/mm/aaaa --:--)

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
  selector: 'ngu-kitchensink-input-datetime-local',
  templateUrl: './input-datetime-local.component.html',
  styleUrl: './input-datetime-local.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class InputDatetimeLocalComponent {
  now: Date = new Date()
  test: FormGroup = new FormGroup<{ datetime: AbstractControl<string | null> }>({
    datetime: new FormControl('', [Validators.required]),
  })
}
```

```html
<section class="ngu-grid">
  <h2>Input date time</h2>
  <form [formGroup]="test">
    <ngu-input-datetime-local
      formControlName="datetime"
      [id]="'datetime'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'bday'"
      [min]="'2026-01-01T10:00'"
      [max]="'2026-01-10T10:00'"
    ></ngu-input-datetime-local>
  </form>
</section>
```

