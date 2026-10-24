# Input Text

Input di testo standard con validazione.

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
    selector: 'ngu-kitchensink-input-text',
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputTextComponent {
  test: FormGroup = new FormGroup<{ text: AbstractControl<string | null> }>({
    text: new FormControl('', [Validators.required]),
  })

  disable (): void {
    if (this.test.controls['text'].disabled) {
      this.test.controls['text'].enable()
    } else {
      this.test.controls['text'].disable()
    }
  }
}
```

```html
<section>
  <h2>Input text</h2>
  <form [formGroup]="test">
    <ngu-input-text
      formControlName="text"
      [id]="'text'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'username'"
      [autofocus]="true"
    ></ngu-input-text>
  </form>
  <article>
    <dl>
      <dt>Value:</dt>
      <dd>{{ test.controls['text'].value }}</dd>
      <dt>Valid:</dt>
      <dd>{{ test.controls['text'].valid }}</dd>
      <dt>Invalid:</dt>
      <dd>{{ test.controls['text'].invalid }}</dd>
    </dl>
    <button class="ngu-button ngu-primary" type="button" (click)="disable()">Disable</button>
  </article>
</section>
```
