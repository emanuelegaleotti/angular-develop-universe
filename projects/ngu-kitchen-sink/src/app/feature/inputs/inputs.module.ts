import { NgModule } from '@angular/core'
import { InputTextComponent } from './input-text/input-text.component'
import { NguInputsModule } from 'angular-develop-universe/inputs'
import { ReactiveFormsModule } from '@angular/forms'
import { provideRouter } from '@angular/router'
import { inputsRoutes } from './inputs.routes'
import { InputNumberComponent } from './input-number/input-number.component'
import { InputEmailComponent } from './input-email/input-email.component'
import { InputPasswordComponent } from './input-password/input-password.component'
import { InputSearchComponent } from './input-search/input-search.component'
import { InputTimeComponent } from './input-time/input-time.component'
import { InputTelComponent } from './input-tel/input-tel.component'
import { InputDatetimeLocalComponent } from './input-datetime-local/input-datetime-local.component'
import { InputDateComponent } from './input-date/input-date.component'
import { InputRangeComponent } from './input-range/input-range.component'
import { InputUrlComponent } from './input-url/input-url.component'
import { InputHiddenComponent } from './input-hidden/input-hidden.component'
import { InputColorComponent } from './input-color/input-color.component'
import { InputDatalistComponent } from './input-datalist/input-datalist.component'
import { InputFileComponent } from './input-file/input-file.component'
import {JsonPipe, NgClass} from '@angular/common'
import { SelectComponent } from './select/select.component'
import { SelectObjectComponent } from './select-object/select-object.component'
import { TextareaComponent } from './textarea/textarea.component'
import { InputDatalistObjectComponent } from './input-datalist-object/input-datalist-object.component'
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component'
import { InputRadioComponent } from './input-radio/input-radio.component'
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { InputMonthComponent } from './input-month/input-month.component';
import { InputWeekComponent } from './input-week/input-week.component'

@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputSearchComponent,
    InputTimeComponent,
    InputTelComponent,
    InputDatetimeLocalComponent,
    InputDateComponent,
    InputUrlComponent,
    InputRangeComponent,
    InputHiddenComponent,
    InputColorComponent,
    InputDatalistComponent,
    InputFileComponent,
    SelectComponent,
    SelectObjectComponent,
    TextareaComponent,
    InputDatalistObjectComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputMonthComponent,
    InputWeekComponent
  ],
    imports: [
        NguInputsModule,
        ReactiveFormsModule,
        JsonPipe,
        NguInputsModule,
        NgClass
    ],
  providers: [
    provideRouter(inputsRoutes),
    { provide: TRANSLOCO_SCOPE, useValue: 'input' }
  ]
})
export class InputsModule {}
