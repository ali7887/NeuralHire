🧠 EuroJobs — AI‑Powered Job Board & Recruitment SaaS
EuroJobs is a production‑ready, full‑stack recruitment platform that combines modern SaaS architecture with AI‑powered features for both employers and job seekers.

Built with Next.js 15, TypeScript, PostgreSQL, and OpenAI, the platform demonstrates secure authentication, role‑based access control, scalable architecture, and intelligent automation for the hiring process.

🚀 Tech Overview
Framework
Next.js 15 (App Router), React, Server Components, Server Actions

Database
PostgreSQL with Drizzle ORM (type‑safe queries)

Security
JWT Authentication (jose)
HTTP‑only cookies
Refresh token rotation
Middleware‑based RBAC
AI Engine
OpenAI GPT‑4o for content generation and semantic job matching

Architecture
Feature‑driven modular architecture with clear separation of concerns

🤖 AI‑Powered Features
EuroJobs integrates AI directly into the recruitment workflow to improve efficiency and decision making.

For Employers
AI Job Description Generator
Generates structured, industry‑standard job descriptions from a job title and key responsibilities.

Benefits

Saves time creating job postings
Produces consistent and professional descriptions
Reduces recruitment preparation time
AI Job Summary Card
Provides context‑aware summaries and insights for posted jobs within the employer dashboard.

For Job Seekers
AI Job Match Score
A semantic matching system that evaluates how well a candidate’s profile aligns with job requirements.

Highlights

Intelligent similarity scoring
Dynamic comparison between candidate profiles and job data
Optimized API contracts and robust error handling
AI Recommended Jobs
A personalized job feed generated from user profiles and preferences using AI‑assisted matching.

🔐 Security & Architecture
Authentication
JWT‑based authentication using jose
Secure HTTP‑only cookies
Refresh token rotation
Authorization
Role‑based access control (RBAC):

Admin
Employer
Job Seeker
Protected routes are enforced via Next.js middleware and server‑side verification.

Validation
Strict typing with TypeScript
Database schema validation via Drizzle ORM
Input validation and payload protection
Admin Dashboard
The platform includes an admin interface for:

User management
Company and job monitoring
Platform oversight
🛠️ Tech Stack
Frontend
Next.js 15 • React • TypeScript • TailwindCSS • Lucide Icons

Backend
Next.js API Routes • Drizzle ORM • PostgreSQL

Authentication
JWT (jose) • HTTP‑Only Cookies

AI Integration
OpenAI GPT‑4o

📁 Project Structure
text
src
│
├── app
│   ├── api            # API routes (auth, jobs, applications, AI)
│   ├── (auth)         # Authentication pages
│   ├── (dashboard)    # Protected dashboards
│   └── admin          # Admin-only pages
│
├── components         # Reusable UI components
│
├── lib
│   ├── db             # Database connection & schema
│   ├── auth           # JWT utilities and auth helpers
│   └── openai         # AI integration logic
│
└── middleware.ts      # Route protection and RBAC
🚀 Getting Started
1. Clone the repository
bash
git clone https://github.com/ali7887/EuroJobs.git
cd EuroJobs
2. Install dependencies
bash
npm install
3. Configure environment variables
Create a .env.local file:

env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
4. Setup the database
bash
npx drizzle-kit push
5. Run the development server
bash
npm run dev
Open:

text
http://localhost:3000
🎯 Core Features
AI Job Description Generator
AI Job Match Scoring
AI Recommended Jobs Feed
Secure JWT Authentication
Refresh Token Rotation
Role‑Based Access Control (Admin / Employer / Job Seeker)
Employer Job Management Dashboard
Job Seeker Application System
Admin Management Panel
Responsive UI with TailwindCSS
📧 Contact
Ali Kiani

Email

alikiani78@gmail.com

website

https://alikiani.vercel.app/

LinkedIn

https://www.linkedin.com/in/alikiani78/

📄 License
MIT License

Built with Next.js, TypeScript, PostgreSQL, and OpenAI.