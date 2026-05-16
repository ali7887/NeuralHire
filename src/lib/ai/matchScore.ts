export function calcMatchScore(
  jobSkills: string[] = [],
  userSkills: string[] = []
): number {

  if (!jobSkills.length || !userSkills.length) return 0

  const normalizedUser = userSkills.map(s => s.toLowerCase())

  const matched = jobSkills.filter(skill =>
    normalizedUser.includes(skill.toLowerCase())
  )

  return Math.round((matched.length / jobSkills.length) * 100)
}
