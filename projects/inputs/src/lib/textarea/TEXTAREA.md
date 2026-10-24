# Textarea

Area di testo multilinea.

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
cols: InputSignal<number> = input<number>(0)
rows: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-textarea',
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.scss',
    standalone: false
})
export class TextareaComponent {
  test: FormGroup = new FormGroup<{ textarea: AbstractControl<string | null> }>({
    textarea: new FormControl('', [Validators.required]),
  })
}
```

```html
<section class="ngu-grid-fluid">
  <h2>Textarea</h2>
  <form [formGroup]="test">
    <ngu-textarea
      formControlName="textarea"
      [id]="'text'"
      [feature]="'input'"
      [maxLength]="256"
      [cols]="5"
      [rows]="5"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'text'"
    ></ngu-textarea>
  </form>
</section>
```
