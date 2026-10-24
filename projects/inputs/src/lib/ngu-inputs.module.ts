import { NgModule } from '@angular/core'
import { InputTextComponent } from './input-text/input-text.component'
import { InputNumberComponent } from './input-number/input-number.component'
import { InputSearchComponent } from './input-search/input-search.component'
import { InputEmailComponent } from './input-email/input-email.component'
import { InputUrlComponent } from './input-url/input-url.component'
import { InputTimeComponent } from './input-time/input-time.component'
import { InputTelComponent } from './input-tel/input-tel.component'
import { InputPasswordComponent } from './input-password/input-password.component'
import { InputDatetimeLocalComponent } from './input-datetime-local/input-datetime-local.component'
import { InputDateComponent } from './input-date/input-date.component'
import { InputColorComponent } from './input-color/input-color.component'
import { InputRadioComponent } from './input-radio/input-radio.component'
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component'
import { TextareaComponent } from './textarea/textarea.component'
import { CommonModule } from '@angular/common'
import { InputRangeComponent } from './input-range/input-range.component'
import { InputHiddenComponent } from './input-hidden/input-hidden.component'
import { SelectComponent } from './select/select.component'
import { InputDatalistComponent } from './input-datalist/input-datalist.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputFileComponent } from './input-file/input-file.component'
import { SelectObjectComponent } from './select-object/select-object.component'
import { InputDatalistObjectComponent } from './input-datalist-object/input-datalist-object.component'
import { TranslocoModule } from '@jsverse/transloco';
import { InputMonthComponent } from './input-month/input-month.component';
import { InputWeekComponent } from './input-week/input-week.component'

@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputSearchComponent,
    InputEmailComponent,
    InputUrlComponent,
    InputTimeComponent,
    InputTelComponent,
    InputPasswordComponent,
    InputDatetimeLocalComponent,
    InputDateComponent,
    InputColorComponent,
    InputRadioComponent,
    InputCheckboxComponent,
    TextareaComponent,
    InputRangeComponent,
    InputHiddenComponent,
    SelectComponent,
    InputDatalistComponent,
    InputFileComponent,
    SelectObjectComponent,
    InputDatalistObjectComponent,
    InputMonthComponent,
    InputWeekComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputSearchComponent,
    InputEmailComponent,
    InputUrlComponent,
    InputTimeComponent,
    InputTelComponent,
    InputPasswordComponent,
    InputDatetimeLocalComponent,
    InputDateComponent,
    InputColorComponent,
    InputRadioComponent,
    InputCheckboxComponent,
    TextareaComponent,
    InputRangeComponent,
    InputHiddenComponent,
    InputDatalistComponent,
    InputFileComponent,
    SelectComponent,
    SelectObjectComponent,
    InputDatalistObjectComponent,
    InputMonthComponent,
    InputWeekComponent
  ]
})
export class NguInputsModule {
}
