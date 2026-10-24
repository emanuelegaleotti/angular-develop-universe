# angular-develop-universe Monorepo

angular-develop-universe è un monorepo Angular che ospita la libreria `angular-develop-universe` (radicata in `projects/root`) e l'applicazione dimostrativa *Kitchen Sink* (`projects/ngu-kitchen-sink`). La libreria fornisce componenti standalone, servizi e utilities progettati per applicazioni enterprise, mentre la Kitchen Sink replica scenari reali per validare rapidamente ciascun blocco funzionale.

> Documentazione approfondita: vedere `DOCUMENTATION.md` per schede complete di ogni modulo.

## Struttura del repository

```
angular-kitchen-sink/
├── projects/
│   ├── root/          # Entry point npm angular-develop-universe (barrel + provider helpers)
│   ├── components/    # UI primitives (card, pager, media, layout)
│   ├── inputs/        # CVA-ready form controls (text, select, file, ...)
│   ├── dialogs/       # Dialog e offcanvas engine
│   ├── chats/         # Messaging UI e servizi realtime
│   ├── azure/         # Azure AD auth helpers
│   ├── cognito/       # AWS Cognito auth helpers
│   ├── keycloak/      # Keycloak auth helpers
│   ├── utility/       # Utilities condivise (state, storage, pipes)
│   └── ngu-kitchen-sink/ # App demo standalone
├── DOCUMENTATION.md   # Manuale funzionale e API dettagliate
└── README.md          # Questo file
```

Ogni sottocartella segue la style guide ufficiale Angular: componenti standalone, nomi descrittivi (`NguComponentNameComponent`), cartelle per feature e file `.spec.ts` accanto alle implementazioni.

## Filosofia dei componenti

- **Standalone First**: ogni componente, direttiva o pipe esportata è standalone e dichiara le proprie dipendenze tramite `imports`. L'integrazione avviene tramite `imports: [ComponentX]` o `provideAssets*()` nel `app.config.ts`.
- **Signals & Rx-friendly**: quando serve stato locale viene usata l'API Signals per favorire la sincronizzazione deterministica; stream pubblici rimangono `Observable` per l'integrazione con NgRx.
- **Configurazione vs. opinione**: lo stile è minimale per consentire override tramite SCSS applicativo; i componenti espongono `@Input()` per classi CSS e template projection per personalizzare slot.
- **Accessibilità**: attributi ARIA default, gestione focus, messaggeria i18n tramite Transloco (`baseMsg` + chiavi contestuali).
- **Naming e cartelle**: `feature-name/feature-name.component.ts` con test e stylesheet affiancati; selector prefissato `ngu-` (es. `ngu-input-text`).

## Installazione e toolchain

Prerequisiti consigliati:
- Node.js >= 20
- Angular CLI >= 17
- PNPM o NPM (il progetto usa NPM nei lockfile)

```bash
npm install
```

Comandi principali:

```bash
npm run lint           # ESLint su tutte le librerie
npm run test           # Karma/Jasmine per i pacchetti con spec
npm run build root     # Build della libreria pubblicabile
npm run build ngu-kitchen-sink -- --configuration=production
```

## Utilizzo della libreria in un'applicazione

1. **Installa il pacchetto** (una volta pubblicato) oppure collega localmente la cartella `dist/root`.
2. **Configura i provider** nel tuo `app.config.ts`:

```typescript
import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideTransloco } from '@jsverse/transloco'
import { provideAssetsDialogs, provideAssetsAzure } from 'angular-develop-universe'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideStore({}),
    provideEffects([]),
    provideTransloco(translocoConfig),
    provideAssetsDialogs(),
    provideAssetsAzure()
  ]
}
```

3. **Importa i componenti standalone** direttamente:

```typescript
import { Component } from '@angular/core'
import { ReactiveFormsModule, FormControl } from '@angular/forms'
import { InputTextComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'app-login-demo',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent],
  template: `<ngu-input-text [baseMsg]="'login.username'" [id]="'username'" [formControl]="username"></ngu-input-text>`
})
export class LoginDemoComponent {
  username = new FormControl('')
}
```

Consulta `DOCUMENTATION.md` per l'elenco completo di input, outputs e esempi avanzati.

## Kitchen Sink Application

`projects/ngu-kitchen-sink` è un'app standalone che funge da catalogo interattivo:
- riproduce scenari autentici (form, dialoghi, chat, autenticazione) aggregando i componenti della libreria;
- dimostra come configurare Transloco, NgRx store/effects, e provider personalizzati (`provideAssets*`);
- fornisce routing per categoria (components, inputs, dialogs, ecc.) permettendo di osservare layout e best practice.

Avvio locale:

```bash
npm run serve ngu-kitchen-sink
```

Questo comando esegue l'app in modalità dev, utile per testare regressioni e valutare le API esposte.

## Workflow di sviluppo

1. **Feature branches**: crea una branch per ogni enhancement o fix.
2. **Coding standards**:
   - segui l'Angular Style Guide (naming, cartelle per feature, `OnPush` per i componenti visuali);
   - mantieni i componenti standalone e preferisci `inject()` rispetto ai costruttori quando appropriato;
   - usa `@for/@if` nel template per sfruttare le control flow blocks moderne.
3. **Testing**: accompagna ogni componente/lib con `.spec.ts` ed eventualmente scenari nella Kitchen Sink.
4. **Build & Publish**:
   - `npm run build root` genera `dist/root` pronto per `npm publish`;
   - le altre librerie (`dialogs`, `inputs`, ecc.) possono essere pubblicate singolarmente tramite i rispettivi `ng-package.json` se necessario.

## Contribuire

- Apri una issue descrivendo contesto e design proposto.
- Segui il Conventional Commits (`feat:`, `fix:`, `docs:` ...).
- Aggiorna `DOCUMENTATION.md` e la Kitchen Sink quando introduci un nuovo componente per mantenere allineata la documentazione con l'implementazione.
- Esegui lint, test e build prima di aprire una pull request.

Per domande o supporto, fa riferimento al team angular-develop-universe o consulta gli esempi già presenti nella Kitchen Sink per replicare pattern consolidati.
