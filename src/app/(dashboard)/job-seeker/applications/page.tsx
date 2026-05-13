"use client"

import { useEffect,useState } from "react"

export default function ApplicationsPage(){

const [apps,setApps]=useState<any[]>([])

useEffect(()=>{

fetch("/api/applications")
.then(r=>r.json())
.then(setApps)

},[])

return(

<div>

<h2>My Applications</h2>

{apps.map(app=>(
<div key={app.id}>
<p>{app.jobTitle}</p>
<p>{app.status}</p>
</div>
))}

</div>

)

}
