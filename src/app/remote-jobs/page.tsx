'use client'
// src/app/remote-jobs/page.tsx
import UserLayout from '@/components/layout/UserLayout'
import { Wifi, Globe, Clock, DollarSign } from 'lucide-react'
import JobCard from '@/components/jobs/JobCard'
import { useState } from 'react'
import { Job } from '@/types'
import { getRemoteMockJobs } from '@/data/jobsData'

const REMOTE_JOBS = getRemoteMockJobs() as Partial<Job>[]

const PERKS = [
  { icon: Globe, title: 'Work from Anywhere', desc: 'No commute, no office politics. Work from home, cafe, or beach.' },
  { icon: Clock, title: 'Flexible Hours', desc: 'Async-first companies that respect your time and work-life balance.' },
  { icon: DollarSign, title: 'Global Salaries', desc: 'Earn USD/EUR salaries while living in India — massive purchasing power.' },
  { icon: Wifi, title: 'Internet Allowance', desc: 'Most remote jobs include home office and internet reimbursement.' },
]

export default function RemoteJobsPage() {
  const [saved, setSaved] = useState<Set<string>>(new Set())

  return (
    <UserLayout>
      <section className="relative py-20 overflow-hidden grid-pattern">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-6">
            <Wifi className="w-4 h-4" /> 100% Remote Opportunities
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Work From <span className="gradient-text">Anywhere</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover hand-picked remote jobs from the world's best companies. Earn global salaries, skip the commute.</p>
          <div className="flex items-center justify-center gap-8 mt-10">
            {[['2,400+', 'Remote Jobs'], ['45+', 'Countries'], ['₹18L+', 'Avg Package']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl font-bold gradient-text">{val}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }) => (
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
          <h2 className="font-display text-2xl font-bold mb-8">Latest Remote Jobs</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {REMOTE_JOBS.map(job => (
              <JobCard key={job.id} job={job as Job} saved={saved.has(job.id!)} onSave={id => setSaved(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })} />
            ))}
          </div>
        </div>
      </section>
    </UserLayout>
  )
}
