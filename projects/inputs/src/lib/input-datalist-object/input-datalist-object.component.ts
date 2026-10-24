import {
  Component,
  ElementRef,
  input,
  Input, InputSignal,
  OnInit,
  Optional,
  Renderer2,
  Self, Signal,
  signal, viewChild,
  ViewChild,
  WritableSignal
} from '@angular/core'
import { ControlValueAccessor, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';


@Component({
    selector: 'ngu-input-datalist-object',
    templateUrl: './input-datalist-object.component.html',
    styleUrl: './input-datalist-object.component.scss',
    standalone: true,
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputDatalistObjectComponent implements ControlValueAccessor, OnInit {
  id: InputSignal<string> = input<string>('')
  feature: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('')
  maxLength: InputSignal<number> = input<number>(0)
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  autofocus: InputSignal<boolean> = input<boolean>(false)
  options: InputSignal<{ [key: string]: string | number }[]> = input<{ [key: string]: string | number }[]>([])
  valueKey: InputSignal<string> = input<string>('')
  optionKey: InputSignal<string> = input<string>('')

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild('input')

  _successMsg: WritableSignal<string> = signal<string>('')
  _placeholder: WritableSignal<string> = signal<string>('')
  _helpMsg: WritableSignal<string> = signal<string>('')
  _label: WritableSignal<string> = signal<string>('')
  protected readonly Object = Object

  constructor (
    private readonly renderer: Renderer2,
    @Self() @Optional() public readonly control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  ngOnInit (): void {
    this._helpMsg.set(`${this.feature()}.${this.control.name}.help`)
    this._successMsg.set(`${this.feature()}.${this.control.name}.success`)
    this._placeholder.set(`${this.feature()}.${this.control.name}.placeholder`)
    this._label.set(`${this.feature()}.${this.control.name}.label`)
  }

  public onTouched: () => void | null = (): void => {
    console.log('input text component')
  }
  public onChanged: (v: unknown) => void = (): void => {
    console.log('input text component')
  }

  registerOnChange (fn: () => void): void {
    this.onChanged = fn
  }

  registerOnTouched (fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input()?.nativeElement, 'disabled', isDisabled)
  }

  writeValue (v: string): void {
    const o = this.options().find(o => o[this.valueKey()] === v)
    this.renderer.setProperty(this.input()?.nativeElement, 'value', o ? o[this.optionKey()] : '')
  }

  setValue (e: Event): void {
    const v = this.options().find(o => o[this.optionKey()] === (e.target as HTMLInputElement).value)
    this.onTouched()
    this.onChanged(v ? v[this.valueKey()] : undefined)
  }
}
