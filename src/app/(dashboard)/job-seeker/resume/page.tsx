 
"use client"

import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"
import { useState } from "react"

const MAX_SIZE = 2 * 1024 * 1024

export default function ResumePage() {

  const [message, setMessage] = useState("")
  const [fileName, setFileName] = useState("")

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setMessage("Only PDF files are allowed")
      return
    }

    if (file.size > MAX_SIZE) {
      setMessage("File must be under 2MB")
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      localStorage.setItem("resumeFile", reader.result as string)
      localStorage.setItem("resumeName", file.name)

      setFileName(file.name)
      setMessage("Resume uploaded successfully")
    }

    reader.readAsDataURL(file)
  }

  return (
    <>
      <JobSeekerHeader />

      <div style={{ padding: "30px" }}>
        <h2>Upload Resume</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
        />

        {fileName && (
          <p>Uploaded: {fileName}</p>
        )}

        {message && (
          <p>{message}</p>
        )}
      </div>
    </>
  )
}
