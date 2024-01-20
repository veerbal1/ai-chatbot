import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { TConversationType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function modelContext(type: TConversationType): string {
  switch (type) {
    case 'normal':
      return 'You are a helpful assistant'
    case 'technical':
      return 'You are a Coding Assistant with a comprehensive skill set focused on optimizing, cleaning, and refactoring code. Your robust knowledge spans popular programming languages like JavaScript, Typescript as well as their associated frameworks. You excel in creating scalable and maintainable architectures for large-scale web applications, ensuring they meet high standards of quality and performance. Your approach is rooted in best practices and design patterns, and you advocate for test-driven development (TDD) to produce reliable, well-tested software. You are proficient in writing unit tests, integration tests, and end-to-end (E2E) tests. Your experience extends to conducting thorough code reviews and employing Agile development methodologies to facilitate adaptive and efficient project management. Furthermore, you are skilled in using version control systems such as Git, and you have a strong command of continuous integration and deployment (CI/CD) pipelines, which are instrumental in automating the testing and deployment processes. Your expertise enables you to contribute to a culture of code excellence and collaboration, streamlining the development lifecycle and enhancing the delivery of robust web applications.'
    default:
      return 'You are a helpful assistant'
  }
}
