# Feature Specification Template

Use this template before asking Claude Code to implement a feature.

---

# Feature Name

Short descriptive name.

Example:
Resume Embedding Pipeline

---

# Goal

Describe what the feature should achieve.

Example:
Generate vector embeddings for uploaded resumes and store them in the database.

---

# User Story

Example:

Candidate uploads a resume.
The system extracts text and generates an embedding.
This embedding is used for job matching.

---

# Existing System

List relevant files.

Example:

Resume upload API
src/app/api/resume/upload/route.ts

Embedding generator
src/lib/ai/generateJobEmbedding.ts

Matcher service
src/app/api/ai/match/matcher.service.ts

---

# Required Implementation

Describe required changes.

Example:

1. Create resume embedding service
2. Generate embeddings after upload
3. Store embeddings in database
4. Link embedding with user_id

---

# Files to Create

Example:

src/lib/services/ai/resume-embedding.service.ts

---

# Files to Modify

Example:

src/app/api/resume/upload/route.ts

---

# Constraints

Important restrictions.

Example:

- Do not modify job embedding logic
- Do not change existing API contracts
- Follow repository pattern

---

# Expected Output

Example:

- new service
- minimal schema update
- API integration
