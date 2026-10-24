# Select Object

Select per la selezione da un array di oggetti.

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
translateValue: InputSignal<boolean> = input<boolean>(false)
options: InputSignal<any[]> = input<any[]>([])
optionKey: InputSignal<string> = input<string>('')
valueKey: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-select-object',
    templateUrl: './select-object.component.html',
    styleUrl: './select-object.component.scss',
    standalone: false
})
export class SelectObjectComponent {
  options: { [key: string]: string | number }[] = [
    { id: 1, color: 'white' },
    { id: 2, color: 'red' },
    { id: 3, color: 'black' },
    { id: 4, color: 'blue' }
  ]
  test: FormGroup = new FormGroup({
    selectObject: new FormControl(null, [Validators.required]),
  })

  disable (): void {
    if (this.test.controls['selectObject'].disabled) {
      this.test.controls['selectObject'].enable()
    } else {
      this.test.controls['selectObject'].disable()
    }
  }
}
```

```html
<section class="ks-grid">
  <h2>Select Object</h2>
  <form [formGroup]="test">
    <ngu-select-object
      formControlName="selectObject"
      [id]="'text'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'username'"
      [options]="options"
      [optionKey]="'color'"
      [valueKey]="'id'"
    ></ngu-select-object>
  </form>
  <article>
    <dl>
      <dt>Value:</dt>
      <dd>{{ test.controls['selectObject'].value }}</dd>
      <dt>Valid:</dt>
      <dd>{{ test.controls['selectObject'].valid }}</dd>
      <dt>Invalid:</dt>
      <dd>{{ test.controls['selectObject'].invalid }}</dd>
    </dl>
    <button type="button" (click)="disable()">Disable</button>
  </article>
</section>
```
