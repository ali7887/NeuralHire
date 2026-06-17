# NeuralHire – Claude Development Context

## Project Identity
NeuralHire is an AI-powered recruitment SaaS platform.

Canonical project name:
NeuralHire

Legacy names (ignore everywhere):
- Nexus
- JobBoard
- EuroJobs

Always refer to the project as **NeuralHire**.

---

## Repository Source of Truth
The actual repository code is the only reliable source of truth.

Documentation may be outdated.

Before implementing any feature always:
1. Inspect relevant files
2. Identify existing logic
3. Extend existing modules instead of rewriting

---

## Critical Repository Constraint
The repository contains or may contain duplicated folder trees.

### Hard Rules
- **Primary source tree:** `src/`
- **Ignore tree:** `src/src/`
- Never modify files inside `src/src/`
- Never import from `src/src/`
- Ignore `src/src/` when searching for code

If both versions of a file exist, prefer the file inside `src/`.

Example:
- Correct: `src/app/api/jobs/route.ts`
- Incorrect: `src/src/app/api/jobs/route.ts`

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- PostgreSQL
- Drizzle ORM
- Custom auth with JWT access tokens, refresh token rotation, HTTP-only cookies, RBAC
- TailwindCSS
- CSS Modules
- Vitest
- Playwright

---

## Architecture Overview
NeuralHire follows a layered architecture.

### UI Layer
- `src/app`
- `src/components`

### API Layer
- `src/app/api`

### Business Logic
- `src/lib/services`

### Data Access
- `src/lib/repositories`

### Database Schema
- `src/lib/db/schema`

### Utilities
- `src/lib/utils`

---

## Data Access Rules
Database access must follow this flow:

API Route → Service → Repository → Database

### Example
- API: `src/app/api/jobs/route.ts`
- Service: `src/lib/services/job.service.ts`
- Repository: `src/lib/repositories/job.repository.ts`

Direct database access from API routes is forbidden.

---

## AI System
AI functionality currently lives in multiple locations:

### API Endpoints
- `src/app/api/ai/`

### AI Services
- `src/lib/services/ai/`
- `src/lib/services/search/`

### AI Utilities
- `src/lib/ai/`

Existing features include:
- job embeddings
- hybrid search
- matcher services
- AI chat endpoint
- prompt utilities

---

## Target AI Capabilities
NeuralHire AI roadmap:

1. Job Embedding Pipeline
2. Resume Embedding Pipeline
3. Vector Search
4. Semantic Job Search
5. Candidate ↔ Job Matching
6. Resume Analysis
7. Recruiter Insights
8. AI Job Description Generator

Primary files related to AI search:
- `src/lib/services/search/hybrid-search.service.ts`
- `src/lib/services/search/ai-search.service.ts`
- `src/lib/services/ai/job-indexer.service.ts`

---

## Development Philosophy
Prefer:
- additive development
- minimal invasive changes
- isolated modules
- incremental improvements

Avoid:
- rewriting working systems
- restructuring directories
- large refactors without approval

---

## Forbidden Changes
Claude must NOT automatically:
- change the tech stack
- refactor authentication system
- modify Drizzle schema without approval
- restructure the repository
- delete folders
- rename core modules

---

## Workflow Rules
Before implementing any feature:

### Step 1 — Audit
Identify the relevant files.

### Step 2 — Plan
Provide a short implementation plan (max 3–5 steps).

### Step 3 — Wait
Wait for confirmation before implementing.

### Step 4 — Implement
Implement only the requested change.

Never implement multiple unrelated features at once.

---

## SESSION RESUME
Assume previous sessions have already:
- fixed major bugs
- completed debugging
- achieved successful build
- achieved successful Vercel deployment

Do not repeat repository-wide audits.

Continue from `docs/PROJECT_STATE.md`.

---

## READ LIMITS
Maximum files to read initially:
- `CLAUDE.md`
- `docs/PROJECT_STATE.md`
- `docs/CURRENT_PHASE.md`
- Up to 5 task-specific files

Do not read more unless necessary.

---

## Current Development Context
Current project progress is tracked in:
- `docs/PROJECT_STATE.md`
- `docs/CURRENT_PHASE.md`

Claude should read those files before making assumptions about project progress.

---

## Communication Style
Responses should be:
- technical
- precise
- concise
- implementation focused

Avoid generic explanations.
Focus on actionable engineering decisions.
