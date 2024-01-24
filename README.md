# Veerbal Chatbot
Welcome to Veerbal Chatbot, your agile coding assistant! Veerbal specializes in code optimization, refactoring, and testing to ensure your web applications are scalable, maintainable, and of top quality. With Veerbal's expertise in Agile methodologies, Git, and CI/CD pipelines, you can embrace best practices, TDD, and efficient project management.

In addition to its coding capabilities, Veerbal Chatbot also offers a fitness context to assist you with your fitness goals. When switched to the fitness context, Veerbal can provide 
the following services:

- Create personalized diet plans based on your requirements and goals.
- Generate customized gym workout plans tailored to your fitness level and objectives.
- Provide information and guidance on various exercises, including proper form and technique.

## Features
- **AI Model Switching**: You have the flexibility to switch between two AI models - simple and advanced. The normal mode uses GPT-3.5, while the advanced mode uses gpt-4-preview-1106. This allows you to choose the level of complexity and sophistication in the chatbot's responses.
- **Conversation Context Switching**: Veerbal Chatbot offers different conversation contexts to cater to your specific needs. Here are the available contexts:
- - **Normal**: In this mode, the chatbot acts as a general chatbot similar to ChatGPT. It can engage in casual conversations and provide general information.
  - **Technical**: Switching to the technical mode transforms Veerbal into a smart coding assistant. It can help you write clean code, assist in writing tests, plan software architecture, answer technical questions, and more.
  - **Fitness**: If you need assistance with fitness-related queries, switching to the fitness context will enable Veerbal to become your fitness assistant. It can create diet plans, generate gym workout plans, provide information about exercises, and more.


**Prompt Input Box:**

![Screenshot 2024-01-24 at 1 34 36 PM](https://github.com/veerbal1/ai-chatbot/assets/55359171/2612c78a-6b7b-43a7-bc15-9de9a537e270)

**Conversation Context Switch:**

![Screenshot 2024-01-24 at 1 36 05 PM](https://github.com/veerbal1/ai-chatbot/assets/55359171/471800fe-8e1c-4700-95a9-37342b83e248)

**AI Model Switch:**

![Screenshot 2024-01-24 at 1 37 18 PM](https://github.com/veerbal1/ai-chatbot/assets/55359171/41330ceb-063b-41de-81da-3d41ee72726a)

## Running locally

**Clone the respository on your system**
```bash
git clone https://github.com/veerbal1/ai-chatbot.git
```

**Create your .env with these keys:**
```bash
# You must first activate a Billing Account here: https://platform.openai.com/account/billing/overview
# Then get your OpenAI API Key here: https://platform.openai.com/account/api-keys
OPENAI_API_KEY=

# Generate a random secret: https://generate-secret.vercel.app/32 or `openssl rand -base64 32`
AUTH_SECRET=
# Create a GitHub OAuth app here: https://github.com/settings/applications/new
# Authorization callback URL: https://authjs.dev/reference/core/providers_github#callback-url
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
# Support OAuth login on preview deployments, see: https://authjs.dev/guides/basics/deployment#securing-a-preview-deployment
# Set the following only when deployed. In this example, we can reuse the same OAuth app, but if you are storing users, we recommend using a different OAuth app for development/production so that you don't mix your test and production user base.
# AUTH_REDIRECT_PROXY_URL=https://YOURAPP.vercel.app/api/auth

# Instructions to create kv database here: https://vercel.com/docs/storage/vercel-kv/quickstart
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

```bash
pnpm install
pnpm dev
```

