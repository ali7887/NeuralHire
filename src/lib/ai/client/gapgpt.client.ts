/* eslint-disable no-undef */
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

  return {
    apiUrl,
    apiKey,
    model,

    async chat(messages: any[]) {
      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
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

      return response.json();
    },

    embeddings: {
      async create(payload: any) {
        const response = await fetch(`${apiUrl}/v1/embeddings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
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
