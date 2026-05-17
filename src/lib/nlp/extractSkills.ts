import { SKILLS } from "./skillDictionary";

export function extractSkills(text?: string) {

  if (!text) return []

  const lower = text.toLowerCase()

  const skills = [
    "react",
    "next.js",
    "typescript",
    "javascript",
    "node",
    "python",
    "docker",
    "aws"
  ]

  const found: string[] = []

  skills.forEach(skill => {
    if (lower.includes(skill)) {
      found.push(skill)
    }
  })

  return found
}

