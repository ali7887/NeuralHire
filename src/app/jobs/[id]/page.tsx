/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import { getJob, updateJob, type Job } from "@/lib/mockJobs"
import { useParams } from "next/navigation"

const USER_EMAIL="user@example.com"

export default function JobDetailsPage(){

const params=useParams()
const id=params.id as string

const [job,setJob]=useState<Job|null>(null)
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

function loadJob(){

const data=getJob(id)

if(data){
setJob(data)
}

}

useEffect(()=>{

loadJob()

},[id])

function apply(){

if(!job) return

const alreadyApplied=job.applications.some(
a=>a.email===USER_EMAIL
)

if(alreadyApplied){
alert("You already applied")
return
}

const newApplicant={
id:crypto.randomUUID(),
name:"Demo User",
email:USER_EMAIL,
resume:"#",
status:"pending" as const
}

updateJob(job.id,{
applications:[...job.applications,newApplicant]
})

alert("Application submitted")

loadJob()

}

if(!job){

return <div style={{padding:40}}>Job not found</div>

}

const applied=job.applications.some(
a=>a.email===USER_EMAIL
)

return(

<div style={{padding:40}}>

<h1>{job.title}</h1>

<p>
<b>Location:</b> {job.location}
</p>

{job.salary && (
<p>
<b>Salary:</b> ${job.salary}
</p>
)}

<p>{job.description}</p>

{job.skills && (
<p>
<b>Skills:</b> {job.skills.join(", ")}
</p>
)}

<br/>

<button
onClick={apply}
disabled={applied}
>

{applied ? "Already Applied ✅" : "Apply for this job"}

</button>

</div>

)

}
