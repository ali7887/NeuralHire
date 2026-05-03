AI Job/Recruitment Board SaaS
A production-ready, AI-powered job board platform built with modern web technologies



A full-stack SaaS application demonstrating enterprise-grade architecture with authentication, role-based access control, admin dashboard, and AI-powered job matching capabilities.

✨ Features
🔐 Authentication & Security
JWT-based authentication with secure HTTP-only cookies
Refresh token rotation for enhanced security
Role-Based Access Control (RBAC) for user and admin roles
Rate limiting on authentication endpoints
Middleware-protected routes for admin access
👥 User Management
User registration and secure login/logout
Persistent session management
Multi-role support (User/Admin)
💼 Job Board Core
Post and browse job listings
One-click job applications
Company profile pages
Job categorization and filtering
🎛️ Admin Dashboard
Protected admin panel
Platform monitoring and analytics
User and job management
🤖 AI-Powered Features
AI-generated job descriptions using OpenAI
Semantic job search for better matching
Intelligent candidate-job matching
🛠️ Tech Stack
Layer	Technologies
Frontend	Next.js 15 (App Router), React, TypeScript, TailwindCSS
Backend	Next.js API Routes, Drizzle ORM, PostgreSQL
Authentication	JWT (jose), HTTP-only cookies, Refresh tokens
AI	OpenAI API
📁 Project Structure
src/

├── app/

│ ├── api/

│ │ ├── auth/ # Authentication endpoints

│ │ ├── jobs/ # Job CRUD operations

│ │ └── ai/ # AI-powered features

│ ├── admin/

│ │ └── dashboard/ # Admin panel

│ └── (public)/ # Public pages

├── db/

│ ├── schema/ # Database schema definitions

│ └── migrations/ # Database migrations

├── modules/

│ └── auth/ # Authentication logic

├── lib/

│ ├── security/ # Security utilities

│ └── utils/ # Helper functions

└── components/ # Reusable UI components

🚀 Getting Started
Prerequisites
Node.js 18+
PostgreSQL database
OpenAI API key
Installation
Clone the repository
bash
   git clone https://github.com/your-username/job-board-saas.git
   cd job-board-saas
Install dependencies
bash
   npm install
Configure environment variables

Create a .env.local file in the root directory:

env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   JWT_SECRET=your-secret-key-min-32-characters
   OPENAI_API_KEY=sk-your-openai-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
Run database migrations
bash
   npx drizzle-kit push
Start the development server
bash
   npm run dev
Open your browser

Navigate to http://localhost:3000

🔑 Admin Access
Admin routes are protected via middleware and require a user with the admin role.

Admin Dashboard: /admin/dashboard

To create an admin user, manually update the user’s role in the database:




UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

---

## 🔒 Security Features

- ✅ HTTP-only cookies for token storage
- ✅ Automatic refresh token rotation
- ✅ Role-based route protection
- ✅ Rate limiting on sensitive endpoints
- ✅ Middleware-based authentication guards
- ✅ SQL injection prevention via Drizzle ORM
- ✅ XSS protection through React's built-in escaping

---

## 🎯 Project Goals

This project was built as a **portfolio-grade SaaS application** to demonstrate:

- Modern full-stack Next.js architecture
- Secure authentication and authorization systems
- Type-safe database operations with Drizzle ORM
- RESTful API design patterns
- Admin dashboard implementation
- AI/ML integration in web applications
- Production-ready code structure and best practices

---

## 🗺️ Roadmap

- [ ] Resume parser with AI extraction
- [ ] Advanced search filters (location, salary, remote)
- [ ] Email notifications for job applications
- [ ] Subscription plans with Stripe integration
- [ ] Analytics dashboard for employers
- [ ] Real-time chat between employers and candidates
- [ ] Mobile app (React Native)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

alikiani78@gmail.com

Project Link: [https://github.com/ali7887/EuroJobs.git](https://github.com/ali7887/EuroJobs.git)

---

<p alig with ❤️ using Next.js and TypeScript</p> TypeScript</p>
