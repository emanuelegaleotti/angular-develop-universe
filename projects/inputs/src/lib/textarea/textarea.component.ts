import {
  Component,
  ElementRef,
  Input, InputSignal,
  OnInit,
  Optional,
  Renderer2,
  Self, signal,
  WritableSignal,
  input, Signal, viewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ngu-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  id: InputSignal<string> = input<string>('')
  feature: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('off')
  maxLength: InputSignal<number> = input<number>(0)
  cols: InputSignal<number> = input<number>(0)
  rows: InputSignal<number> = input<number>(0)
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  autofocus: InputSignal<boolean> = input<boolean>(false)

  input: Signal<ElementRef<HTMLTextAreaElement> | undefined> = viewChild('input')
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

  /**
   * Initializes the translation keys used by the textarea labels and messages.
   * @returns {void} None.
   */
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

  /**
   * Registers the callback Angular forms uses when the textarea value changes.
   * @param {() => void} fn - callback provided by Angular forms
   * @returns {void} None.
   */
  registerOnChange (fn: () => void): void {
    this.onChanged = fn
  }

  /**
   * Registers the callback Angular forms uses when the textarea is touched.
   * @param {() => void} fn - callback provided by Angular forms
   * @returns {void} None.
   */
  registerOnTouched (fn: () => void): void {
    this.onTouched = fn
  }

  /**
   * Updates the disabled state of the native textarea element.
   * @param {boolean} isDisabled - disabled state provided by Angular forms
   * @returns {void} None.
   */
  setDisabledState (isDisabled: boolean): void {
    this.renderer.setProperty(this.input()?.nativeElement, 'disabled', isDisabled)
  }

  /**
   * Writes an external form value into the native textarea element.
   * @param {string} v - value provided by Angular forms
   * @returns {void} None.
   */
  writeValue (v: string): void {
    this.renderer.setProperty(this.input()?.nativeElement, 'value', v)
  }

  /**
   * Emits the textarea value to Angular forms and resizes the field to fit its content.
   * @param {Event} e - input event emitted by the native textarea
   * @returns {void} None.
   */
  setValue (e: Event): void {
    const v: string = (e.target as HTMLTextAreaElement).value
    this.onTouched()
    this.onChanged(v)
    this.renderer.setProperty(this.input()?.nativeElement, 'style.height', '')
    this.renderer.setProperty(this.input()?.nativeElement, 'style.height', this.input()?.nativeElement.scrollHeight)
  }
}
