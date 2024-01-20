import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Decode Tech Jargon',
    message: 'What does "asynchronous programming" mean?'
  },
  {
    heading: 'Enhance Codebase',
    message: 'How can I refactor this block of code for better readability?'
  },
  {
    heading: 'Understand Best Practices',
    message: 'Why is test-driven development considered effective?'
  },
  {
    heading: 'Optimize Application',
    message: 'What strategies can I use to improve database query performance?'
  },
  {
    heading: 'Troubleshoot Errors',
    message: 'How do I fix a "memory leak" in my application?'
  },
  {
    heading: 'Implement Features',
    message:
      'Can you guide me through setting up a CI/CD pipeline for my project?'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Veerbal Chatbot
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Your agile Coding Assistant! Specializing in code optimization,
          refactoring, and testing, Veerbal ensures your web applications are
          scalable, maintainable, and of top quality. Embrace best practices,
          TDD, and efficient project management with Veerbal&apos;s expertise in
          Agile methodologies, Git, and CI/CD pipelines. Start coding smarter
          today!
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
