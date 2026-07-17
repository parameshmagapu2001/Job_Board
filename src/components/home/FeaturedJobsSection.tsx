'use client'
// src/components/home/FeaturedJobsSection.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import JobCard from '@/components/jobs/JobCard'
import { jobsService } from '@/firebase/collections'
import { Job } from '@/types'

import { getFeaturedMockJobs } from '@/data/jobsData'

// Demo data for initial render
const DEMO_JOBS = getFeaturedMockJobs() as Partial<Job>[]

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<any[]>(DEMO_JOBS)
  const [saved, setSaved] = useState<Set<string>>(new Set())

  useEffect(() => {
    jobsService.getFeatured().then(data => { if (data.length > 0) setJobs(data) }).catch(() => {})
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-muted/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-1"><Star className="w-4 h-4" /> Featured Jobs</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Top <span className="gradient-text">Opportunities</span></h2>
          </div>
          <Link href="/jobs?featured=true" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.slice(0, 6).map(job => (
            <JobCard key={job.id} job={job as Job} saved={saved.has(job.id)} onSave={id => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/jobs" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
            Browse All Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
