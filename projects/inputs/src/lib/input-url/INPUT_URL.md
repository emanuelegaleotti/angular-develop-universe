# Input URL

Input per indirizzi URL con validazione nativa.

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
pattern: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-url',
    templateUrl: './input-url.component.html',
    styleUrl: './input-url.component.scss',
    standalone: false
})
export class InputUrlComponent {
  test: FormGroup = new FormGroup<{ url: AbstractControl<string | null> }>({
    url: new FormControl('', [Validators.required, Validators.pattern('http://.*')]),
  })
}
```

```html
<section>
  <h2>Input url</h2>
  <form [formGroup]="test">
    <ngu-input-url
      formControlName="url"
      [id]="'url'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'url'"
    ></ngu-input-url>
  </form>
</section>
```
