# Input Search

Input ottimizzato per la ricerca.

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
maxLength: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-search',
    templateUrl: './input-search.component.html',
    styleUrl: './input-search.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputSearchComponent {
  test: FormGroup = new FormGroup<{ search: AbstractControl<string | null> }>({
    search: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input search</h2>
  <form [formGroup]="test" role="search">
    <ngu-input-search
      formControlName="search"
      [id]="'search'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [maxLength]="36"
    ></ngu-input-search>
  </form>
</section>
```
