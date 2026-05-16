export function calcMatchScore(
  jobSkills: string[],
  userSkills: string[]
) {

  if (!jobSkills.length) return 0

  const normalized = userSkills.map((s) =>
    s.toLowerCase()
  )

  const match = jobSkills.filter((s) =>
    normalized.includes(s.toLowerCase())
  )

  return Math.round((match.length / jobSkills.length) * 100)
}
