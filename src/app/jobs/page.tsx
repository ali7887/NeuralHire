/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getJobs, seedMockJobs, type Job } from "@/lib/mockJobs"

export default function JobsPage(){

  function calculateMatch(jobSkills:string[]){

const resumeSkillsRaw=localStorage.getItem("resumeSkills")

if(!resumeSkillsRaw) return null

const resumeSkills:string[]=JSON.parse(resumeSkillsRaw)

const matched=jobSkills.filter(skill=>
resumeSkills
.map(s=>s.toLowerCase())
.includes(skill.toLowerCase())
)

return Math.round((matched.length/jobSkills.length)*100)

}

const [jobs,setJobs]=useState<Job[]>([])

useEffect(()=>{

seedMockJobs()

const data=getJobs()

const active=data.filter(j=>j.status==="active")

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
