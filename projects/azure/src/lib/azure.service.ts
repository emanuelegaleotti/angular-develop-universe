import { Injectable } from '@angular/core'
import {
  AccountInfo,
  InteractionStatus,
} from '@azure/msal-browser'
import { MsalBroadcastService, MsalService } from '@azure/msal-angular'
import { filter, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'


@Injectable({  providedIn: 'root'
})
export class AzureService {

  constructor (
    private readonly authService: MsalService,
    private readonly msalBroadcastService: MsalBroadcastService,
    private readonly http: HttpClient
  ) {}

  loginProgress (): Observable<InteractionStatus> {
    return this.msalBroadcastService.inProgress$.pipe(
      filter(s => s === InteractionStatus.None)
    )
  }

  checkLogin (): AccountInfo[] {
    return this.authService.instance.getAllAccounts()
  }

  login (): Observable<void> {
    return this.authService.loginRedirect()
  }

  logout (): Observable<any> {
    return this.authService.logoutRedirect()
  }

  getUser (): AccountInfo | null {
    const a = this.authService.instance.getActiveAccount()
    if (!a) {
      this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0])
    }
    return this.authService.instance.getActiveAccount()
  }

  getUserAvatar (): Observable<Blob> {
    return this.http.get('https://graph.microsoft.com/v1.0/me/photo/$value', { responseType: 'blob' })
  }
}
