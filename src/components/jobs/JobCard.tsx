'use client'
// src/components/jobs/JobCard.tsx
import Link from 'next/link'
import { MapPin, Clock, Bookmark, ExternalLink, Zap } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Job } from '@/types'

interface JobCardProps {
  job: Job
  onSave?: (id: string) => void
  saved?: boolean
  compact?: boolean
}

const JOB_TYPE_COLORS: Record<string, string> = {
  remote: 'text-green-400 bg-green-400/10 border-green-400/20',
  'full-time': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'part-time': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  contract: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  internship: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  freelance: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
}

const parseDate = (dateVal: any): Date => {
  if (!dateVal) return new Date()
  if (typeof dateVal.toDate === 'function') return dateVal.toDate()
  if (typeof dateVal === 'string' || typeof dateVal === 'number') return new Date(dateVal)
  if (dateVal.seconds) return new Date(dateVal.seconds * 1000)
  return new Date(dateVal)
}

export default function JobCard({ job, onSave, saved, compact }: JobCardProps) {
  const postedAt = formatDistanceToNow(parseDate(job.createdAt), { addSuffix: true })
  const typeColor = JOB_TYPE_COLORS[job.jobType] || 'text-gray-400 bg-gray-400/10 border-gray-400/20'

  return (
    <div className={`glass-card rounded-2xl p-5 hover:neon-border transition-all duration-300 group relative ${job.isFeatured ? 'gradient-border' : ''}`}>
      {job.isFeatured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
          <Zap className="w-3 h-3" /> Featured
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl font-bold flex-shrink-0 border border-border/50">
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain rounded-xl" />
          ) : (
            job.company?.[0]?.toUpperCase() || '?'
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/jobs/${job.slug || job.id}`} className="font-semibold text-sm hover:text-cyan-400 transition-colors line-clamp-1 group-hover:text-cyan-400">
                {job.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
            </div>
            {onSave && (
              <button onClick={() => onSave(job.id)} className={`p-1.5 rounded-lg transition-all ${saved ? 'text-cyan-400 bg-cyan-400/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {job.location}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs border capitalize ${typeColor}`}>{job.jobType}</span>
            {job.experienceLevel === 'fresher' && (
              <span className="px-2 py-0.5 rounded-full text-xs border text-emerald-400 bg-emerald-400/10 border-emerald-400/20">Fresher OK</span>
            )}
            {job.salaryMin && (
              <span className="text-xs text-cyan-400 font-medium">
                ₹{(job.salaryMin / 100000).toFixed(0)}–{job.salaryMax ? (job.salaryMax / 100000).toFixed(0) : '?'} LPA
              </span>
            )}
          </div>

          {!compact && job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">{skill}</span>
              ))}
              {job.skills.length > 4 && <span className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">+{job.skills.length - 4}</span>}
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {postedAt}
            </span>
            <Link href={`/jobs/${job.slug || job.id}`}
              className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg hover:from-cyan-500/20 hover:to-indigo-500/20 transition-all flex items-center gap-1">
              Apply Now <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
