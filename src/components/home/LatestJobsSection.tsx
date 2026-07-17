'use client'
// src/components/home/LatestJobsSection.tsx
import Link from 'next/link'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import { getAllMockJobs } from '@/data/jobsData'
import { formatDistanceToNow } from 'date-fns'

const parseDate = (dateVal: any): Date => {
  if (!dateVal) return new Date()
  if (typeof dateVal.toDate === 'function') return dateVal.toDate()
  if (typeof dateVal === 'string' || typeof dateVal === 'number') return new Date(dateVal)
  if (dateVal.seconds) return new Date(dateVal.seconds * 1000)
  return new Date(dateVal)
}

export default function LatestJobsSection() {
  const latestJobs = getAllMockJobs()
    .sort((a, b) => parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime())
    .slice(0, 8)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-1"><Clock className="w-4 h-4" /> Latest Postings</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Fresh <span className="gradient-text">Jobs Today</span></h2>
          </div>
          <Link href="/jobs" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {latestJobs.map(job => {
            const salaryText = job.salaryMin && job.salaryMax 
              ? `₹${(job.salaryMin / 100000).toFixed(0)}–${(job.salaryMax / 100000).toFixed(0)} LPA` 
              : 'Competitive'
            const timeAgo = formatDistanceToNow(parseDate(job.createdAt), { addSuffix: true })

            return (
              <Link key={job.id} href={`/jobs/${job.slug || job.id}`} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:neon-border transition-all group">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {job.company?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm group-hover:text-cyan-400 transition-colors truncate">{job.title}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{job.company}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{job.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-cyan-400 font-medium">{salaryText}</div>
                  <div className="text-xs text-muted-foreground mt-1">{timeAgo}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
