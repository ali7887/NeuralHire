import { SKILLS } from "./skillDictionary";

export function extractSkills(text: string) {
  const lower = text.toLowerCase();

  const found: string[] = [];

  SKILLS.forEach((skill) => {
    if (lower.includes(skill)) {
      found.push(skill);
    }
  });

  return [...new Set(found)];
}
