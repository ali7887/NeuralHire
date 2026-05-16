export function summarizeJob(description?: string | null): string {

  if (!description) return ""

  if (description.length < 120) return description

  return description.slice(0,120) + "..."
}
