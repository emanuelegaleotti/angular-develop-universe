import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  Input, InputSignal, OnInit, Optional,
  QueryList,
  Renderer2,
  Self, Signal, signal, viewChild, ViewChild,
  ViewChildren, WritableSignal
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ngu-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputRadioComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  id: InputSignal<string> = input<string>('')
  name: InputSignal<string> = input<string>('')
  radioValue: InputSignal<string> = input<string>('')
  radioLabel: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('off')
  feature: InputSignal<string> = input<string>('')
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  labelIsVisible: InputSignal<boolean> = input<boolean>(true)

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild('input')
  _successMsg: WritableSignal<string> = signal<string>('')
  _helpMsg: WritableSignal<string> = signal<string>('')
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
      this.renderer.setProperty(this.input()?.nativeElement, 'checked', v === this.input()?.nativeElement.value)
  }

  setValue (e: Event): void {
    const v: string = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(v)
  }

  ngAfterViewInit(): void {
      this.renderer.setProperty(this.input()?.nativeElement, 'checked', this.control.value === this.input()?.nativeElement.value)
  }

}
