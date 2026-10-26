/**
 * Messaggio mostrato nella chat. `author` decide il lato della bolla:
 * `user` a destra (chi scrive), `other` a sinistra (default).
 */
export interface ChatBubble {
  text: string
  author?: 'user' | 'other'
  time?: string
}
