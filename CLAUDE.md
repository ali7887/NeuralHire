@AGENTS.md
NeuralHire – Claude Development Context
Project

NeuralHire is an AI-powered recruitment SaaS platform built with Next.js and TypeScript.

Canonical project name: NeuralHire

Previous names (ignore in code and docs):

    Nexus
    JobBoard
    EuroJobs

Source of Truth

The actual repository code is the only reliable source.

Documentation may be outdated.

Before implementing any feature:

    Inspect the relevant files
    Identify existing logic
    Extend instead of rewriting

Core Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Database: PostgreSQL

ORM: Drizzle ORM

Authentication:

    Custom JWT
    Refresh token rotation
    HTTP-only cookies
    RBAC

Styling:

    TailwindCSS
    CSS Modules

Testing:

    Vitest
    Playwright

Architecture Layers

app/api

HTTP route handlers

lib/services

Business logic

lib/repositories

Database access layer

lib/db/schema

Drizzle ORM schema definitions

components

UI components

Never access the database directly from API routes.

Always use services and repositories.
Important Repository Constraint

The repository contains duplicate folder trees:

src/

src/src/

This duplication exists due to historical refactors.

Do NOT restructure or delete folders.

Always confirm which path is active before editing.
AI Layer

Current AI-related locations:

app/api/ai/

lib/services/ai/

lib/services/search/

lib/ai/

Existing functionality includes:

    job embeddings
    hybrid search
    matcher services
    AI API endpoints

However the AI layer is not fully production ready.

Target capabilities:

    embedding pipelines
    vector search
    semantic job search
    candidate ↔ job matching
    resume analysis
    recruiter insights

Development Rules

Do NOT:

    refactor the whole project
    change the tech stack
    rewrite authentication
    change database schema without reason
    restructure directories

Prefer:

    additive development
    minimal changes
    isolated modules

Workflow Rules

Before implementing features:

    audit relevant files
    propose a short implementation plan
    wait for confirmation

Never automatically implement multiple features at once.

