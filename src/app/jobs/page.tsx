/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getJobs, seedMockJobs } from "@/lib/mockJobs"
import type { Job } from "@/lib/types/job.types"


export default function JobsPage(){

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function calculateMatch(jobSkills: string[]) {
  const resumeSkillsRaw = localStorage.getItem("resumeSkills");
  if (!resumeSkillsRaw) return null;

  const resumeSkills: string[] = JSON.parse(resumeSkillsRaw);

  const resumeSet = new Set(
    resumeSkills.map((s) => s.toLowerCase())
  );

  const matchedCount = jobSkills.filter((skill) =>
    resumeSet.has(skill.toLowerCase())
  ).length;

  return jobSkills.length === 0
    ? null
    : Math.round((matchedCount / jobSkills.length) * 100);
}


const [jobs,setJobs]=useState<Job[]>([])

useEffect(()=>{

seedMockJobs()

const data=getJobs()

const active=data.filter(j=>j.status==="open")

setJobs(active)

},[])

return(

<div style={{padding:40}}>

<h1>Jobs</h1>

{jobs.length===0 && <p>No jobs available</p>}

{jobs.map(job=>(

<div
key={job.id}
style={{
border:"1px solid #ddd",
padding:20,
marginBottom:12,
borderRadius:8
}}
>

<h3>{job.title}</h3>

<p>{job.location}</p>

<Link href={`/jobs/${job.id}`}>
View Details
</Link>

</div>

))}

</div>

)

}
