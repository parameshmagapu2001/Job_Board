'use client'
// src/components/jobs/JobActions.tsx
import { useState } from 'react'
import { Bookmark, Share2, ExternalLink, CheckCircle, UploadCloud, X, FileText } from 'lucide-react'
import { Job } from '@/types'

interface JobActionsProps {
  job: Job
}

export default function JobActions({ job }: JobActionsProps) {
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [resumeName, setResumeName] = useState<string | null>(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmitApplication = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setApplied(true)
      setShowApplyModal(false)
    }, 1200)
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
          <button onClick={() => setShowApplyModal(true)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
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
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={() => setShowApplyModal(false)} />
          
          {/* Content */}
          <div className="relative w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowApplyModal(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl sm:text-2xl font-bold mb-1">Apply for this Position</h3>
            <p className="text-xs text-muted-foreground mb-6">{job.title} · {job.company}</p>

            <div className="space-y-4">
              {/* Resume Upload */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">RESUME / CV</label>
                {resumeName ? (
                  <div className="flex items-center justify-between p-4 bg-muted/50 border border-cyan-500/20 rounded-xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                      <div className="truncate">
                        <div className="text-sm font-medium truncate">{resumeName}</div>
                        <div className="text-xs text-muted-foreground">1.2 MB · PDF</div>
                      </div>
                    </div>
                    <button onClick={() => setResumeName(null)} className="p-1 text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setResumeName('Resume_Rahul_Sharma.pdf')}
                    className="border border-dashed border-border hover:border-cyan-500/40 rounded-xl p-6 text-center cursor-pointer hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                    <div>
                      <span className="text-sm font-medium text-cyan-400 group-hover:underline">Click to upload</span>
                      <span className="text-sm text-muted-foreground"> or drag & drop</span>
                    </div>
                    <p className="text-xs text-muted-foreground">PDF, DOCX (Max 5MB)</p>
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">COVER LETTER (OPTIONAL)</label>
                <textarea 
                  rows={4}
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Why are you a good fit for this role?"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 text-sm transition-all resize-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-3 bg-muted text-muted-foreground font-semibold rounded-xl hover:bg-muted/80 transition-all text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 text-sm disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
