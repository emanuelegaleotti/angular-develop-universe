import {
  ChangeDetectionStrategy,
  Component,
  effect, EventEmitter,
  input,
  InputSignal, Output,
  signal,
  WritableSignal
} from '@angular/core'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { VFile } from 'vfile'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { TranslocoDirective } from '@jsverse/transloco'
import {NgClass} from "@angular/common";
import { MessageView } from '../model/message-view'

@Component({
  selector: 'ngu-chat-message-ai',
  templateUrl: './chat-message-ai.component.html',
  styleUrl: './chat-message-ai.component.scss',
  imports: [
    TranslocoDirective,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageAiComponent {
  message: InputSignal<MessageView | undefined> = input<MessageView>()
  _message: WritableSignal<SafeHtml> = signal<SafeHtml>('')
  @Output() whenLike: EventEmitter<string> = new EventEmitter()
  @Output() whenDislike: EventEmitter<string> = new EventEmitter()
  @Output() whenAction: EventEmitter<string> = new EventEmitter()

  constructor (private sanitizer: DomSanitizer) {
    effect(() => {
      remark()
        .use(remarkGfm)
        .use(remarkHtml)
        .process(this.message()?.content).then((m: VFile) => {
        this._message.set(this.sanitizer.bypassSecurityTrustHtml(m.value as string))
      })
    })
  }
}
