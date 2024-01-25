import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

type CapitalizeString<S extends string> =
  S extends `${infer FirstLetter}${infer Rest}`
    ? `${Uppercase<FirstLetter>}${Rest}`
    : S

export type TModels = 'gpt-4-1106-preview' | 'gpt-3.5-turbo'

export type TConversationType =
  | 'technical'
  | 'normal'
  | 'motivational'
  | 'fitness'
  | 'grammerly'

export type TModelMode = {
  id: TModels
  label: 'Normal' | 'Advance'
  model: TModels
}

export type TConversationContext = {
  id: TConversationType
  label: CapitalizeString<TConversationType>
  content?: string
}
