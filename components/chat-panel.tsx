import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

type TModels = 'gpt-4-1106-preview' | 'gpt-3.5-turbo'

const modelMode: {
  id: TModels
  label: 'Normal' | 'Advance'
  model: TModels
}[] = [
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

const conversationMode: {
  id: 'normal' | 'technical'
  label: 'Normal' | 'Technical'
  content: string
}[] = [
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

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
}

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [modelState, setModelState] = React.useState({
    conversationMode: conversationMode[1].id,
    modelMode: modelMode[1].id
  })

  const handleConversationType = (technicalConversation: boolean) => {
    let mode = technicalConversation
      ? conversationMode[1].id
      : conversationMode[0].id
    setModelState(ps => {
      return {
        ...ps,
        conversationMode: mode
      }
    })
  }

  const handleModelType = (advanceModel: boolean) => {
    let mode = advanceModel ? modelMode[1].id : modelMode[0].id
    setModelState(ps => {
      return {
        ...ps,
        modelMode: mode
      }
    })
  }

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex items-center justify-center h-12">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => reload()}>
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
                {id && title ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                    <ChatShareDialog
                      open={shareDialogOpen}
                      onOpenChange={setShareDialogOpen}
                      onCopy={() => setShareDialogOpen(false)}
                      shareChat={shareChat}
                      chat={{
                        id,
                        title,
                        messages
                      }}
                    />
                  </>
                ) : null}
              </div>
            )
          )}
        </div>
        <div className="px-4 py-2 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 flex flex-col justify-center gap-3 items-center sm:flex-row">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user',
                // model: modelState.modelMode,
                // conversationType: ''
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <div className="hidden gap-2 flex-row pb-2 sm:flex-col">
            <div className="flex items-center space-x-2 border p-2 rounded-md">
              <Label htmlFor="conversation-mode" className="cursor-pointer">
                Conversation {'->'}
              </Label>
              <Switch
                id="conversation-mode"
                checked={modelState.conversationMode === 'technical'}
                onCheckedChange={handleConversationType}
              />
              <Label htmlFor="conversation-mode" className="cursor-pointer">
                {
                  conversationMode.find(
                    mode => mode.id === modelState.conversationMode
                  )?.label
                }
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-2 rounded-md">
              <Label htmlFor="model-advance" className="cursor-pointer">
                AI Model {'->'}
              </Label>
              <Switch
                id="model-advance"
                checked={modelState.modelMode === 'gpt-4-1106-preview'}
                onCheckedChange={handleModelType}
              />
              <Label htmlFor="model-advance" className="cursor-pointer">
                {
                  modelMode.find(mode => mode.id === modelState.modelMode)
                    ?.label
                }
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
