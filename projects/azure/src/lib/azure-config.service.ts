import { inject, Injectable } from '@angular/core'
import {
  Configuration,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication
} from '@azure/msal-browser'
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular'
import { NGU_AZURE_CONFIG, NguAzureConfig } from './ngu-azure.model'


@Injectable({
  providedIn: 'root'
})
export class AzureConfigService {
  config: NguAzureConfig = inject(NGU_AZURE_CONFIG) as NguAzureConfig
  private readonly instance: Configuration
  private readonly protectedResourceApi: Map<string, Array<string>>
  private readonly guardScopes: string[] = []
  private readonly loginFailedRoute: string = ''
  private readonly graphUrl: string = ''

  constructor () {
    this.instance = {
      auth: this.config.auth,
      cache: this.config.cache,
      system: this.config.system
    }
    this.protectedResourceApi = this.config.protectedResourceApi
    this.guardScopes = this.config.guardScopes
    this.loginFailedRoute = this.config.loginFailedRoute
    this.graphUrl = this.config.graphUrl
  }

  getConfig (): IPublicClientApplication {
    return new PublicClientApplication(this.instance)
  }

  getGuardConfig (): MsalGuardConfiguration {
    return {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: this.guardScopes ?? []
      },
      loginFailedRoute: this.loginFailedRoute
    }
  }

  getInterceptorConfig (): MsalInterceptorConfiguration {
    const protectedResourceGraph = new Map<string, Array<string>>()
    protectedResourceGraph.set('https://graph.microsoft.com/v1.0/me', ['user.read'])
    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([...protectedResourceGraph, ...this.protectedResourceApi]),
    }
  }

}
