import { CandidateMatchResult } from "../matching/matchJobToCandidates"

export function rankCandidates(
  matches: CandidateMatchResult[]
): CandidateMatchResult[] {

  return [...matches].sort((a, b) => b.score - a.score)
}
