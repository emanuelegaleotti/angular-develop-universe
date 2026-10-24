import { Component, inject, OnInit } from '@angular/core'
import { ChatAiComponent, ChatStore } from 'angular-develop-universe/chats'
import { MessageView } from 'angular-develop-universe/chats/src/lib/model/message-view'
import { delay, of } from 'rxjs'
import {KBInformation} from "angular-develop-universe/chats/src/lib/model/knowledge-information";

@Component({
  selector: 'ngu-kitchensink-chat-ai',
  imports: [
    ChatAiComponent,
  ],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.scss',
})
export class KitchenSinkChatAiComponent implements OnInit {

  private readonly chatStore = inject(ChatStore)

  ngOnInit (): void {
    const messages: MessageView[] = [
      {
        messageId: '1',
        id: 1,
        correlationId: null,
        content: "Ciao, che informazioni sai darmi?\n",
        progressive: 0,
        source: 'USER',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '2',
        id: 2,
        correlationId: null,
        content: '> ⚠️ **Attenzione:** Il sistema sarà in manutenzione **sabato dalle 22:00 alle 02:00**.  \n' +
          '> Alcuni servizi potrebbero non essere disponibili.  \n' +
          '>  \n' +
          '> _Grazie per la pazienza._\n',
        progressive: 0,
        source: 'AI',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '3',
        id: 3,
        correlationId: null,
        content: "Sapresti fornirmi informazioni sul progetto Phoenix?\n",
        progressive: 0,
        source: 'USER',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '4',
        id: 4,
        correlationId: null,
        content: '# 📊 Report Settimanale – Progetto Phoenix\n' +
          '\n' +
          '## 🚀 Obiettivi raggiunti\n' +
          '\n' +
          '| Task             | Stato     | Responsabile |\n' +
          '|------------------|-----------|--------------|\n' +
          '| Login con OAuth  | ✅ Completato | Alice        |\n' +
          '| Dashboard metrics| 🚧 In corso  | Bob          |\n' +
          '| Notifiche push   | 🔴 In ritardo | Carla        |\n' +
          '\n' +
          '## 📷 Anteprima\n' +
          '\n' +
          '![Screenshot dashboard](https://picsum.photos/200/300)\n' +
          '\n' +
          '---\n' +
          '\n' +
          '## 🗓️ Prossimi step\n' +
          '\n' +
          '- [ ] Finalizzare notifiche push\n' +
          '- [ ] Test su dispositivi mobili\n' +
          '- [ ] Review finale con il team\n' +
          '\n' +
          '> "La perfezione si raggiunge non quando non c\'è più nulla da aggiungere,  \n' +
          '> ma quando non c\'è più nulla da togliere."  \n' +
          '> — *Antoine de Saint-Exupéry*\n',
        progressive: 0,
        source: 'AI',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '5',
        id: 5,
        correlationId: null,
        content: "Come si fa il deploy per passaggio in produzione?\n",
        progressive: 0,
        source: 'USER',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '6',
        id: 6,
        correlationId: null,
        content: '## ✅ Deploy – Istruzioni rapide\n' +
          '\n' +
          'Prima di eseguire il deploy in produzione, assicurati di seguire questi passaggi fondamentali:\n' +
          '\n' +
          '- Esegui i test automatici per verificare che tutto funzioni correttamente:\n' +
          '  ```bash\n' +
          '  npm run test\n',
        progressive: 0,
        source: 'AI',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '7',
        id: 7,
        correlationId: null,
        content: "Report settimanale del progetto Phoenix\n",
        progressive: 0,
        source: 'USER',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      },
      {
        messageId: '8',
        id: 8,
        correlationId: null,
        content: '# 📊 Report Settimanale – Progetto Phoenix\n' +
          '\n' +
          '## 🚀 Obiettivi raggiunti\n' +
          '\n' +
          '| Task             | Stato    \n' +
          '|------------------|-----------|-----\n',
        progressive: 0,
        source: 'AI',
        reaction: null,
        comment: null,
        createdAt: '',
        updatedAt: ''
      }
    ]
    of(messages).pipe(
      delay(2000)
    ).subscribe(m => {
      this.chatStore.storeMessages('test', m)
    })

    const knowledgeBases: KBInformation[] = [
      {
        contextId: "1",
        displayName: "Test 1",
        ragTableName: "test 1",
      },
      {
        contextId: "2",
        displayName: "Test 2",
        ragTableName: "test 2",
      },
      {
        contextId: "3",
        displayName: "Test 3",
        ragTableName: "test 3",
      }
    ]

    of(knowledgeBases).pipe(
      delay(2000)
    ).subscribe(kb => {
      this.chatStore.storeKnowledgeBase(kb)
    })

  }
}
