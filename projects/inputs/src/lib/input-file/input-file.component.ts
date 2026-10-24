import {
  ChangeDetectionStrategy,
  Component, ContentChild,
  ElementRef,
  input,
   InputSignal,
  OnInit,
  Optional,
  Renderer2,
  Self, Signal,
  signal, TemplateRef, viewChild,
  ViewChild,
  WritableSignal
} from '@angular/core'
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ngu-input-file',
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  standalone: true,
  imports: [CommonModule, TranslocoModule, ReactiveFormsModule, FormsModule]
})
export class InputFileComponent implements ControlValueAccessor, OnInit {
  id: InputSignal<string> = input<string>('');
  feature: InputSignal<string> = input<string>('');
  accept: InputSignal<string> = input<string>('');
  autocomplete: InputSignal<string> = input<string>('off');
  maxLength: InputSignal<number> = input<number>(0);
  errorMsg: InputSignal<boolean> = input<boolean>(false);
  successMsg: InputSignal<boolean> = input<boolean>(false);
  helpMsg: InputSignal<boolean> = input<boolean>(false);
  autofocus: InputSignal<boolean> = input<boolean>(false);
  multiple: InputSignal<boolean> = input<boolean>(false);
  files: WritableSignal<File[]> = signal<File[]>([]);

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild('input')

  @ContentChild('removeIcon', { static: false }) removeIcon: TemplateRef<any> | null = null

  _successMsg: WritableSignal<string> = signal<string>('')
  _helpMsg: WritableSignal<string> = signal<string>('')
  _label: WritableSignal<string> = signal<string>('')
  _dropZoneMessage: WritableSignal<string> = signal<string>('');
  _isDragging: WritableSignal<boolean> = signal<boolean>(false)
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
    this._dropZoneMessage.set(`${this.feature()}.${this.control.name}.dropMessage`)
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

  setValue (input: FileList): void {
    let updateFile: File[] = [];

    if (input){
      const selectedFiles = input ? Array.from(input) : [];

      if(this.multiple()){
        updateFile = [...this.files(), ...selectedFiles];
      } else {
        const file = input[0];
        updateFile = [file];
      }
      this.files.set(updateFile);
      this.onTouched();
      this.onChanged(updateFile);
    }
  }

  addFile(e: Event){
    const input = e.target as HTMLInputElement;
    if (input?.files !== null) {
      this.setValue(input?.files);
    }
  }

  dropHandler (e: DragEvent): void {
    this._isDragging.set(false)
    e.preventDefault()
    const input = e.dataTransfer as HTMLInputElement | null;
    if (input?.files !== null && input?.files !== undefined) {
      this.setValue(input?.files);
    }
  }

  dragOverHandler (e: DragEvent) {
    this._isDragging.set(true)
    e.preventDefault()
  }

  removeFileAtIndex (i: number): void {
    const filteredFiles = this.files().filter((_, index) => i !== index)
    this.files.set(filteredFiles)
    this.onTouched()
    this.onChanged(filteredFiles)
  }

  trackFile (i: number): number {
    return i;
  }
}
