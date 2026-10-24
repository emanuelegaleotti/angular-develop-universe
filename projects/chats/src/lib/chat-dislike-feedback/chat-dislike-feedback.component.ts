import {Component, EventEmitter, input, InputSignal, Output} from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslocoDirective } from '@jsverse/transloco'

@Component({
  selector: 'ngu-chat-dislike-feedback',
  templateUrl: './chat-dislike-feedback.component.html',
  styleUrl: './chat-dislike-feedback.component.scss',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective
  ]
})
export class ChatDislikeFeedbackComponent {
  message: InputSignal<string> = input<string>('');
  @Output() whenSubmit: EventEmitter<string> = new EventEmitter()
  @Output() whenClose: EventEmitter<undefined> = new EventEmitter()
  feedbackForm: FormGroup = new FormGroup({
    feedback: new FormControl('', [Validators.required]),
  })

  get feedback (): FormControl {
    return this.feedbackForm.controls['feedback'] as FormControl
  }

  sendFeedback (): void {
    this.whenSubmit.emit(this.feedbackForm.controls['feedback'].value)
    this.feedbackForm.reset()
    this.feedbackForm.markAsPristine()
  }

  protected readonly Object = Object;
}
