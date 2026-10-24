import {
  ChangeDetectionStrategy,
  Component, effect,
  ElementRef,
  EventEmitter, input, InputSignal,
  OnInit,
  Output, Renderer2,
  Signal,
  viewChild
} from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs'
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'ngu-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.scss',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatFormComponent implements OnInit {
  message: InputSignal<string | undefined> = input.required<string | undefined>()
  disabled: InputSignal<boolean | undefined> = input<boolean | undefined>(false)
  isReceiving: InputSignal<boolean | undefined> = input<boolean>()
  @Output() whenSubmitted: EventEmitter<string> = new EventEmitter<string>()
  input: Signal<ElementRef<HTMLTextAreaElement> | undefined> = viewChild('input')

  constructor (
    private readonly renderer: Renderer2,
  ) {
    effect(() => {
      this.messageForm.controls['messageToSend'].setValue(this.message());
    });
  }

  messageForm: FormGroup = new FormGroup({
    messageToSend: new FormControl('', [Validators.required]),
  })

  ngOnInit (): void {
    this.observeForm()
  }

  observeForm (): void {
    this.messageForm.controls['messageToSend'].valueChanges.pipe(
      debounceTime(200)
    ).subscribe(v => {
      this.renderer.setProperty(this.input()?.nativeElement, 'style.height', '')
      this.renderer.setProperty(this.input()?.nativeElement, 'style.height', this.input()?.nativeElement.scrollHeight)
    })
  }

  sendMessage (): void {
    this.whenSubmitted.emit(this.messageForm.controls['messageToSend'].value);
    this.messageForm.reset()
    this.messageForm.markAsPristine()
  }

}
