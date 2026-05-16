/* eslint-disable no-undef */
export function getUserSkills():string[]{

  const profile = localStorage.getItem("jobSeekerProfile")

  if(!profile) return []

  const data = JSON.parse(profile)

  return data.skills || []

}

export function calculateMatchScore(
  jobSkills:string[]
){

  const userSkills = getUserSkills()

  if(userSkills.length===0) return 0

  const matched = jobSkills.filter(skill =>
    userSkills.includes(skill)
  )

  const score = Math.round(
    (matched.length / jobSkills.length) * 100
  )

  return score
}
