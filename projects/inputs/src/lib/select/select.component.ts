import {
  Component,
  ElementRef,
  Input, InputSignal,
  input,
  OnInit,
  Optional,
  Renderer2,
  Self,
  signal,
  WritableSignal, Signal, viewChild, AfterViewInit
} from '@angular/core'
import { ControlValueAccessor, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ngu-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  id: InputSignal<string> = input<string>('')
  feature: InputSignal<string> = input<string>('')
  options: InputSignal<string[]> = input<string[]>([])
  autocomplete: InputSignal<string> = input<string>('off')
  errorMsg: InputSignal<boolean> = input<boolean>(false)
  successMsg: InputSignal<boolean> = input<boolean>(false)
  helpMsg: InputSignal<boolean> = input<boolean>(false)
  autofocus: InputSignal<boolean> = input<boolean>(false)
  input: Signal<ElementRef<HTMLSelectElement> | undefined> = viewChild('input')
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
    console.log('select component')
  }
  public onChanged: (v: unknown) => void = (): void => {
    console.log('select component')
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
    const v: string = this.options()[(e.target as HTMLSelectElement).selectedIndex - 1]
    this.onTouched()
    this.onChanged(v)
  }
  ngAfterViewInit (): void {
    if (this.autofocus()) {
      this.input()?.nativeElement.focus()
    }
  }
}
