'use client'
import UserLayout from '@/components/layout/UserLayout'
import { useAuth } from '@/app/providers'
import { useState } from 'react'
import { Bookmark, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import JobCard from '@/components/jobs/JobCard'
import { Job } from '@/types'

const DEMO_SAVED: Partial<Job>[] = [
  { id: '1', title: 'Senior React Developer', company: 'Google', location: 'Remote', jobType: 'remote', experienceLevel: 'senior', skills: ['React', 'TypeScript'], salaryMin: 2000000, salaryMax: 3500000, isFeatured: true },
  { id: '4', title: 'Data Scientist', company: 'Zepto', location: 'Hyderabad', jobType: 'remote', experienceLevel: 'mid', skills: ['Python', 'ML'], salaryMin: 1800000, salaryMax: 3000000 },
]

export default function SavedJobsPage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState<Set<string>>(new Set(DEMO_SAVED.map(j => j.id!)))

  if (!user) return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">Sign in to view saved jobs</h2>
        <p className="text-muted-foreground mb-6">Create an account to save jobs and apply later.</p>
        <Link href="/auth/login" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all">Sign In <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </UserLayout>
  )

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">Saved Jobs</h1>
            <p className="text-muted-foreground text-sm">{saved.size} jobs saved</p>
          </div>
        </div>
        {saved.size === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-semibold mb-2">No saved jobs yet</h2>
            <p className="text-sm text-muted-foreground mb-6">Browse jobs and click the bookmark icon to save them for later.</p>
            <Link href="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all">Browse Jobs <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {DEMO_SAVED.filter(j => saved.has(j.id!)).map(job => (
              <JobCard key={job.id} job={job as Job} saved={saved.has(job.id!)} onSave={id => setSaved(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  )
}
