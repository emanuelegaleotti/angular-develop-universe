# Input Time

Input per la selezione dell'ora.

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
step: InputSignal<string> = input<string>('')
min: InputSignal<string> = input<string>('')
max: InputSignal<string> = input<string>('')
autofocus: InputSignal<boolean> = input<boolean>(false)
options: InputSignal<string[]> = input<string[]>([])
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-time',
    templateUrl: './input-time.component.html',
    styleUrl: './input-time.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputTimeComponent {
  test: FormGroup = new FormGroup<{ time: AbstractControl<string | null> }>({
    time: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input time</h2>
  <form [formGroup]="test">
    <ngu-input-time
      formControlName="time"
      [id]="'time'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'time'"
    ></ngu-input-time>
  </form>
</section>
```
