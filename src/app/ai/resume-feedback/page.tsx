"use client"

import { useState } from "react"
import styles from "../ai.module.css"

export default function ResumeFeedbackPage() {

  const [resumeText, setResumeText] = useState("")
  const [feedback, setFeedback] = useState("")

function analyzeResume() {

  if (!resumeText) {
    setFeedback("Please paste your resume first.")
    return
  }

  const text = resumeText.toLowerCase()

  let score = 50
  let suggestions: string[] = []

  if (text.includes("skills")) {
    score += 15
  } else {
    suggestions.push("Add a Skills section.")
  }

  if (text.includes("experience")) {
    score += 15
  } else {
    suggestions.push("Add a Work Experience section.")
  }

  if (text.includes("education")) {
    score += 10
  } else {
    suggestions.push("Add an Education section.")
  }

  if (resumeText.length > 600) {
    score += 10
  } else {
    suggestions.push("Your resume seems short. Add more details.")
  }

  if (score > 100) score = 100

  let result = "AI Resume Feedback:\n\n"

  suggestions.forEach(s => {
    result += `- ${s}\n`
  })

  result += `\nOverall Score: ${score} / 100`

  setFeedback(result)
}


  return (
    <div className={styles.container}>

      <h1>AI Resume Review</h1>

      <textarea
        className={styles.textarea}
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <button
        className={styles.button}
        onClick={analyzeResume}
      >
        Analyze Resume
      </button>

      {feedback && (
        <div className={styles.result}>
          <pre>{feedback}</pre>
        </div>
      )}

    </div>
  )
}
