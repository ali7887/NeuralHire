"use client"

import { useState } from "react"

export default function ResumePage(){

const [file,setFile]=useState<File|null>(null)

async function upload(){

if(!file) return

const form=new FormData()

form.append("resume",file)

await fetch("/api/upload/resume",{
method:"POST",
body:form
})

alert("Resume uploaded")

}

return(

<div>

<h2>Upload Resume</h2>

<input
type="file"
onChange={(e)=>setFile(e.target.files?.[0]||null)}
/>

<button onClick={upload}>
Upload
</button>

</div>

)

}
