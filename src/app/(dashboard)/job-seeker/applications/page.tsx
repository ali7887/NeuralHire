 
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect,useState } from "react"
import Link from "next/link"
import { getJobs } from "@/lib/mockJobs"
import type { Job } from "@/lib/types/job.types"

import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"

type AppView={
  id:string
  jobId:string
  jobTitle:string
  status:string
}

const USER_EMAIL="user@example.com"

export default function ApplicationsPage(){

  const [apps,setApps]=useState<AppView[]>([])

  function loadApps(){

    const jobs=getJobs()

    const allApps:AppView[]=[]

    jobs.forEach(job=>{

      job.applications?.forEach(app=>{


        if(app.email===USER_EMAIL){

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

  }

  function withdraw(jobId:string){

    const jobs=getJobs()

    const updated=jobs.map(job=>{

      if(job.id===jobId){

        job.applications = (job.applications ?? []).filter(

          app=>app.email!==USER_EMAIL
        )

      }

      return job
    })

    localStorage.setItem("jobs",JSON.stringify(updated))

    loadApps()
  }

  useEffect(()=>{
    loadApps()
  },[])

  return(

    <div style={{padding:"30px"}}>

      <JobSeekerHeader/>

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

          <br/>

          <button
            onClick={()=>withdraw(app.jobId)}
            style={{marginTop:"8px"}}
          >
            Withdraw
          </button>

        </div>

      ))}

    </div>
  )
}
