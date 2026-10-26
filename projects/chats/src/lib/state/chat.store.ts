import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { MessageView } from '../model/message-view'

export interface ChatEntry {
  messages: MessageView[]
  message: string
}

export interface ChatState {
  selectedChat: string
  isReceiving: boolean
  temporaryMessage: string
  chats: Record<string, ChatEntry>
}

const initialState: ChatState = {
  selectedChat: '',
  isReceiving: false,
  temporaryMessage: '',
  chats: {}
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({

    storeChat(chatId: string): void {
      patchState(store, { selectedChat: chatId })
    },

    storeMessages(chatId: string, messages: MessageView[]): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messages }
        }
      })
    },
    clearMessages(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messages: [] }
        }
      })
    },

    storeMessage(chatId: string, message: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], message }
        }
      })
    },
    clearMessage(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], message: '' }
        }
      })
    },

    storeIsReceiving(): void {
      patchState(store, { isReceiving: true })
    },
    clearIsReceiving(): void {
      patchState(store, { isReceiving: false })
    },

    storeTemporaryMessage(messageToSend: string): void {
      patchState(store, { temporaryMessage: messageToSend })
    },
    clearTemporaryMessage(): void {
      patchState(store, { temporaryMessage: '' })
    }
  }))
)
