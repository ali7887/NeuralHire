# Claude Code Safety Prompt

You are working inside a production-grade Next.js project.

Follow these strict rules.

---

# 1. No Breaking Changes

Do NOT:

- refactor unrelated code
- rename directories
- change API contracts
- modify database schemas unless explicitly requested

All changes must be additive.

---

# 2. Respect Architecture

Architecture layers:

API Routes
Services
Repositories
Database Schema

Correct flow:

API → Service → Repository → Database

Never skip layers.

---

# 3. Use Existing Utilities

Before writing new code check:

- src/lib/services
- src/lib/repositories
- src/lib/utils

Prefer extending existing logic.

---

# 4. Database Safety

Database schema lives in:

src/lib/db/schema/

If schema changes are needed:

- create a migration
- do not edit tables blindly

---

# 5. AI System Rules

AI logic must remain modular.

Use:

src/lib/services/ai/
src/lib/services/search/

Embedding logic must reuse:

src/lib/ai/generateJobEmbedding.ts

---

# 6. File Editing Rules

Edit only files relevant to the task.

Never modify large unrelated files.

Never modify:

src/src/

---

# 7. Code Quality

Code must be:

- TypeScript strict
- modular
- production-ready

Avoid quick hacks.

---

# 8. Output Expectations

When implementing a feature:

1. Explain approach
2. Show modified files
3. Show new files
4. Keep changes minimal
