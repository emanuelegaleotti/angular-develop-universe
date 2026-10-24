import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import {KBInformation} from "../model/knowledge-information";
import {MessageView} from "../model/message-view";


export interface ChatEntry {
  messages: MessageView[]
  message: string
  selectedKnowledgeBase: string[]
  messageLikeId?: string
  messageLike?: string
  messageDislikeId?: string
  messageDislike?: string
  messageActionId?: string
}

export interface ChatState {
  knowledgeBase: KBInformation[]
  selectedChat: string
  isReceiving: boolean
  temporaryKnowledgeBases: string[]
  temporaryMessage: string
  chats: Record<string, ChatEntry>
}

const initialState: ChatState = {
  knowledgeBase: [],
  selectedChat: '',
  isReceiving: false,
  temporaryKnowledgeBases: [],
  temporaryMessage: '',
  chats: {}
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({

    // Knowledge Base globale
    storeKnowledgeBase(knowledgeBase: KBInformation[]): void {
      patchState(store, { knowledgeBase })
    },
    clearKnowledgeBase(): void {
      patchState(store, { knowledgeBase: [] })
    },

    // Chat selezionata
    storeChat(chatId: string): void {
      patchState(store, { selectedChat: chatId })
    },

    // Messaggi per chat
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

    // Messaggio corrente per chat
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

    // Like
    storeLike(chatId: string, id: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageLikeId: id }
        }
      })
    },
    clearLike(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageLikeId: '' }
        } as Record<string, ChatEntry>
      })
    },
    storeLikeMessage(chatId: string, message: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageLike: message }
        }
      })
    },
    clearLikeMessage(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageLike: '' }
        }
      })
    },

    // Dislike
    storeDislike(chatId: string, id: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageDislikeId: id }
        }
      })
    },
    clearDislike(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageDislikeId: '' }
        } as Record<string, ChatEntry>
      })
    },
    storeDislikeMessage(chatId: string, message: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageDislike: message }
        }
      })
    },
    clearDislikeMessage(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageDislike: '' }
        }
      })
    },

    // Action
    storeAction(chatId: string, id: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageActionId: id }
        }
      })
    },
    clearAction(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], messageActionId: '' }
        } as Record<string, ChatEntry>
      })
    },

    // Knowledge base per chat
    storeSelectedKnowledgeBase(chatId: string, knowledgeBase: string[]): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], selectedKnowledgeBase: knowledgeBase }
        }
      })
    },
    addSelectedKnowledgeBase(chatId: string, code: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: {
            ...store.chats()[chatId],
            selectedKnowledgeBase: [...(store.chats()[chatId]?.selectedKnowledgeBase ?? []), code]
          }
        }
      })
    },
    removeSelectedKnowledgeBase(chatId: string, code: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: {
            ...store.chats()[chatId],
            selectedKnowledgeBase: store.chats()[chatId]?.selectedKnowledgeBase?.filter(kb => kb !== code) ?? []
          }
        }
      })
    },
    clearSelectedKnowledgeBase(chatId: string): void {
      patchState(store, {
        chats: {
          ...store.chats(),
          [chatId]: { ...store.chats()[chatId], selectedKnowledgeBase: [] }
        }
      })
    },

    // Is receiving
    storeIsReceiving(): void {
      patchState(store, { isReceiving: true })
    },
    clearIsReceiving(): void {
      patchState(store, { isReceiving: false })
    },

    // Temporary message
    storeTemporaryMessage(messageToSend: string): void {
      patchState(store, { temporaryMessage: messageToSend })
    },
    clearTemporaryMessage(): void {
      patchState(store, { temporaryMessage: '' })
    },

    // Temporary knowledge bases
    storeTemporaryKnowledgeBase(knowledgeBase: string[]): void {
      patchState(store, { temporaryKnowledgeBases: knowledgeBase })
    },
    addTemporaryKnowledgeBase(code: string): void {
      patchState(store, { temporaryKnowledgeBases: [...store.temporaryKnowledgeBases(), code] })
    },
    removeTemporaryKnowledgeBase(code: string): void {
      patchState(store, { temporaryKnowledgeBases: store.temporaryKnowledgeBases().filter(kb => kb !== code) })
    },
    clearTemporaryKnowledgeBase(): void {
      patchState(store, { temporaryKnowledgeBases: [] })
    },
  }))
)

