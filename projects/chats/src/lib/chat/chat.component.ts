import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChild, effect,
  ElementRef, inject,
  input,
  InputSignal,
  Signal, TemplateRef, viewChild
} from '@angular/core'
import { delay, of } from 'rxjs'
import { NgTemplateOutlet } from '@angular/common'
import { TranslocoDirective } from '@jsverse/transloco'
import { ChatMessageComponent } from '../chat-message/chat-message.component'
import { ChatFormComponent } from '../chat-form/chat-form.component'
import { ChatStore } from '../state/chat.store'
import { ChatBubble } from '../model/chat-bubble'

@Component({
  selector: 'ngu-chat',
  imports: [
    NgTemplateOutlet,
    TranslocoDirective,
    ChatMessageComponent,
    ChatFormComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements AfterViewInit {
  chatStore = inject(ChatStore)
  id: InputSignal<string> = input.required<string>()
  chatId: InputSignal<string> = input.required<string>()
  messages: InputSignal<(string | ChatBubble)[]> = input<(string | ChatBubble)[]>([])
  chatTitle: InputSignal<string> = input<string>('')
  body: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild('body')

  @ContentChild('chatSendIcon', { static: false }) sendTemplateRef: TemplateRef<any> | null = null

  constructor () {
    effect(() => {
      of(this.messages()).pipe(
        delay(1000),
      ).subscribe((() => {
        this.scrollBottom()
      }))
    })
  }

  toBubble (m: string | ChatBubble): ChatBubble {
    return typeof m === 'string' ? { text: m } : m
  }

  ngAfterViewInit () {
    this.scrollBottom()
  }

  scrollBottom (): void {
    this.body()?.nativeElement.scrollTo({
      top: this.body()?.nativeElement.scrollHeight,
      behavior: 'smooth'
    })
  }
}
