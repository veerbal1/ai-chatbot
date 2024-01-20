import { TConversationContext, TConversationType, TModelMode, TModels } from "./types"

export const modelMode: TModelMode[] = [
  {
    id: 'gpt-3.5-turbo',
    label: 'Normal',
    model: 'gpt-3.5-turbo'
  },
  {
    id: 'gpt-4-1106-preview',
    label: 'Advance',
    model: 'gpt-4-1106-preview'
  }
]

export const conversationMode: TConversationContext[] = [
  {
    id: 'normal',
    label: 'Normal',
    content: ''
  },
  {
    id: 'technical',
    label: 'Technical',
    content: ''
  }
]
