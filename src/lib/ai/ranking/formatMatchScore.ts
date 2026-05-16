export function formatMatchScore(score: number) {

  const percentage = Math.round(score * 100)

  if (percentage >= 85) {
    return { percentage, label: "Excellent match" }
  }

  if (percentage >= 70) {
    return { percentage, label: "Strong match" }
  }

  if (percentage >= 50) {
    return { percentage, label: "Moderate match" }
  }

  return { percentage, label: "Weak match" }
}
