import {
  Component,
  ElementRef,
  input,
  Input, InputSignal,
  Optional,
  Renderer2,
  Self, Signal, viewChild,
  ViewChild,

} from '@angular/core'

import { ControlValueAccessor, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'ngu-input-hidden',
    templateUrl: './input-hidden.component.html',
    styleUrl: './input-hidden.component.scss',
    standalone: true,
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputHiddenComponent implements ControlValueAccessor {
  id: InputSignal<string> = input<string>('')
  feature: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('off')
  maxLength: InputSignal<number> = input<number>(0)
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild('input')

  protected readonly Object = Object

  constructor (
    private readonly renderer: Renderer2,
    @Self() @Optional() public readonly control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  public onTouched: () => void | null = (): void => {
    console.info('input hidden component')
  }
  public onChanged: (v: unknown) => void = (): void => {
    console.info('input hidden component')
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

}
