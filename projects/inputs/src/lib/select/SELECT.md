# Select

Select standard per la selezione da una lista di stringhe.

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
options: InputSignal<string[]> = input<string[]>([])
autofocus: InputSignal<boolean> = input<boolean>(false)
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    standalone: false
})
export class SelectComponent {
  options: string[] = ['blue', 'black', 'red', 'white']
  test: FormGroup = new FormGroup<{ select: AbstractControl<string | null> }>({
    select: new FormControl('', [Validators.required]),
  })

  disable (): void {
    if (this.test.controls['select'].disabled) {
      this.test.controls['select'].enable()
    } else {
      this.test.controls['select'].disable()
    }
  }
}
```

```html
<section class="ks-grid">
  <h2>Select</h2>
  <form [formGroup]="test">
    <ngu-select
      formControlName="select"
      [id]="'text'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'username'"
      [options]="options"
    ></ngu-select>
  </form>
  <article>
    <dl>
      <dt>Value:</dt>
      <dd>{{ test.controls['select'].value }}</dd>
      <dt>Valid:</dt>
      <dd>{{ test.controls['select'].valid }}</dd>
      <dt>Invalid:</dt>
      <dd>{{ test.controls['select'].invalid }}</dd>
    </dl>
    <button type="button" (click)="disable()">Disable</button>
  </article>
</section>
```
