# H – Full-Stack Job Portal

Modern job portal built with **Next.js 14**, **Firebase**, **Tailwind CSS**, and **ShadCN UI**.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, custom design system
- **Backend**: Firebase (Firestore, Auth, Storage, Messaging, Analytics)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## Features

### User App
- 🔍 Job search with filters (type, experience, category, salary)
- 🏠 Beautiful homepage with hero, stats, featured jobs, categories
- 💼 Remote jobs, fresher jobs, categories, companies pages
- 📄 Blog, interview questions, resume tips
- 👤 User profile, saved jobs, application tracking
- 🔐 Auth (Email + Google OAuth)

### Admin Panel
- 📊 Dashboard with live analytics charts
- 💼 Jobs CRUD (add, edit, delete, toggle active/featured)
- 🏢 Companies management with verification
- 📁 Categories management
- 📝 Blog post management
- 📣 Ads management (banner, sidebar, inline)
- 🔔 Push notifications
- 👥 User management with role control
- ⚙️ SEO & site settings

## Setup

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Firebase
Create a Firebase project at https://console.firebase.google.com

Enable:
- Firestore Database
- Authentication (Email/Password + Google)
- Storage
- Cloud Messaging

Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials.

### 3. Deploy Firestore Rules
\`\`\`bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy --only firestore:rules,storage
\`\`\`

### 4. Create Admin User
After registering, go to Firestore → users → your document → set `role` to `"admin"`.

### 5. Run locally
\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

### 6. Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`
Add all `.env.local` variables to Vercel environment variables.

## Project Structure
\`\`\`
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin panel pages
│   ├── auth/             # Login/Register
│   ├── jobs/             # Job listing + detail
│   ├── blog/             # Blog pages
│   └── ...               # Other pages
├── components/
│   ├── admin/            # Admin layout + components
│   ├── home/             # Homepage sections
│   ├── jobs/             # Job card, listing
│   └── layout/           # Navbar, footer
├── firebase/
│   ├── config.ts         # Firebase init
│   └── collections.ts    # All Firestore CRUD
├── hooks/                # Custom React hooks
├── services/             # Auth service
├── types/                # TypeScript interfaces
├── lib/                  # Utils
└── styles/               # Global CSS
\`\`\`

## Firebase Collections
| Collection | Purpose |
|---|---|
| `jobs` | All job postings |
| `categories` | Job categories |
| `companies` | Company profiles |
| `blogs` | Blog posts |
| `users` | User profiles + roles |
| `applications` | Job applications |
| `featured_jobs` | Featured job references |
| `ads` | Advertisement management |
| `notifications` | Push notification records |
| `saved_jobs` | User saved jobs |

## SEO
- Dynamic metadata per page
- Sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- SSR for job detail pages
- OpenGraph + Twitter cards
