import { OpenAI } from 'openai'

const getGPT = async (userinput) => {
  const openai = new OpenAI({
    apiKey: process.env.VUE_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '반려동물 전문가'
      },
      {
        role: 'user',
        content: userinput
      }
    ],
    temperature: 0.5,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0

    // stop:['Human:',"AI"]
  })

  const answer = response.choices[0].message.content
  return answer
}

export default getGPT
