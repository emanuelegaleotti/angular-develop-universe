import { Route } from '@angular/router'

export const routes: Route[] = [
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((c) => c.KitchenSinkChatComponent)
  },
  {
    path: 'chat-ai',
    loadComponent: () => import('./chat-ai/chat-ai.component').then((c) => c.KitchenSinkChatAiComponent)
  },
]
