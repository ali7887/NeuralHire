/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect,useState } from "react"
import Link from "next/link"
import { getJobs } from "@/lib/mockJobs"
import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"

type AppView={
id:string
jobId:string
jobTitle:string
status:string
}

export default function ApplicationsPage(){

const [apps,setApps]=useState<AppView[]>([])

useEffect(()=>{

const jobs=getJobs()

const userEmail="user@example.com"

const allApps:AppView[]=[]

jobs.forEach(job=>{

job.applications.forEach(app=>{

if(app.email===userEmail){

allApps.push({
id:app.id,
jobId:job.id,
jobTitle:job.title,
status:app.status
})

}

})

})

setApps(allApps)

},[])

return(

<div style={{padding:"30px"}}>
<JobSeekerHeader />
<h2>My Applications</h2>

{apps.length===0 && <p>No applications yet</p>}

{apps.map(app=>(

<div
key={app.id}
style={{
border:"1px solid #ddd",
padding:"16px",
marginBottom:"12px",
borderRadius:"8px"
}}
>

<h3>{app.jobTitle}</h3>

<p>Status: {app.status}</p>

<Link href={`/jobs/${app.jobId}`}>
View Job
</Link>

</div>

))}

</div>

)

}
