# angular-develop-universe - Documentazione Completa

## Indice

- [Introduzione](#introduzione)
- [Installazione](#installazione)
- [Configurazione Iniziale](#configurazione-iniziale)
- [Moduli Disponibili](#moduli-disponibili)
  - [Components](#components)
  - [Inputs](#inputs)
  - [Dialogs](#dialogs)
  - [Chats](#chats)
  - [Azure Authentication](#azure-authentication)
  - [Cognito Authentication](#cognito-authentication)
  - [Utility](#utility)
- [Guida Dettagliata ai Componenti](#guida-dettagliata-ai-componenti)

---

## Introduzione

**angular-develop-universe** è una libreria completa di componenti Angular progettata per accelerare lo sviluppo di applicazioni enterprise. La libreria fornisce componenti standalone riutilizzabili, servizi di autenticazione, sistemi di dialogo e chat, e utilities per la gestione dello stato e della localizzazione.

### Caratteristiche Principali

- **Componenti Standalone**: Tutti i componenti sono standalone e possono essere importati direttamente senza bisogno di moduli
- **Type-Safe**: Completamente tipizzato con TypeScript
- **Reactive Forms**: Integrazione nativa con Angular Reactive Forms
- **Internazionalizzazione**: Supporto completo per i18n tramite Transloco
- **State Management**: Integrazione con NgRx per la gestione dello stato
- **Autenticazione**: Supporto per Azure AD e AWS Cognito
- **Accessibilità**: Componenti progettati seguendo le linee guida WCAG

---

## Installazione

La libreria è pubblicata come pacchetto NPM con il nome `angular-develop-universe`.

```bash
npm install angular-develop-universe
```

### Dipendenze

Assicurarsi di avere installate le seguenti dipendenze peer:

```json
{
  "@angular/common": "^20.0.0",
  "@angular/core": "^20.0.0",
  "@ngrx/store": "^18.0.0",
  "@ngrx/effects": "^18.0.0",
  "@jsverse/transloco": "^7.0.0"
}
```

---

## Configurazione Iniziale

### Setup dell'Applicazione

Nel file `app.config.ts`, configurare i provider necessari:

```typescript
import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { provideTransloco } from '@jsverse/transloco'
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage'

// angular-develop-universe Providers
import { provideAssetsDialogs } from 'angular-develop-universe/dialogs'
import { provideAssetsChats } from 'angular-develop-universe/chats'
import { provideAssetsAzure } from 'angular-develop-universe/azure'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    
    // NgRx Store
    provideStore({}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([]),
    
    // Transloco per i18n
    provideTransloco({
      config: {
        availableLangs: ['en', 'it'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    
    // angular-develop-universe Modules
    provideAssetsDialogs(),
    provideAssetsChats(),
    
    // Storage
    provideNgxWebstorage(
      withLocalStorage(),
      withSessionStorage()
    )
  ]
}
```

---

## Moduli Disponibili

La libreria è organizzata in moduli indipendenti che possono essere importati singolarmente:

### Struttura dei Moduli

```
angular-develop-universe/
├── components      # Componenti UI generici
├── inputs          # Componenti form input
├── dialogs         # Sistema di dialog e offcanvas
├── chats           # Componenti per chat e messaging
├── azure           # Autenticazione Azure AD
├── cognito         # Autenticazione AWS Cognito
├── keycloak        # Autenticazione Keycloak
└── utility         # Utility e servizi comuni
```

---

## Components

Il modulo `angular-develop-universe/components` fornisce componenti UI generici per la composizione di interfacce.

### Componenti Disponibili

- **CardComponent**: Contenitore per layout a schede
- **PagerComponent**: Paginazione avanzata
- **PictureComponent**: Gestione responsive delle immagini

### Importazione

```typescript
import { CardComponent, PagerComponent, PictureComponent } from 'angular-develop-universe/components'
```

---

## Inputs

Il modulo `angular-develop-universe/inputs` fornisce una suite completa di componenti input compatibili con Angular Reactive Forms.

### Componenti Disponibili

Tutti i componenti input implementano `ControlValueAccessor` e sono completamente integrati con Reactive Forms:

- `InputTextComponent` - Input di testo
- `InputEmailComponent` - Input email con validazione
- `InputPasswordComponent` - Input password
- `InputNumberComponent` - Input numerico
- `InputDateComponent` - Input data
- `InputDatetimeLocalComponent` - Input data e ora
- `InputTimeComponent` - Input ora
- `InputTelComponent` - Input telefono
- `InputUrlComponent` - Input URL
- `InputColorComponent` - Color picker
- `InputSearchComponent` - Input di ricerca
- `InputCheckboxComponent` - Checkbox
- `InputRadioComponent` - Radio button
- `InputRangeComponent` - Range slider
- `InputFileComponent` - File upload
- `InputHiddenComponent` - Input nascosto
- `InputDatalistComponent` - Datalist con autocompletamento
- `InputDatalistObjectComponent` - Datalist per oggetti complessi
- `SelectComponent` - Select con opzioni stringa
- `SelectObjectComponent` - Select per oggetti complessi
- `TextareaComponent` - Area di testo multiriga

### Caratteristiche Comuni

Tutti i componenti input condividono le seguenti caratteristiche:

#### Input Properties

| Proprietà | Tipo | Descrizione | Obbligatorio |
|-----------|------|-------------|--------------|
| `id` | `string` | ID univoco dell'elemento | Sì |
| `baseMsg` | `string` | Prefisso per le chiavi i18n | Sì |
| `errorMsg` | `boolean` | Mostra messaggi di errore | No |
| `successMsg` | `boolean` | Mostra messaggi di successo | No |
| `helpMsg` | `boolean` | Mostra messaggi di aiuto | No |
| `autocomplete` | `string` | Attributo autocomplete HTML | No |
| `autofocus` | `boolean` | Focus automatico al caricamento | No |

#### Sistema di Messaggistica i18n

I componenti input utilizzano un sistema di messaggistica basato su chiavi i18n:

```typescript
// Struttura delle chiavi i18n
{
  "input": {
    "nomeControllo": {
      "label": "Etichetta del campo",
      "placeholder": "Testo placeholder",
      "help": "Testo di aiuto",
      "success": "Messaggio di successo",
      "error": {
        "required": "Campo obbligatorio",
        "email": "Email non valida",
        "min": "Valore minimo non rispettato"
      }
    }
  }
}
```

### Esempio Completo: Input Text

**Template:**
```html
<form [formGroup]="myForm">
  <ngu-input-text
    formControlName="username"
    [id]="'username-input'"
    [baseMsg]="'forms'"
    [errorMsg]="true"
    [helpMsg]="true"
    [successMsg]="true"
    [autocomplete]="'username'"
    [autofocus]="true"
    [maxLength]="50"
  ></ngu-input-text>
</form>
```

**Component:**
```typescript
import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { InputTextComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  myForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value)
    }
  }
}
```

**File i18n (it.json):**
```json
{
  "forms": {
    "username": {
      "label": "Nome utente",
      "placeholder": "Inserisci il tuo nome utente",
      "help": "Il nome utente deve contenere almeno 3 caratteri",
      "success": "Nome utente valido",
      "error": {
        "required": "Il nome utente è obbligatorio",
        "minlength": "Il nome utente deve contenere almeno 3 caratteri"
      }
    }
  }
}
```

### Esempio: Select Component

**Template:**
```html
<form [formGroup]="settingsForm">
  <ngu-select
    formControlName="theme"
    [id]="'theme-select'"
    [baseMsg]="'settings'"
    [options]="themeOptions"
    [errorMsg]="true"
    [helpMsg]="true"
  ></ngu-select>
</form>
```

**Component:**
```typescript
import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { SelectComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  themeOptions: string[] = ['light', 'dark', 'auto']
  
  settingsForm = new FormGroup({
    theme: new FormControl('light', [Validators.required])
  })
  
  saveSettings(): void {
    if (this.settingsForm.valid) {
      const theme = this.settingsForm.value.theme
      console.log('Tema selezionato:', theme)
    }
  }
}
```

### Esempio: Select Object Component

Per gestire oggetti complessi nelle select:

**Template:**
```html
<form [formGroup]="userForm">
  <ngu-select-object
    formControlName="country"
    [id]="'country-select'"
    [baseMsg]="'user'"
    [objects]="countries"
    [bindLabel]="'name'"
    [bindValue]="'code'"
    [errorMsg]="true"
  ></ngu-select-object>
</form>
```

**Component:**
```typescript
import { Component } from '@angular/core'
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { SelectObjectComponent } from 'angular-develop-universe/inputs'

interface Country {
  code: string
  name: string
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, SelectObjectComponent],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  countries: Country[] = [
    { code: 'IT', name: 'Italia' },
    { code: 'US', name: 'Stati Uniti' },
    { code: 'UK', name: 'Regno Unito' }
  ]
  
  userForm = new FormGroup({
    country: new FormControl<Country | null>(null)
  })
}
```

### Esempio: Input File Component

Il componente file supporta upload singolo e multiplo con drag & drop:

**Template:**
```html
<form [formGroup]="uploadForm">
  <ngu-input-file
    formControlName="documents"
    [id]="'doc-upload'"
    [baseMsg]="'upload'"
    [multiple]="true"
    [accept]="'application/pdf,.doc,.docx'"
    [errorMsg]="true"
    [helpMsg]="true"
  >
    <span add-btn>Seleziona File</span>
    <span remove-btn>Rimuovi</span>
  </ngu-input-file>
</form>
```

**Component:**
```typescript
import { Component } from '@angular/core'
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { InputFileComponent } from 'angular-develop-universe/inputs'

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [ReactiveFormsModule, InputFileComponent],
  templateUrl: './document-upload.component.html'
})
export class DocumentUploadComponent {
  uploadForm = new FormGroup({
    documents: new FormControl<FileList | null>(null)
  })
  
  onSubmit(): void {
    const files = this.uploadForm.value.documents
    if (files) {
      for (let i = 0; i < files.length; i++) {
        console.log('File:', files[i].name)
      }
    }
  }
}
```

### Disabilitazione Dinamica

Tutti i componenti supportano la disabilitazione dinamica tramite Reactive Forms:

```typescript
// Disabilita il campo
this.myForm.controls['username'].disable()

// Riabilita il campo
this.myForm.controls['username'].enable()

// Toggle
if (this.myForm.controls['username'].disabled) {
  this.myForm.controls['username'].enable()
} else {
  this.myForm.controls['username'].disable()
}
```

---

## Dialogs

Il modulo `angular-develop-universe/dialogs` fornisce un sistema completo per la gestione di dialog modali, offcanvas, loader e notifiche.

### Setup

```typescript
import { provideAssetsDialogs } from 'angular-develop-universe/dialogs'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAssetsDialogs({
      // Configurazione opzionale
    })
  ]
}
```

### Dialog Service

Il servizio `NguDialogService` permette di creare dialog modali dinamici iniettando componenti custom.

#### Importazione

```typescript
import { NguDialogService, DialogModel } from 'angular-develop-universe/dialogs'
```

#### Esempio Completo

**Dialog Content Component:**
```typescript
import { Component, inject } from '@angular/core'
import { NguDialogService } from 'angular-develop-universe/dialogs'

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div class="dialog-content">
      <h2>Conferma Azione</h2>
      <p>Sei sicuro di voler procedere?</p>
      <div class="dialog-actions">
        <button (click)="cancel()">Annulla</button>
        <button (click)="confirm()">Conferma</button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  private dialogService = inject(NguDialogService)
  
  confirm(): void {
    this.dialogService.hide({ confirmed: true })
  }
  
  cancel(): void {
    this.dialogService.hide({ confirmed: false })
  }
}
```

**Parent Component:**
```typescript
import { Component, inject } from '@angular/core'
import { NguDialogService } from 'angular-develop-universe/dialogs'
import { ConfirmDialogComponent } from './confirm-dialog.component'

@Component({
  selector: 'app-user-management',
  standalone: true,
  template: `
    <button (click)="openConfirmDialog()">Elimina Utente</button>
  `
})
export class UserManagementComponent {
  private dialogService = inject(NguDialogService)
  
  openConfirmDialog(): void {
    const dialog = this.dialogService.createDialog(
      ConfirmDialogComponent,
      {
        id: 'confirm-delete',
        className: 'custom-dialog-class',
        dialogData: { userId: 123, userName: 'Mario Rossi' }
      }
    )
    
    // Event Listeners
    dialog.whenOpen.subscribe(() => {
      console.log('Dialog sta per aprirsi')
    })
    
    dialog.whenOpened.subscribe(() => {
      console.log('Dialog aperto')
    })
    
    dialog.whenClose.subscribe((data) => {
      console.log('Dialog sta per chiudersi', data)
    })
    
    dialog.whenClosed.subscribe((data) => {
      console.log('Dialog chiuso', data)
      if (data?.confirmed) {
        this.deleteUser()
      }
    })
    
    dialog.show()
  }
  
  private deleteUser(): void {
    // Logica di eliminazione
  }
}
```

#### Eventi del Dialog

| Evento | Descrizione | Parametri |
|--------|-------------|-----------|
| `whenOpen` | Emesso prima dell'apertura | - |
| `whenOpened` | Emesso dopo l'apertura | - |
| `whenClose` | Emesso prima della chiusura | `data?: any` |
| `whenClosed` | Emesso dopo la chiusura | `data?: any` |

#### Metodi

| Metodo | Descrizione | Parametri |
|--------|-------------|-----------|
| `createDialog(component, config?)` | Crea un nuovo dialog | `component: Type<any>`, `config?: DialogModel` |
| `show()` | Mostra il dialog | - |
| `hide(data?)` | Nasconde il dialog | `data?: any` |

### Offcanvas Service

Il servizio `NguOffcanvasService` gestisce pannelli laterali scorrevoli.

#### Esempio

```typescript
import { Component, inject } from '@angular/core'
import { NguOffcanvasService, OffcanvasModel } from 'angular-develop-universe/dialogs'
import { SideMenuComponent } from './side-menu.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <button (click)="openMenu()">Menu</button>
  `
})
export class LayoutComponent {
  private offcanvasService = inject(NguOffcanvasService)
  
  openMenu(): void {
    const offcanvas = this.offcanvasService.createOffcanvas(
      SideMenuComponent,
      {
        id: 'main-menu',
        className: 'side-menu',
        position: 'left' // 'left' | 'right' | 'top' | 'bottom'
      }
    )
    
    offcanvas.whenOpened.subscribe(() => {
      console.log('Menu aperto')
    })
    
    offcanvas.show()
  }
  
  closeMenu(): void {
    this.offcanvasService.hide()
  }
}
```

### Loader Directive

La direttiva `nguLoader` mostra/nasconde elementi basandosi sullo stato di caricamento globale.

#### Setup

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoaderInterceptor } from 'angular-develop-universe/dialogs'

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
}
```

#### Utilizzo

```html
<div *nguLoader class="loading-spinner">
  <div class="spinner"></div>
  <p>Caricamento in corso...</p>
</div>
```

L'elemento verrà mostrato automaticamente durante le richieste HTTP in corso.

### Error Interceptor

L'Error Interceptor gestisce automaticamente gli errori HTTP:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ErrorInterceptor } from 'angular-develop-universe/dialogs'

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
}
```

---

## Chats

Il modulo `angular-develop-universe/chats` fornisce componenti per implementare sistemi di chat e messaging.

### Setup

```typescript
import { provideAssetsChats } from 'angular-develop-universe/chats'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAssetsChats()
  ]
}
```

### Componenti Disponibili

- `ChatComponent` - Container principale della chat
- `ChatFormComponent` - Form per l'invio di messaggi
- `ChatMessageComponent` - Singolo messaggio

### Esempio: Chat Standard

**Template:**
```html
<ngu-chat
  [id]="'main-chat'"
  [chatId]="'conversation-123'"
  [messages]="messages"
  [chatTitle]="'Supporto Clienti'"
>
  <ng-template #chatSendIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
    </svg>
  </ng-template>
</ngu-chat>
```

**Component:**
```typescript
import { Component, OnInit } from '@angular/core'
import { ChatComponent } from 'angular-develop-universe/chats'
import { Store } from '@ngrx/store'
import { ChatActions } from 'angular-develop-universe/chats'

@Component({
  selector: 'app-support-chat',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './support-chat.component.html'
})
export class SupportChatComponent implements OnInit {
  messages: string[] = []
  
  constructor(private store: Store) {}
  
  ngOnInit(): void {
    // Carica messaggi iniziali
    this.loadMessages()
  }
  
  private loadMessages(): void {
    // Simula caricamento messaggi
    this.messages = [
      'Ciao! Come posso aiutarti?',
      'Ho un problema con il mio ordine',
      'Certo, qual è il numero dell\'ordine?'
    ]
  }
  
  sendMessage(message: string): void {
    this.store.dispatch(ChatActions.sendMessage({ 
      chatId: 'conversation-123',
      message 
    }))
  }
}
```

### State Management

Il modulo chat include azioni e selettori NgRx:

```typescript
import { ChatActions, ChatSelectors } from 'angular-develop-universe/chats'

// Dispatch azioni
store.dispatch(ChatActions.sendMessage({ chatId, message }))
store.dispatch(ChatActions.receiveMessage({ chatId, message }))
store.dispatch(ChatActions.clearChat({ chatId }))

// Selettori
store.select(ChatSelectors.selectMessages(chatId))
store.select(ChatSelectors.selectMessage(messageId))
```

---

## Azure Authentication

Il modulo `angular-develop-universe/azure` fornisce integrazione completa con Azure AD (MSAL).

### Setup

```typescript
import { provideAssetsAzure, AzureEffects } from 'angular-develop-universe/azure'
import { provideEffects } from '@ngrx/effects'
import { BrowserCacheLocation } from '@azure/msal-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects([
      AzureEffects.AzureEffects,
      AzureEffects.LoginRequiredEffects
    ]),
    provideAssetsAzure({
      auth: {
        clientId: 'your-client-id',
        authority: 'https://login.microsoftonline.com/your-tenant-id',
        redirectUri: 'http://localhost:4200/',
        postLogoutRedirectUri: 'http://localhost:4200/',
        navigateToLoginRequestUrl: true
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: false
      },
      graphUrl: 'https://graph.microsoft.com/v1.0/me',
      loginFailedRoute: '/login-failed',
      guardScopes: ['user.read']
    })
  ]
}
```

### Servizi

#### AzureService

```typescript
import { Component, inject, OnInit } from '@angular/core'
import { AzureService } from 'angular-develop-universe/azure'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div *ngIf="userProfile$ | async as profile">
      <h2>{{ profile.displayName }}</h2>
      <p>{{ profile.mail }}</p>
    </div>
    <button (click)="logout()">Logout</button>
  `
})
export class ProfileComponent implements OnInit {
  private azureService = inject(AzureService)
  userProfile$!: Observable<any>
  
  ngOnInit(): void {
    this.userProfile$ = this.azureService.getProfile()
  }
  
  logout(): void {
    this.azureService.logout()
  }
}
```

#### Metodi Disponibili

| Metodo | Descrizione | Return Type |
|--------|-------------|-------------|
| `login()` | Avvia il flusso di login | `void` |
| `logout()` | Effettua il logout | `void` |
| `getProfile()` | Ottiene il profilo Microsoft Graph | `Observable<any>` |
| `isAuthenticated()` | Verifica se l'utente è autenticato | `Observable<boolean>` |
| `getAccessToken()` | Ottiene l'access token | `Observable<string>` |

### Directive

#### IsAuthenticatedDirective

Mostra/nasconde elementi basandosi sullo stato di autenticazione:

```html
<div *nguAzureIsAuthenticated>
  <p>Benvenuto, utente autenticato!</p>
</div>

<div *nguAzureIsNotAuthenticated>
  <button (click)="login()">Effettua il Login</button>
</div>
```

#### CheckRolesDirective

Mostra/nasconde elementi basandosi sui ruoli dell'utente:

```html
<button *nguAzureCheckRoles="['Admin', 'Editor']">
  Modifica Contenuto
</button>
```

### Guards

#### CheckRoleGuard

Protegge le rotte basandosi sui ruoli:

```typescript
import { Routes } from '@angular/router'
import { CheckRoleGuard } from 'angular-develop-universe/azure'

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CheckRoleGuard],
    data: { roles: ['Admin'] }
  }
]
```

### State Management

```typescript
import { AzureActions, AzureSelectors } from 'angular-develop-universe/azure'

// Dispatch azioni
store.dispatch(AzureActions.login())
store.dispatch(AzureActions.logout())

// Selettori
store.select(AzureSelectors.selectIsAuthenticated)
store.select(AzureSelectors.selectUser)
store.select(AzureSelectors.selectAccessToken)
store.select(AzureSelectors.selectRoles)
```

---

## Cognito Authentication

Il modulo `angular-develop-universe/cognito` fornisce integrazione con AWS Cognito.

### Setup

```typescript
import { NguCognitoModule } from 'angular-develop-universe/cognito'
import { provideEffects } from '@ngrx/effects'
import { CognitoEffects } from 'angular-develop-universe/cognito'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      NguCognitoModule.forRoot({
        region: 'eu-west-1',
        userPoolId: 'your-user-pool-id',
        userPoolWebClientId: 'your-client-id',
        identityPoolId: 'your-identity-pool-id'
      })
    ),
    provideEffects([CognitoEffects])
  ]
}
```

### Servizi

#### CognitoService

```typescript
import { Component, inject } from '@angular/core'
import { CognitoService } from 'angular-develop-universe/cognito'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <input formControlName="username" placeholder="Username">
      <input formControlName="password" type="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  private cognitoService = inject(CognitoService)
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.cognitoService.signIn(username!, password!).subscribe({
        next: () => console.log('Login effettuato'),
        error: (err) => console.error('Errore login', err)
      })
    }
  }
}
```

#### Metodi Disponibili

| Metodo | Descrizione | Parametri | Return Type |
|--------|-------------|-----------|-------------|
| `signUp()` | Registrazione nuovo utente | `username, password, email` | `Observable<any>` |
| `signIn()` | Login utente | `username, password` | `Observable<any>` |
| `signOut()` | Logout utente | - | `Observable<void>` |
| `confirmSignUp()` | Conferma registrazione | `username, code` | `Observable<any>` |
| `forgotPassword()` | Richiesta reset password | `username` | `Observable<any>` |
| `confirmPassword()` | Conferma nuova password | `username, code, newPassword` | `Observable<any>` |
| `getCurrentUser()` | Ottiene utente corrente | - | `Observable<any>` |
| `refreshSession()` | Refresh del token | - | `Observable<any>` |

### Directive

```html
<div *nguCognitoIsAuthenticated>
  Contenuto per utenti autenticati
</div>

<div *nguCognitoIsNotAuthenticated>
  <a routerLink="/login">Effettua il Login</a>
</div>

<button *nguCognitoCheckRoles="['admin', 'editor']">
  Azioni Admin
</button>
```

### Interceptor

L'interceptor aggiunge automaticamente il token JWT alle richieste HTTP:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CognitoInterceptor } from 'angular-develop-universe/cognito'

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CognitoInterceptor,
      multi: true
    }
  ]
}
```

---

## Utility

Il modulo `angular-develop-universe/utility` fornisce servizi e utility comuni.

### LocaleService

Servizio per la gestione della localizzazione dell'applicazione.

#### Setup

```typescript
import { LocaleService } from 'angular-develop-universe/utility'
import { provideNgxWebstorage, withLocalStorage } from 'ngx-webstorage'

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxWebstorage(withLocalStorage()),
    LocaleService
  ]
}
```

#### Utilizzo

```typescript
import { Component, inject, OnInit } from '@angular/core'
import { LocaleService } from 'angular-develop-universe/utility'

@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <select (change)="changeLanguage($event)">
      <option value="it">Italiano</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  `
})
export class LanguageSelectorComponent implements OnInit {
  private localeService = inject(LocaleService)
  
  ngOnInit(): void {
    // Ottiene e imposta la lingua corrente
    const currentLocale = this.localeService.getLocale('it')
    console.log('Lingua corrente:', currentLocale)
  }
  
  changeLanguage(event: Event): void {
    const locale = (event.target as HTMLSelectElement).value
    this.localeService.setLocale(locale)
    // La pagina verrà ricaricata automaticamente
  }
}
```

#### Metodi

| Metodo | Descrizione | Parametri | Return Type |
|--------|-------------|-----------|-------------|
| `getLocale(defaultLocale?)` | Ottiene la lingua corrente | `defaultLocale?: string` | `string` |
| `setLocale(locale)` | Imposta una nuova lingua | `locale: string` | `void` |

Il servizio gestisce automaticamente:
- Salvataggio della lingua nel localStorage
- Sincronizzazione con Transloco
- Ricaricamento della pagina quando cambia la lingua
- Fallback alla lingua di default

### Enums

#### Localstorage

Enum con le chiavi predefinite per il localStorage:

```typescript
import { Localstorage } from 'angular-develop-universe/utility'

// Utilizzo
localStorage.setItem(Localstorage.APP_LOCALE, 'it')
localStorage.setItem(Localstorage.USER_TOKEN, 'token-xyz')
```

---

## Guida Dettagliata ai Componenti

### Card Component (`ngu-card`)

Contenitore generico per raggruppare contenuti in uno stile a scheda.

#### Caratteristiche

- Layout responsive
- Supporto per contenuto proiettato
- Styling personalizzabile tramite CSS

#### Esempio Base

```html
<ngu-card>
  <div class="card-header">
    <h2>Titolo Card</h2>
  </div>
  <div class="card-body">
    <p>Contenuto della card</p>
  </div>
  <div class="card-footer">
    <button>Azione</button>
  </div>
</ngu-card>
```

#### Esempio Avanzato

```html
<ngu-card>
  <article class="product-card">
    <img src="product.jpg" alt="Product">
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="price">€ {{ product.price }}</p>
      <p class="description">{{ product.description }}</p>
    </div>
    <div class="product-actions">
      <button (click)="addToCart(product)">Aggiungi al Carrello</button>
      <button (click)="viewDetails(product)">Dettagli</button>
    </div>
  </article>
</ngu-card>
```

### Pager Component (`ngu-pager`)

Componente di paginazione avanzato con supporto per grandi set di dati.

#### Input Properties

| Proprietà | Tipo | Descrizione | Obbligatorio |
|-----------|------|-------------|--------------|
| `totalItems` | `number` | Numero totale di elementi | Sì |
| `pageIndex` | `number` | Indice della pagina corrente (base 1) | Sì |

#### Output Events

| Evento | Tipo | Descrizione |
|--------|------|-------------|
| `whenPageSelected` | `EventEmitter<number>` | Emesso quando viene selezionata una pagina |

#### Caratteristiche

- Calcolo automatico del numero di pagine
- Visualizzazione intelligente con ellissi per grandi numeri di pagine
- Navigazione first/previous/next/last
- Supporto per i18n

#### Esempio con API

```typescript
import { Component, OnInit } from '@angular/core'
import { PagerComponent } from 'angular-develop-universe/components'
import { HttpClient } from '@angular/common/http'

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [PagerComponent],
  template: `
    <div class="user-list">
      <table>
        <tr *ngFor="let user of users">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </table>
      
      <ngu-pager
        [totalItems]="totalUsers"
        [pageIndex]="currentPage"
        (whenPageSelected)="onPageChange($event)"
      ></ngu-pager>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: any[] = []
  totalUsers = 0
  currentPage = 1
  pageSize = 10
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadUsers()
  }
  
  loadUsers(): void {
    this.http.get<PaginatedResponse<any>>(
      `/api/users?page=${this.currentPage}&size=${this.pageSize}`
    ).subscribe(response => {
      this.users = response.items
      this.totalUsers = response.total
    })
  }
  
  onPageChange(page: number): void {
    this.currentPage = page
    this.loadUsers()
  }
}
```

### Picture Component (`ngu-picture`)

Componente per la gestione responsive delle immagini.

#### Input Properties

| Proprietà | Tipo | Descrizione | Default |
|-----------|------|-------------|---------|
| `id` | `string` | ID univoco | `''` |
| `alt` | `string` | Testo alternativo | `''` |
| `width` | `number` | Larghezza immagine | `0` |
| `height` | `number` | Altezza immagine | `0` |
| `loading` | `'eager' \| 'lazy'` | Strategia di caricamento | `'lazy'` |

#### Esempio

```typescript
import { Component } from '@angular/core'
import { PictureComponent } from 'angular-develop-universe/components'

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PictureComponent],
  template: `
    <ngu-picture
      [id]="'product-image'"
      [alt]="'Foto del prodotto'"
      [width]="800"
      [height]="600"
      [loading]="'lazy'"
    ></ngu-picture>
  `
})
export class GalleryComponent {}
```

---

## Best Practices

### Reactive Forms

1. **Sempre utilizzare FormGroup tipizzati**:
```typescript
interface LoginForm {
  username: FormControl<string>
  password: FormControl<string>
}

myForm = new FormGroup<LoginForm>({
  username: new FormControl('', { nonNullable: true }),
  password: new FormControl('', { nonNullable: true })
})
```

2. **Validazioni custom**:
```typescript
function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value
  if (!value) return null
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) ? null : { invalidEmail: true }
}
```

3. **Gestione errori nel template**:
```html
<ngu-input-text
  formControlName="email"
  [id]="'email'"
  [baseMsg]="'forms'"
  [errorMsg]="myForm.controls.email.touched && myForm.controls.email.invalid"
></ngu-input-text>

<div *ngIf="myForm.controls.email.errors as errors" class="error-message">
  <span *ngIf="errors['required']">{{ 'forms.email.error.required' | transloco }}</span>
  <span *ngIf="errors['invalidEmail']">{{ 'forms.email.error.invalidEmail' | transloco }}</span>
</div>
```

### State Management

1. **Usare selettori tipizzati**:
```typescript
interface AppState {
  auth: AuthState
  chat: ChatState
}

selectUser = createSelector(
  (state: AppState) => state.auth,
  (auth) => auth.user
)
```

2. **Effects per side effects**:
```typescript
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap(() =>
      this.userService.getUsers().pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      )
    )
  )
)
```

### Performance

1. **OnPush Change Detection**:
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

2. **TrackBy per ngFor**:
```html
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

```typescript
trackByFn(index: number, item: any): any {
  return item.id
}
```

3. **Lazy Loading**:
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent)
  }
]
```

### Internazionalizzazione

1. **Struttura file i18n**:
```json
{
  "common": {
    "save": "Salva",
    "cancel": "Annulla",
    "delete": "Elimina"
  },
  "forms": {
    "username": {
      "label": "Nome utente",
      "placeholder": "Inserisci nome utente",
      "help": "Minimo 3 caratteri",
      "error": {
        "required": "Campo obbligatorio",
        "minlength": "Minimo 3 caratteri"
      }
    }
  }
}
```

2. **Utilizzo nei componenti**:
```html
<h1>{{ 'common.welcome' | transloco }}</h1>
<p>{{ 'common.description' | transloco: { name: userName } }}</p>
```

### Sicurezza

1. **Sanitizzazione input**:
```typescript
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

sanitize(html: string): SafeHtml {
  return this.sanitizer.sanitize(SecurityContext.HTML, html)
}
```

2. **HTTPS obbligatorio in produzione**
3. **Validazione lato server sempre richiesta**
4. **Token JWT con scadenza**

---

## Troubleshooting

### Errori Comuni

#### NG0201: No provider found for _StoreRootModule

**Soluzione**: Assicurarsi di aver aggiunto `provideStore()` in `app.config.ts`:

```typescript
import { provideStore } from '@ngrx/store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({})
  ]
}
```

#### Cannot find module 'angular-develop-universe/...'

**Soluzione**: Verificare che il pacchetto sia installato e il path sia corretto:

```bash
npm install angular-develop-universe
```

#### Transloco: Missing translation for key

**Soluzione**: Verificare che il file di traduzione contenga la chiave richiesta:

```json
{
  "input": {
    "username": {
      "label": "Username"
    }
  }
}
```

---

## Supporto e Contributi

Per bug, richieste di funzionalità o domande, aprire una issue sul repository del progetto.

### Risorse Aggiuntive

- [Angular Documentation](https://angular.dev)
- [NgRx Documentation](https://ngrx.io)
- [Transloco Documentation](https://ngneat.github.io/transloco/)
- [MSAL Angular](https://github.com/AzureAD/microsoft-authentication-library-for-js)

---

**Versione Documentazione**: 1.0.0  
**Ultima Modifica**: Gennaio 2026  
**Libreria**: angular-develop-universe v20.0.0-alpha.4

