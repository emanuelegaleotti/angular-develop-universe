import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { ChatStore } from './state/chat.store'

export function provideAssetsChats(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ChatStore
  ])
}
