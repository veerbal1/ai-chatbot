import { TConversationContext, TModelMode } from './types'

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

// TODO:// Pass context inside this array of object instead of using util function in libs/utils.ts
export const conversationMode: TConversationContext[] = [
  {
    id: 'normal',
    label: 'Normal'
  },
  {
    id: 'technical',
    label: 'Technical'
  },
  // {
  //   id: 'fitness',
  //   label: 'Fitness'
  // },
  {
    id: 'grammerly',
    label: 'Grammerly'
  }
]
