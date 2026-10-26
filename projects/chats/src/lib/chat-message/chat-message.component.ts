import { Component, input, InputSignal } from '@angular/core'


@Component({
  selector: 'ngu-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',

})
export class ChatMessageComponent {
  message: InputSignal<string> = input<string>('')
  author: InputSignal<'user' | 'other'> = input<'user' | 'other'>('other')
  time: InputSignal<string | undefined> = input<string | undefined>(undefined)
}
