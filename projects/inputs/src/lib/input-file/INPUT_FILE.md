# Input File

Input per inserimento di files sia con il drag&drop che con l'apposito pulsante di inserimento. Possibilità di inserire sia un singolo file che file multipli.

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
accept: InputSignal<string> = input<string>('');
autofocus: InputSignal<boolean> = input<boolean>(false);
multiple: InputSignal<boolean> = input<boolean>(false);
```

La props **multiple** è molto importante perchè permette di definire se il componente accetterà un solo file in ingresso o più di uno.

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ngu-kitchensink-input-file',
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  standalone: false
})
export class InputFileComponent {
  test1: FormGroup = new FormGroup<{ file: AbstractControl<any> }>({
    file: new FormControl(null, [Validators.required]),
  })

  test2: FormGroup = new FormGroup<{ file: AbstractControl<any> }>({
    file: new FormControl(null, [Validators.required]),
  })
}

```
#### Esempio di utilizzo (File Singolo)

```html
<section class="ngu-grid-main">
  <h2>Input file</h2>
  <form [formGroup]="test1">
    <ngu-input-file
      formControlName="file"
      [id]="'file1'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'file'"
      [multiple]="false"
      [autofocus]="true"
    >
      <ng-template #removeIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
              d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
          </svg>
      </ng-template>

      <span add-btn>Add file</span>
    </ngu-input-file>
  </form>
</section>

```

#### Esempio di utilizzo (File multipli)

```html
<section class="ngu-grid-main">
  <h2>Input file (multiple)</h2>
  <form [formGroup]="test2">
    <ngu-input-file
      formControlName="file"
      [id]="'file2'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'file'"
      [multiple]="true"
      [autofocus]="true"
    >
      <ng-template #removeIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path
            d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
        </svg>
      </ng-template>
      <span add-btn>Add file</span>
    </ngu-input-file>
  </form>
</section>
```
