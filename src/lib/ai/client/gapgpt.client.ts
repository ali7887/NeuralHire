/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export function getGapGPTClient() {
  const apiUrl = process.env.GAPGPT_API_URL;
  const apiKey = process.env.GAPGPT_API_KEY;
  const model = process.env.GAPGPT_MODEL || "gpt-4o-mini";

  if (!apiUrl) {
    throw new Error("Missing GAPGPT_API_URL");
  }

  if (!apiKey) {
    throw new Error("Missing GAPGPT_API_KEY");
  }

  const chatUrl = `${apiUrl}/chat/completions`;
  const embeddingsUrl = `${apiUrl}/embeddings`;
  console.log("API KEY:", process.env.GAPGPT_API_KEY)

  return {
    model,
    
    async chat(messages: any[]) {
      const response = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Chat API error: ${text}`);
      }

      const json = await response.json();
      return json;
    },

    embeddings: {
      async create(input: string) {
        const response = await fetch(embeddingsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "text-embedding-3-small",
            input,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Embedding API error: ${text}`);
        }

        return response.json();
      },
    },
  };
}
