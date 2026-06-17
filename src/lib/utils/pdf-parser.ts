// pdf-parse is a CJS module — require avoids ESM default-import type mismatch
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;

const MAX_CHARS = 4000;

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const result = await pdfParse(buffer);
  return result.text.trim().slice(0, MAX_CHARS);
}
