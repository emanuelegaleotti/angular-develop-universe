import { Component, OnInit } from '@angular/core'
import { delay, of } from 'rxjs'
import {  ChatComponent } from 'angular-develop-universe/chats'


@Component({
  selector: 'ngu-kitchensink-chat',
  imports: [
    ChatComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class KitchenSinkChatComponent implements OnInit {
  messages: string[] = []

  ngOnInit (): void {
    of(
      [
        '> ⚠️ **Attenzione:** Il sistema sarà in manutenzione **sabato dalle 22:00 alle 02:00**.  \n' +
        '> Alcuni servizi potrebbero non essere disponibili.  \n' +
        '>  \n' +
        '> _Grazie per la pazienza._\n',
        '# 📊 Report Settimanale – Progetto Phoenix\n' +
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
        '> “La perfezione si raggiunge non quando non c’è più nulla da aggiungere,  \n' +
        '> ma quando non c’è più nulla da togliere.”  \n' +
        '> — *Antoine de Saint-Exupéry*\n',
        '## ✅ Deploy – Istruzioni rapide\n' +
        '\n' +
        'Prima di eseguire il deploy in produzione, assicurati di seguire questi passaggi fondamentali:\n' +
        '\n' +
        '- Esegui i test automatici per verificare che tutto funzioni correttamente:\n' +
        '  ```bash\n' +
        '  npm run test\n',
        '# 📊 Report Settimanale – Progetto Phoenix\n' +
        '\n' +
        '## 🚀 Obiettivi raggiunti\n' +
        '\n' +
        '| Task             | Stato    \n' +
        '|------------------|-----------|-----\n'
      ]
    ).pipe(
      delay(2000)
    ).subscribe(m => this.messages = m)
  }
}
