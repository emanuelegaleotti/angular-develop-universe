import { Component } from '@angular/core'
import { ChatBubble, ChatComponent } from 'angular-develop-universe/chats'


@Component({
  selector: 'ngu-kitchensink-chat',
  imports: [
    ChatComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class KitchenSinkChatComponent {
  messages: ChatBubble[] = [
    { author: 'other', time: '09:41', text: 'Ciao! Sono l’assistente di angular-develop-universe. Come posso aiutarti?' },
    { author: 'user', time: '09:42', text: 'Ciao, come si crea un componente standalone?' },
    {
      author: 'other',
      time: '09:42',
      text: 'Da Angular 19 i componenti sono standalone di default.\nBasta usare `ng generate component nome` e importare direttamente ciò che serve nell’array `imports`.'
    },
    { author: 'user', time: '09:43', text: 'E per i dati reattivi?' },
    {
      author: 'other',
      time: '09:44',
      text: 'Usa i signal: `signal()` per lo stato, `computed()` per i valori derivati ed `effect()` per gli effetti collaterali. Con `input()` e `output()` hai anche API dei componenti basate su signal, senza decoratori.'
    },
    { author: 'user', time: '09:45', text: 'Perfetto, grazie! 🙌' },
    { author: 'other', time: '09:45', text: 'Figurati! Scrivimi pure se hai altre domande.' },
  ]
}
