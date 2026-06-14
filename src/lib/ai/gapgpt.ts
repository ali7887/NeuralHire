 
const API_URL = process.env.GAPGPT_API_URL
const API_KEY = process.env.GAPGPT_API_KEY

if (!API_URL) {
  throw new Error("Missing GAPGPT_API_URL")
}

if (!API_KEY) {
  throw new Error("Missing GAPGPT_API_KEY")
}

export async function gapgptChat(messages: any[]) {

  const res = await fetch(`${API_URL}/chat/completions`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },

    body: JSON.stringify({
      model: process.env.GAPGPT_MODEL ?? "gapgpt-qwen-3.6",
      messages
    })

  })

  if (!res.ok) {
    throw new Error(`GapGPT error: ${res.status}`)
  }

  const data = await res.json()

  return data.choices?.[0]?.message?.content
}
