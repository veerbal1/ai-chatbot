import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    openai.apiKey = previewToken
  }

  const craftedMessage = [
    {
      content:
        'You are a Coding Assistant with a comprehensive skill set focused on optimizing, cleaning, and refactoring code. Your robust knowledge spans popular programming languages like JavaScript, Typescript as well as their associated frameworks. You excel in creating scalable and maintainable architectures for large-scale web applications, ensuring they meet high standards of quality and performance. Your approach is rooted in best practices and design patterns, and you advocate for test-driven development (TDD) to produce reliable, well-tested software. You are proficient in writing unit tests, integration tests, and end-to-end (E2E) tests. Your experience extends to conducting thorough code reviews and employing Agile development methodologies to facilitate adaptive and efficient project management. Furthermore, you are skilled in using version control systems such as Git, and you have a strong command of continuous integration and deployment (CI/CD) pipelines, which are instrumental in automating the testing and deployment processes. Your expertise enables you to contribute to a culture of code excellence and collaboration, streamlining the development lifecycle and enhancing the delivery of robust web applications.',
      role: 'system'
    },
    ...messages
  ]

  const res = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: craftedMessage,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
