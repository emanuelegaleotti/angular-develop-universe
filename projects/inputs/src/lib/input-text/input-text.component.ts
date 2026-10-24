import {
  AfterViewInit,
  Component, ElementRef,
  input,
  Input, InputSignal,
  OnInit,
  Optional,
  Renderer2,
  Self, Signal,
  signal, viewChild,
  WritableSignal
} from '@angular/core'
import { ControlValueAccessor, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ngu-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputTextComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  id: InputSignal<string> = input<string>('')
  feature: InputSignal<string> = input<string>('')
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  autocomplete: InputSignal<string> = input<string>('none')
  maxLength: InputSignal<number> = input<number>(0)
  autofocus: InputSignal<boolean> = input<boolean>(false)
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
    this.renderer.setProperty(this.input()?.nativeElement, 'value', v)
  }

  setValue (e: Event): void {
    const v: string = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(v)
  }

  ngAfterViewInit (): void {
    if (this.autofocus()) {
      this.input()?.nativeElement.focus()
    }
  }

}
