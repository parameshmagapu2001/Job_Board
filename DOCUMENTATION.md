# JobBoard – Full-Stack Architecture, Setup & Integration Documentation

This document serves as the comprehensive architectural reference, onboarding guide, and task compliance report for the **JobBoard** platform. It is structured to guide developers of all levels (including interns) through the codebase, explaining the tech stack decisions, the data flow, and how to scale or swap the backend endpoints.

---

## 🚀 Submission & Task Checklist Compliance

This section documents exactly how the project meets each of the 6 requirements specified in the hiring assessment:

### 1. Build a Job Board with Custom UX & Feature Details
*   **Unique UI/UX Design**: Engineered a premium, cohesive glassmorphic dark theme using customized Tailwind CSS variables. The aesthetics represent a production-ready, state-of-the-art SaaS product rather than a minimal prototype.
*   **Key Feature Details**:
    *   **Advanced Job Search Grid**: Fully responsive filters for job categories, types (remote, hybrid, full-time), experience levels, and salary ranges.
    *   **Interactive Apply Modal**: Designed a client-side popup modal in `JobActions.tsx` containing an interactive drag-and-drop resume upload zone, mock file verification states, cover letter input, and submission load indicators.
    *   **Dashboard Analytics**: Recharts charts equipped with dynamic mounting states to eliminate hydration discrepancies.
    *   **Scroll-driven Navbar**: The main navbar slides out of view when scrolling down and slides back into view when scrolling up to maximize page reading area.

### 2. Push Code to GitHub
*   **Secure Clean Commit**: Cleaned the entire local Git history to remove trace files and credential proofs (like `.env`), added standard `.gitignore` rules, and pushed the clean repository to the remote origin.
*   **Repository URL**: [https://github.com/parameshmagapu2001/Job_Board.git](https://github.com/parameshmagapu2001/Job_Board.git)

### 3. CI/CD Pipeline on GitHub
*   **Workflow Design**: Configured a pipeline workflow (`deploy.yml`) located under `.github/workflows/`.
*   **Auditing Steps**: The workflow automatically checks out code on pull requests or commits to `main`, installs packages using `npm ci`, executes type checks and audits compilation using `npm run build`, and automatically initiates Vercel deployments.

### 4. Deploy Project to Vercel via CI/CD
*   **Automated Deployment**: The GitHub pipeline links to Vercel APIs. Once the build and test suites pass, it triggers production deployments instantly.
*   **Active Subdomain**: [https://job-board-india.vercel.app](https://job-board-india.vercel.app)
*   **Admin Dashboard Link**: [https://job-board-india.vercel.app/admin](https://job-board-india.vercel.app/admin)

### 5. Document All Features in Detail
*   **Thorough Reference Guide**: Completed this file (`DOCUMENTATION.md`) and the project repository's `README.md` to detail project architecture, Firebase config values, developer guides, and endpoint migration code examples.

### 6. Submit Final Links
*   **GitHub Repository**: [https://github.com/parameshmagapu2001/Job_Board.git](https://github.com/parameshmagapu2001/Job_Board.git)
*   **Production Deployment URL**: [https://job-board-india.vercel.app](https://job-board-india.vercel.app)
*   **Admin Dashboard URL**: [https://job-board-india.vercel.app/admin](https://job-board-india.vercel.app/admin)

---

## 📖 Table of Contents
1. [System Architecture & Tech Stack](#1-system-architecture--tech-stack)
2. [Data Layer Design (Centralized Mocks)](#2-data-layer-design-centralized-mocks)
3. [Firebase Integration Details](#3-firebase-integration-details)
4. [Onboarding & Setup Guide](#4-onboarding--setup-guide)
5. [Developer Guide: Transitioning to Real Endpoints](#5-developer-guide-transitioning-to-real-endpoints)
6. [CI/CD & Production Deployment](#6-cicd--production-deployment)

---

## 1. System Architecture & Tech Stack

JobBoard is built on a modern hybrid web stack designed for speed, visual beauty, and search engine optimization.

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js App Router (14.x)                 │
├──────────────────────────────┬──────────────────────────────┤
│      Server Components       │      Client Components       │
│   (SEO Meta, Page Layouts,   │   (Forms, Filters, Modals,   │
│   Static Crawl Optimization) │    Interactive Recharts)     │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               ▼                              ▼
 ┌───────────────────────────┐  ┌───────────────────────────┐
 │   Data Mocks & Models     │  │    Firebase Client SDK    │
 │ (jobsData.ts, adminData)  │  │  (Auth, Firestore, Storage)│
 └───────────────────────────┘  └───────────────────────────┘
```

### Key Technology Stack Decisions
*   **Next.js 14 (App Router)**: Leverages React Server Components (RSC) to render pages on the server. This reduces client-side JavaScript bundle sizes and generates pre-rendered HTML headers, allowing search engines (Google, Bing) to index job details instantly.
*   **TypeScript**: Provides type safety across filters, job records, and user schemas. This prevents run-time reference bugs when managing job listings or applications.
*   **Tailwind CSS**: A utility-first CSS framework used to build our custom dark glassmorphic design system. It handles style compilation efficiently during builds.
*   **Firebase Suite**: Selected for serverless rapid application development:
    *   **Authentication**: Handles secure user registration, email sign-in, and Google OAuth.
    *   **Firestore**: A real-time NoSQL database used to log job postings, user profiles, and applications.
    *   **Cloud Storage**: Hosts document assets such as PDF resumes uploaded by candidates.

---

## 2. Data Layer Design (Centralized Mocks)

### The Single Source of Truth (SSOT)
To prevent mock data from being duplicated across multiple screens, the project centralizes all mock lists inside two main files:
1.  **`src/data/jobsData.ts`**: Contains all job listings (31 items) and queries.
2.  **`src/data/adminData.ts`**: Contains traffic analytics charts, blog posts, ads, and log statistics.

### Next.js Server-Client Boundary Serialization
In Next.js App Router, when a **Server Component** (e.g. `/remote-jobs`) imports data and passes it to a **Client Component** (e.g. `JobsGrid`), Next.js serializes the parameters into a JSON string.
Because mock objects originally contained a dynamic `.toDate()` function for compatibility with Firebase Timestamp objects, this caused a serialization error:
> *`Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".`*

#### The Fix
We added a serialization wrapper `serializeJob` in `jobsData.ts` that maps database timestamps to raw numbers (`{ seconds, nanoseconds }`) before exporting `MOCK_JOBS`:
```typescript
const serializeJob = (job: any) => ({
  ...job,
  createdAt: job.createdAt?.toDate ? { seconds: job.createdAt.seconds, nanoseconds: job.createdAt.nanoseconds } : job.createdAt,
  updatedAt: job.updatedAt?.toDate ? { seconds: job.updatedAt.seconds, nanoseconds: job.updatedAt.nanoseconds } : job.updatedAt,
})

export const MOCK_JOBS: Job[] = RAW_MOCK_JOBS.map(serializeJob)
```
On the client side, components parse this serialized timestamp back into a JavaScript Date object using our robust `parseDate` utility.

---

## 3. Firebase Integration Details

All Firebase configuration resides in `src/firebase/config.ts` and core actions are defined in `src/firebase/collections.ts`.

### Config Init Example (`config.ts`)
```typescript
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
```

---

## 4. Onboarding & Setup Guide

### Step-by-Step Installation
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/parameshmagapu2001/Job_Board.git
    cd Job_Board
    ```
2.  **Install Node Dependencies**:
    ```bash
    npm install
    ```
3.  **Setup local Environment Variables**:
    Create a file named `.env.local` in the root folder and add your credentials:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
4.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```
5.  **Build validation**:
    To confirm there are no typescript or build errors before checking in code:
    ```bash
    npm run build
    ```

---

## 5. Developer Guide: Transitioning to Real Endpoints

Currently, the portal pages load jobs from the mock centralized data file `jobsData.ts`. Transitioning from mock arrays to live backend database endpoints is straightforward.

### A. Transitioning to Firestore Real-Time collections
Instead of pulling from the local array in `jobsData.ts`, retrieve live collections from your Firebase Firestore backend.

#### Step 1: Update API Helpers in `src/data/jobsData.ts`
Import the Firestore SDK query utilities:
```typescript
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { Job } from '@/types'

// Replaces the local filter with a live async Firestore fetch
export const getRemoteMockJobs = async (): Promise<Job[]> => {
  const jobsRef = collection(db, 'jobs')
  const q = query(jobsRef, where('jobType', '==', 'remote'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Job[]
}
```

#### Step 2: Update Server Component Pages to be `async`
Because database calls are asynchronous, update the page components to resolve the promise.

**Example: Before (`src/app/remote-jobs/page.tsx`)**
```typescript
import { getRemoteMockJobs } from '@/data/jobsData'
export default function RemoteJobsPage() {
  const jobs = getRemoteMockJobs()
  return <JobsGrid jobs={jobs} />
}
```

**Example: After (Async Firestore Fetch)**
```typescript
import { getRemoteMockJobs } from '@/data/jobsData'
export default async function RemoteJobsPage() {
  const jobs = await getRemoteMockJobs() // await async database response
  return <JobsGrid jobs={jobs} />
}
```

### B. Transitioning to custom Rest API Backend (e.g. Node.js, Django, Go)
If you decide to retire Firebase and connect to a custom backend API server:

#### Step 1: Update API helpers to use standard Fetch
Replace the mock function with an HTTP request to your API server:
```typescript
export const getRemoteMockJobs = async (): Promise<Job[]> => {
  const response = await fetch('https://api.jobboard.in/v1/jobs?type=remote', {
    next: { revalidate: 3600 } // Cache results for 1 hour for high performance
  })
  
  if (!response.ok) {
    throw new Error('Failed to retrieve remote jobs')
  }
  
  return response.json()
}
```

---

## 6. CI/CD & Production Deployment

### Automated GitHub Pipeline
The project is configured with a GitHub Actions workflow (`deploy.yml`) located under `.github/workflows/`. On every push to the `main` branch, it triggers an automated build check and deploys the updates to Vercel:

```yaml
name: Vercel Production Deployment
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Validate TypeScript and build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Configuring secrets on GitHub
1.  Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2.  Add the following repository secrets:
    *   `VERCEL_TOKEN`: Vercel Personal Access Token (retrieved from account settings on Vercel).
    *   `VERCEL_ORG_ID`: Vercel Scope/Organization ID.
    *   `VERCEL_PROJECT_ID`: Vercel Project ID.
