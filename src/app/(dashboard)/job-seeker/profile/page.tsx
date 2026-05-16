/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-undef */
"use client"

import { useState, useEffect } from "react"
import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"

export default function ProfilePage() {

  const [profile,setProfile] = useState({
    name:"",
    email:"",
    location:"",
    bio:"",
    skills:""
  })

  useEffect(()=>{
    const saved = localStorage.getItem("jobSeekerProfile")
    if(saved){
      const p = JSON.parse(saved)
      setProfile({...p, skills:p.skills.join(", ")})
    }
  },[])

  const save = ()=>{
    const data = {
      ...profile,
      skills: profile.skills.split(",").map(s=>s.trim())
    }

    localStorage.setItem("jobSeekerProfile",JSON.stringify(data))
    alert("Profile saved")
  }

  return (
    <div>
      <JobSeekerHeader/>

      <div style={{padding:40,maxWidth:600}}>

        <h2>Profile</h2>

        <input placeholder="Name"
        value={profile.name}
        onChange={e=>setProfile({...profile,name:e.target.value})}/>

        <input placeholder="Email"
        value={profile.email}
        onChange={e=>setProfile({...profile,email:e.target.value})}/>

        <input placeholder="Location"
        value={profile.location}
        onChange={e=>setProfile({...profile,location:e.target.value})}/>

        <textarea placeholder="Short bio"
        value={profile.bio}
        onChange={e=>setProfile({...profile,bio:e.target.value})}/>

        <input placeholder="Skills (React, Next.js, TS)"
        value={profile.skills}
        onChange={e=>setProfile({...profile,skills:e.target.value})}/>

        <button onClick={save}>Save</button>

      </div>
    </div>
  )
}
