export function cosineSimilarity(a: number[], b: number[]): number {

  if (!a || !b) return 0
  if (a.length !== b.length) return 0
  if (a.length === 0) return 0

  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {

    const ai = a[i]
    const bi = b[i]

    dot += ai * bi
    normA += ai * ai
    normB += bi * bi
  }

  const magnitudeA = Math.sqrt(normA)
  const magnitudeB = Math.sqrt(normB)

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

  return dot / (magnitudeA * magnitudeB)
}
