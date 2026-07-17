// src/app/frontend-jobs/page.tsx
import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { Code, Layout, Laptop, Sparkles } from 'lucide-react'
import JobsGrid from '@/components/jobs/JobsGrid'
import { Job } from '@/types'
import { getFrontendMockJobs } from '@/data/jobsData'

export const metadata: Metadata = {
  title: 'Frontend Developer Jobs | JobBoard',
  description: 'Apply to top Frontend Developer, UI/UX, React, and React Native roles at leading startups in India and globally.',
}

const FRONTEND_JOBS = getFrontendMockJobs() as Partial<Job>[]

const STATS = [
  { icon: Code, title: 'Modern Stack', desc: 'Build with React, Next.js, TypeScript, Tailwind, and Vite.' },
  { icon: Layout, title: 'UI/UX Focus', desc: 'Craft beautiful, accessible, and performant user interfaces.' },
  { icon: Laptop, title: 'Remote Options', desc: 'Many roles offer flexible work setups or hybrid options.' },
  { icon: Sparkles, title: 'Fast Growth', desc: 'High demand for frontend expertise in scaling startups.' },
]

export default function FrontendJobsPage() {
  return (
    <UserLayout>
      <section className="relative py-20 overflow-hidden grid-pattern">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-6">
            <Code className="w-4 h-4" /> Frontend Development Roles
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Frontend <span className="gradient-text">Developer Jobs</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Build the web of tomorrow. Find frontend, React, and mobile developer jobs at India's top tech startups and global companies.</p>
        </div>
      </section>

      <section className="py-12 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3"><Icon className="w-5 h-5 text-cyan-400" /></div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold mb-8">Latest Frontend Developer Jobs</h2>
          <JobsGrid jobs={FRONTEND_JOBS} />
        </div>
      </section>
    </UserLayout>
  )
}
