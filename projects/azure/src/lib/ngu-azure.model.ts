import { BrowserAuthOptions } from '@azure/msal-browser'
import { InjectionToken } from '@angular/core'

export type AzureLoginMode = 'check-sso' | 'login-required'

export class NguAzureConfig {
  constructor (
    public auth: BrowserAuthOptions,
    public cache: { [key: string]: any },
    public system: { [key: string]: any },
    public protectedResourceApi: Map<string, Array<string>>,
    public guardScopes: string[],
    public graphUrl: string,
    public loginFailedRoute: string,
    public loginMode: AzureLoginMode = 'login-required',
  ) {}
}

export const NGU_AZURE_CONFIG = new InjectionToken<NguAzureConfig>('NguAzureConfig')
