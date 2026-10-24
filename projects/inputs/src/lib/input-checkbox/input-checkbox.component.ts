import {
  Component,
  ElementRef,
  forwardRef,
  input,
  Input, InputSignal,
  OnInit,
  Optional,
  Renderer2,
  Self, Signal, signal, viewChild,
  ViewChild,
  WritableSignal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'ngu-input-checkbox',
    templateUrl: './input-checkbox.component.html',
    styleUrls: ['./input-checkbox.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputCheckboxComponent implements ControlValueAccessor, OnInit {
  id: InputSignal<string> = input<string>('')
  name: InputSignal<string> = input<string>('')
  label: InputSignal<string> = input<string>('')
  value: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('off')
  feature: InputSignal<string> = input<string>('')
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  labelIsVisible: InputSignal<boolean> = input<boolean>(true)

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild('input')

  _successMsg: WritableSignal<string> = signal<string>('')
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
    this._label.set(`${this.feature()}.${this.control.name}.label`)
  }

  public onTouched: () => void | null = (): void => {
    console.info('input checkbox component')
  }
  public onChanged: (v: unknown) => void = (): void => {
    console.info('input checkbox component')
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

  writeValue (v: boolean): void {
    this.renderer.setProperty(this.input()?.nativeElement, 'checked', v)
  }

  setValue (e: Event): void {
    const v: boolean = (e.target as HTMLInputElement).checked
    this.onTouched()
    this.onChanged(v)
  }

}
