import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChild, computed, effect,
  ElementRef, inject,
  input,
  InputSignal,
  Signal, TemplateRef,
  viewChild
} from '@angular/core'
import { delay, of } from 'rxjs'
import { TranslocoDirective } from '@jsverse/transloco'
import { JsonPipe, NgTemplateOutlet } from '@angular/common'
import { ChatLikeFeedbackComponent } from '../chat-like-feedback/chat-like-feedback.component'
import { ChatMessageAiComponent } from '../chat-message-ai/chat-message-ai.component'
import { ChatDislikeFeedbackComponent } from '../chat-dislike-feedback/chat-dislike-feedback.component'
import { ChatKnowledgeBaseComponent } from '../chat-knowledge-base/chat-knowledge-base.component'
import { ChatFormComponent } from '../chat-form/chat-form.component'
import { MessageView } from '../model/message-view'
import { ChatStore } from '../state/chat.store'
import {ChatEmptyComponent} from "../chat-empty/chat-empty.component";


@Component({
  selector: 'ngu-chat-ai',
  imports: [
    TranslocoDirective,
    NgTemplateOutlet,
    JsonPipe,
    ChatLikeFeedbackComponent,
    ChatMessageAiComponent,
    ChatDislikeFeedbackComponent,
    ChatKnowledgeBaseComponent,
    ChatFormComponent,
    ChatEmptyComponent
  ],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatAiComponent implements AfterViewInit {
  chatStore = inject(ChatStore)
  id: InputSignal<string> = input.required<string>()
  chatId: InputSignal<string> = input.required<string>()
  chatTitle: InputSignal<string> = input<string>('')
  body: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild('body')

  _messages = computed<MessageView[]>(() => this.chatStore.chats()[this.chatId()]?.messages ?? [])
  _message = computed<string | undefined>(() => this.chatStore.chats()[this.chatId()]?.message)
  _likeId = computed<string | undefined>(() => this.chatStore.chats()[this.chatId()]?.messageLikeId)
  _dislikeId = computed<string | undefined>(() => this.chatStore.chats()[this.chatId()]?.messageDislikeId)
  _messageLikeToSend = computed<string | undefined>(() => this.chatStore.chats()[this.chatId()]?.messageLike)
  _messageDislikeToSend = computed<string | undefined>(() => this.chatStore.chats()[this.chatId()]?.messageDislike)
  _selectedKnowledgeBase = computed<string[]>(() => this.chatStore.chats()[this.chatId()]?.selectedKnowledgeBase ?? [])
  _knowledgeBase = computed(() => this.chatStore.knowledgeBase())
  _isReceiving = computed(() => this.chatStore.isReceiving())
  _temporaryMessage = computed(() => this.chatStore.temporaryMessage())
  _temporaryKnowledgeBase = computed(() => this.chatStore.temporaryKnowledgeBases())

  @ContentChild('chatLikeIcon', { static: false }) likeTemplateRef: TemplateRef<any> | null = null
  @ContentChild('chatDislikeIcon', { static: false }) dislikeTemplateRef: TemplateRef<any> | null = null
  @ContentChild('chatActionIcon', { static: false }) actionTemplateRef: TemplateRef<any> | null = null
  @ContentChild('chatSendIcon', { static: false }) sendTemplateRef: TemplateRef<any> | null = null
  @ContentChild('chatSpinIcon', { static: false }) spinTemplateRef: TemplateRef<any> | null = null
  @ContentChild('chatCloseIcon', { static: false }) closeTemplateRef: TemplateRef<any> | null = null

  constructor () {
    effect(() => {
      const m = this._messages()
      of(m).pipe(
        delay(500),
      ).subscribe((() => {
        this.scrollBottom()
      }))
    })
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

  send (message: string): void {
    this.chatStore.storeMessage(this.chatId(), message)
  }

  submitMessageLike (message: string): void {
    this.chatStore.storeLikeMessage(this.chatId(), message)
  }

  submitMessageDislike (message: string): void {
    this.chatStore.storeDislikeMessage(this.chatId(), message)
  }

  knowledgeBaseAdd (code: string): void {
    if (this.chatId()) {
      this.chatStore.addSelectedKnowledgeBase(this.chatId(), code)
    } else {
      this.chatStore.addTemporaryKnowledgeBase(code)
    }
  }

  knowledgeBaseRemove (code: string): void {
    if (this.chatId()) {
      this.chatStore.removeSelectedKnowledgeBase(this.chatId(), code)
    } else {
      this.chatStore.removeTemporaryKnowledgeBase(code)
    }
  }
}
