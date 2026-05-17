"use client"

import { useState } from "react"
import styles from "../ai.module.css"

export default function CoverLetterPage() {

  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [result, setResult] = useState("")

  function generateLetter() {

    if (!jobTitle || !company) {
      setResult("Please fill in job title and company.")
      return
    }

    const letter = `
Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at ${company}.

My experience and technical background make me a strong candidate for this role. I enjoy solving complex problems, learning new technologies, and contributing to high‑quality software products.

I would welcome the opportunity to contribute my skills to your team.

Best regards,
Your Name
`

    setResult(letter)
  }

  return (
    <div className={styles.container}>

      <h1>AI Cover Letter Generator</h1>

      <input
        className={styles.input}
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button
        className={styles.button}
        onClick={generateLetter}
      >
        Generate Cover Letter
      </button>

      {result && (
        <div className={styles.result}>
          <pre>{result}</pre>
        </div>
      )}

    </div>
  )
}
