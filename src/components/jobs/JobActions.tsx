'use client'
// src/components/jobs/JobActions.tsx
import { useState } from 'react'
import { Bookmark, Share2, ExternalLink, CheckCircle } from 'lucide-react'
import { Job } from '@/types'

interface JobActionsProps {
  job: Job
}

export default function JobActions({ job }: JobActionsProps) {
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const salaryText = job.salaryMin && job.salaryMax 
    ? `₹${(job.salaryMin / 100000).toFixed(0)}–${(job.salaryMax / 100000).toFixed(0)} LPA` 
    : 'Competitive'

  return (
    <div className="space-y-5">
      {/* Apply Card */}
      <div className="glass-card rounded-2xl p-6 sticky top-24">
        <div className="text-center mb-5">
          <div className="font-display text-2xl font-bold gradient-text mb-1">
            {salaryText}
          </div>
          <p className="text-xs text-muted-foreground">Annual Package</p>
        </div>

        {applied ? (
          <div className="text-center py-4">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="font-semibold text-green-400">Applied!</p>
            <p className="text-xs text-muted-foreground mt-1">We'll notify you of updates</p>
          </div>
        ) : (
          <button onClick={() => setApplied(true)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
            Apply Now <ExternalLink className="w-4 h-4" />
          </button>
        )}

        <div className="mt-5 space-y-3">
          {[
            ['Job Type', job.jobType],
            ['Experience', job.experienceLevel],
            ['Category', job.category],
            ['Views', (job.views || 0).toLocaleString()],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium capitalize">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Share / Save Card */}
      <div className="glass-card rounded-2xl p-4 flex gap-3">
        <button onClick={() => setSaved(!saved)} className={`flex-1 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-semibold ${saved ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' : 'border-border text-muted-foreground hover:border-border/80'}`}>
          <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved' : 'Save Job'}
        </button>
        <button onClick={handleShare} className="flex-1 py-3 rounded-xl border border-border text-muted-foreground hover:border-border/80 transition-all flex items-center justify-center gap-2 text-sm font-semibold">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  )
}
