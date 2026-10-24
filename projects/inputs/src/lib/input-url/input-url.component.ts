import {
  Component, ElementRef, forwardRef, input, Input, InputSignal, OnInit, Optional, Renderer2, Self,
  Signal, signal, viewChild, ViewChild,
  WritableSignal
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'ngu-input-url',
    templateUrl: './input-url.component.html',
    styleUrls: ['./input-url.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputUrlComponent implements ControlValueAccessor, OnInit {
  id: InputSignal<string> = input<string>('')
  name: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('off')
  feature: InputSignal<string> = input<string>('')
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  pattern: InputSignal<string> = input<string>('')

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild('input')

  _successMsg: WritableSignal<string> = signal<string>('')
  _helpMsg: WritableSignal<string> = signal<string>('')
  _label: WritableSignal<string> = signal<string>('')
  protected readonly Object = Object;

  constructor(
    private readonly renderer: Renderer2,
    @Self() @Optional() public readonly control: NgControl
  ) {
    this.control.valueAccessor = this;
  }

  public onTouched: () => void | null = (): void => {
    console.log('input url component')
  }
  public onChanged: (v: unknown) => void = (): void => {
    console.log('input url component')
  }
  ngOnInit(): void {
    this._helpMsg.set(`${this.feature()}.${this.control.name}.help`)
    this._successMsg.set(`${this.feature()}.${this.control.name}.success`)
    this._label.set(`${this.feature()}.${this.control.name}.label`)
  }
  registerOnChange(fn: () => void): void {
    this.onChanged = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input()?.nativeElement, 'disabled', isDisabled)
  }

  writeValue(v: string): void {
    this.renderer.setProperty(this.input()?.nativeElement, 'value', v)
  }

  setValue(e: Event): void {
    const v: string = (e.target as HTMLInputElement).value
    this.onTouched()
    this.onChanged(v)
  }
}
