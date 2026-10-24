import { InjectionToken } from '@angular/core'

export class NguDialogsConfig {
  excludeLoader?: 'headers' | 'urls'
  excludeLoaderUrls?: { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS', url: string }[]
  excludeError?: 'headers' | 'urls'
  excludeErrorUrls?: { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS', url: string }[]
}

export const NGU_DIALOGS_CONFIG = new InjectionToken<NguDialogsConfig>('NguDialogsConfig')
