# Claude Code Workspace Checklist
Project: NeuralHire

This checklist ensures Claude Code operates safely inside the correct project structure.

---

# 1. Active Source Directory

Primary source directory:

src/

⚠ IMPORTANT:
There is a duplicated tree:

src/
src/src/

Claude must ALWAYS modify:

src/

and NEVER:

src/src/

The directory src/src is legacy / duplicated.

---

# 2. Core Architecture

This project follows a layered architecture.

Layers:

API Routes
src/app/api/

Services
src/lib/services/

Repositories
src/lib/repositories/

Database schema
src/lib/db/schema/

Utilities
src/lib/utils/

Types
src/lib/types/

---

# 3. AI System Locations

AI logic exists in these directories.

Embedding generator
src/lib/ai/generateJobEmbedding.ts

AI services
src/lib/services/ai/

Search services
src/lib/services/search/

AI API routes
src/app/api/ai/

Matcher
src/app/api/ai/match/

---

# 4. Search System

Hybrid search architecture.

Keyword search
src/lib/services/search/keyword-search.service.ts

Vector / AI search
src/lib/services/search/ai-search.service.ts

Hybrid orchestration
src/lib/services/search/hybrid-search.service.ts

---

# 5. Database Schema

Important tables.

Jobs
src/lib/db/schema/jobs.ts

Users
src/lib/db/schema/users.ts

Applications
src/lib/db/schema/applications.ts

Embeddings
src/lib/db/schema/job_embeddings.ts

---

# 6. Authentication System

Auth logic located here:

src/lib/auth/

Guards
src/lib/auth/require-role.ts
src/lib/auth/with-auth.ts

Session
src/lib/auth/session/

---

# 7. API Layer

Next.js API routes:

src/app/api/

Important domains:

auth
jobs
applications
admin
ai

---

# 8. Coding Rules

Claude must follow these rules:

- Do not refactor large parts of the project
- Only implement requested features
- Prefer additive changes
- Reuse existing services
- Follow repository + service pattern

---

# 9. Testing

Test utilities exist:

vitest
playwright

Do not modify test configuration unless required.

---

# 10. Safety Rules

Never:

- move directories
- rename major folders
- change schema without migration
- modify src/src tree
