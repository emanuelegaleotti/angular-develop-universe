## Indice

- [Props comuni](#props-comuni)
- [Input Checkbox](#input-checkbox)
- [Input Color](#input-color)
- [Input Datalist](#input-datalist)
- [Input Datalist Object](#input-datalist-object)
- [Input Date](#input-date)
- [Input Datetime](#input-datetime)
- [Input Email](#input-email)
- [Input File singolo](#input-file)
- [Input Hidden](#input-hidden)
- [Input Month](#input-month)
- [Input Number](#input-number)
- [Input Password](#input-password)
- [Input Radio](#input-radio)
- [Input Range](#input-range)
- [Input Search](#input-search)
- [Input Tel](#input-tel)
- [Input Text](#input-text)
- [Input Time](#input-time)
- [Input URL](#input-url)
- [Input Week](#input-week)
- [Select](#select)
- [Select Object](#select-object)
- [Textarea](#textarea)

---

## Props comuni

Le seguenti props sono condivise dalla maggior parte dei componenti input:

```typescript
id: InputSignal<string> = input<string>('')
feature: InputSignal<string> = input<string>('')
autocomplete: InputSignal<string> = input<string>('off')
errorMsg: InputSignal<boolean> = input<boolean>(false)
successMsg: InputSignal<boolean> = input<boolean>(false)
helpMsg: InputSignal<boolean> = input<boolean>(false)
```
### Input Checkbox

Input checkbox

#### Props specifiche
```typescript
name: InputSignal<string> = input<string>('')
value: InputSignal<string> = input<string>('')
label: InputSignal<string> = input<string>('')
labelIsVisible: InputSignal<boolean> = input<boolean>(true)
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-checkbox',
    templateUrl: './input-checkbox.component.html',
    styleUrl: './input-checkbox.component.scss',
    standalone: false
})
export class InputCheckboxComponent {
  test: FormGroup = new FormGroup<{ checkbox: AbstractControl<boolean | null> }>({
    checkbox: new FormControl(false, [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input checkbox</h2>
  <form [formGroup]="test">
    <ngu-input-checkbox
      formControlName="checkbox"
      [id]="'checkbox'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'checkbox'"
      [label]="'label'"
    ></ngu-input-checkbox>
  </form>
</section>
```

---

### Input Color

Input per la scelta del colore

#### Props specifiche
```typescript
name: InputSignal<string> = input<string>('')
options: InputSignal<string[]> = input<string[]>([])
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-color',
    templateUrl: './input-color.component.html',
    styleUrl: './input-color.component.scss',
    standalone: false
})
export class InputColorComponent {
  test: FormGroup = new FormGroup<{ color: AbstractControl<string | null> }>({
    color: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input color</h2>
  <form [formGroup]="test">
    <ngu-input-color
      formControlName="color"
      [id]="'color'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'color'"
      [options]="['red', 'white']"
    ></ngu-input-color>
  </form>
</section>
```

---

### Input Datalist

Input per scelta di un elemento assegnata una datalist iniziale

#### Props specifiche
```typescript
maxLength: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
options: InputSignal<string[]> = input<string[]>([])
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-datalist',
    templateUrl: './input-datalist.component.html',
    styleUrl: './input-datalist.component.scss',
    standalone: false
})
export class InputDatalistComponent {
  test: FormGroup = new FormGroup<{ datalist: AbstractControl<string | null> }>({
    datalist: new FormControl('', [Validators.required]),
  })

  datalist: string[] = [
    'Edge', 'Firefox', 'Chrome', 'Opera', 'Safari'
  ]
}
```

```html
<section>
  <h2>Input Datalist</h2>
  <form [formGroup]="test">
    <ngu-input-datalist
      formControlName="datalist"
      [id]="'datalist'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'datalist'"
      [options]="datalist"
    ></ngu-input-datalist>
  </form>
</section>
```

---

### Input Datalist Object

Input per la scelta di un elemento assegnata una datalist-object, la scelta restituirà un valore

#### Props specifiche
```typescript
maxLength: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
options: InputSignal<{ [key: string]: string | number }[]> = input<{ [key: string]: string | number }[]>([])
valueKey: InputSignal<string> = input<string>('')
optionKey: InputSignal<string> = input<string>('')
```

Essendo options un array di oggetti definiti come chiave-valore, le props **valueKey** e **optionKey** servono per poter recuperare rispettivamente il valore e la chiave da options

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-datalist-object',
    templateUrl: './input-datalist-object.component.html',
    styleUrl: './input-datalist-object.component.scss',
    standalone: false
})
export class InputDatalistObjectComponent {
  test: FormGroup = new FormGroup<{ datalistObject: AbstractControl<number | null> }>({
    datalistObject: new FormControl(null, [Validators.required]),
  })

  datalist: { [key: string]: string | number }[] = [
    { id: 1, browser: 'Edge' },
    { id: 2, browser: 'Firefox' },
    { id: 3, browser: 'Chrome' },
    { id: 4, browser: 'Opera' },
    { id: 5, browser: 'Safari' }
  ]
}
```

```html
<section>
<h2>Input Datalist Object</h2>
  <form [formGroup]="test">
    <ngu-input-datalist-object
      formControlName="datalistObject"
      [id]="'datalist'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'datalist'"
      [options]="datalist"
      [optionKey]="'browser'"
      [valueKey]="'id'"
    ></ngu-input-datalist-object>
  </form>
</section>
```

---

### Input Date

Input per inserimento di una data standard (gg/mm/aaaa)

#### Props specifiche
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

---

### Input Datetime

Input per inserimento di una data standard compreso l'orario (gg/mm/aaaa --:--)

#### Props specifiche
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

---

### Input Email

Input per inserimento di un indirizzo email valido

#### Props specifiche
```typescript
autofocus: InputSignal<boolean> = input<boolean>(false)
maxLength: InputSignal<number> = input<number>(0)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-email',
    templateUrl: './input-email.component.html',
    styleUrl: './input-email.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputEmailComponent {
  test: FormGroup = new FormGroup<{ email: AbstractControl<string | null> }>({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
}
```

```html
<section>
  <h2>Input email</h2>
  <form [formGroup]="test">
    <ngu-input-email
      formControlName="email"
      [id]="'email'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'email'"
      [maxLength]="30"
    ></ngu-input-email>
  </form>
</section>
```

---

### Input File

Input per inserimento di files sia con il drag&drop che con l'apposito pulsante di inserimento. Possibilità di inserire sia un singolo file che file multipli.

#### Props specifiche
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

---

### Input Hidden

Input hidden

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-hidden',
    templateUrl: './input-hidden.component.html',
    styleUrl: './input-hidden.component.scss',
    standalone: false
})
export class InputHiddenComponent {
  test: FormGroup = new FormGroup<{ hidden: AbstractControl<string | null> }>({
    hidden: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input Hidden</h2>
  <form [formGroup]="test">
    <ngu-input-hidden
      formControlName="hidden"
      [id]="'hidden'"
      [feature]="'input'"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'hidden'"
    ></ngu-input-hidden>
  </form>
</section>
```

---

### Input Month

Input che permette l'inserimento del mese e dell'anno scelto

#### Props specifiche
```typescript
autofocus: InputSignal<boolean> = input<boolean>(false)
min: InputSignal<string> = input<string>('')
max: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngu-kitchensink-input-month',
  standalone: false,
  templateUrl: './input-month.component.html',
  styleUrl: './input-month.component.scss',
})
export class InputMonthComponent {
  test: FormGroup = new FormGroup<{ month: AbstractControl<string | null> }>({
    month: new FormControl('', Validators.required),
  })
}
```

```html
<section class="ngu-grid">
  <h2>Input month</h2>
  <form [formGroup]="test">
    <ngu-input-month
      formControlName="month"
      [id]="'month'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [min]="'2026-06'"
      [max]="'2026-10'"
    ></ngu-input-month>
  </form>
</section>
```

---

### Input Number

Input che permette l'inserimento di un numero al suo interno

#### Props specifiche
```typescript
autofocus: InputSignal<boolean> = input<boolean>(false)
min: InputSignal<number> = input<string>(0)
max: InputSignal<number> = input<string>(0)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-number',
    templateUrl: './input-number.component.html',
    styleUrl: './input-number.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputNumberComponent {
  test: FormGroup = new FormGroup<{ number: AbstractControl<number | null> }>({
    number: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(15)]),
  })
}
```

```html
<section>
  <h2>Input number</h2>
  <form [formGroup]="test">
    <ngu-input-number
      formControlName="number"
      [id]="'number'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'age'"
      [min]="0"
      [max]="15"
    ></ngu-input-number>
  </form>
</section>
```

---

### Input Password

Input per password con caratteri mascherati.

#### Props specifiche
```typescript
maxLength: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-password',
    templateUrl: './input-password.component.html',
    styleUrl: './input-password.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputPasswordComponent {
  test: FormGroup = new FormGroup<{ password: AbstractControl<string | null> }>({
    password: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input password</h2>
  <form [formGroup]="test">
    <ngu-input-password
      formControlName="password"
      [id]="'password'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'new-password'"
      [maxLength]="30"
    ></ngu-input-password>
  </form>
</section>
```

---

### Input Radio

Radio button per selezioni multiple esclusive.

#### Props specifiche
```typescript
name: InputSignal<string> = input<string>('')
radioValue: InputSignal<string> = input<string>('')
radioLabel: InputSignal<string> = input<string>('')
labelIsVisible: InputSignal<boolean> = input<boolean>(true)
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-radio',
    templateUrl: './input-radio.component.html',
    styleUrl: './input-radio.component.scss',
    standalone: false
})
export class InputRadioComponent {
  test: FormGroup = new FormGroup<{ radio: AbstractControl<string | null> }>({
    radio: new FormControl('value-0', [Validators.required]),
  })
  options: { [key: string]: string | number }[] = [
    { id: 1, color: 'white' },
    { id: 2, color: 'red' },
    { id: 3, color: 'black' },
    { id: 4, color: 'blue' }
  ]
}
```

```html
<section>
  <h2>Input radio</h2>
  <form [formGroup]="test">
    @for (o of options; let i = $index; track i) {
      <ngu-input-radio
        formControlName="radio"
        [id]="'text-' + i"
        [name]="'radio'"
        [radioLabel]="'label-' + i"
        [radioValue]="'value-' + i"
        [feature]="'input'"
        [helpMsg]="true"
        [successMsg]="true"
        [errorMsg]="true"
        [autocomplete]="'radio'"
      ></ngu-input-radio>
    }
  </form>
  <dl>
    <dt>Value:</dt>
    <dd>{{ test.controls['radio'].value }}</dd>
  </dl>
</section>
```

---

### Input Range

Input slider per valori numerici in un range.

#### Props specifiche
```typescript
name: InputSignal<string> = input<string>('')
options: InputSignal<string[]> = input<string[]>([])
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-range',
    templateUrl: './input-range.component.html',
    styleUrl: './input-range.component.scss',
    standalone: false
})
export class InputRangeComponent {
  test: FormGroup = new FormGroup<{ range: AbstractControl<number | null> }>({
    range: new FormControl(0, [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input range</h2>
  <form [formGroup]="test">
    <ngu-input-range
      formControlName="range"
      [id]="'range'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'range'"
    ></ngu-input-range>
  </form>
</section>
```

---

### Input Search

Input ottimizzato per la ricerca.

#### Props specifiche
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

---

### Input Tel

Input per numeri di telefono.

#### Props specifiche
```typescript
maxLength: InputSignal<number> = input<number>(0)
autofocus: InputSignal<boolean> = input<boolean>(false)
pattern: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'ngu-kitchensink-input-tel',
    templateUrl: './input-tel.component.html',
    styleUrl: './input-tel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputTelComponent {
  test: FormGroup = new FormGroup<{ tel: AbstractControl<string | null> }>({
    tel: new FormControl('', [Validators.required]),
  })
}
```

```html
<section>
  <h2>Input tel</h2>
  <form [formGroup]="test">
    <ngu-input-tel
      formControlName="tel"
      [id]="'tel'"
      [maxLength]="36"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
      [autocomplete]="'tel'"
    ></ngu-input-tel>
  </form>
</section>
```

---

### Input Text

Input di testo standard con validazione.

#### Props specifiche
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

---

### Input Time

Input per la selezione dell'ora.

#### Props specifiche
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

---

### Input URL

Input per indirizzi URL con validazione nativa.

#### Props specifiche
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

---

### Input Week

Input per la selezione della settimana.

#### Props specifiche
```typescript
autofocus: InputSignal<boolean> = input<boolean>(false)
min: InputSignal<string> = input<string>('')
max: InputSignal<string> = input<string>('')
```

#### Esempio di utilizzo
```typescript
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ngu-kitchensink-input-week',
  standalone: false,
  templateUrl: './input-week.component.html',
  styleUrl: './input-week.component.scss',
})
export class InputWeekComponent {
  test: FormGroup = new FormGroup<{ week: AbstractControl<string | null> }>({
    week: new FormControl('', Validators.required),
  })
}
```

```html
<section class="ngu-grid">
  <h2>Input week</h2>
  <form [formGroup]="test">
    <ngu-input-week
      formControlName="week"
      [id]="'week'"
      [feature]="'input'"
      [helpMsg]="true"
      [successMsg]="true"
      [errorMsg]="true"
    ></ngu-input-week>
  </form>
</section>
```

---

### Select

Select standard per la selezione da una lista di stringhe.

#### Props specifiche
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

---

### Select Object

Select per la selezione da un array di oggetti.

#### Props specifiche
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

---

### Textarea

Area di testo multilinea.

#### Props specifiche
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

---
