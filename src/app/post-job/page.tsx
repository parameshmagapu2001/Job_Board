'use client'
// src/app/post-job/page.tsx
import UserLayout from '@/components/layout/UserLayout'
import { useState } from 'react'
import { PlusCircle, FileText, Globe, DollarSign, Building } from 'lucide-react'

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'full-time',
    experienceLevel: 'mid',
    skills: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Post a <span className="gradient-text">Job Posting</span></h1>
          <p className="text-muted-foreground">Reach thousands of active developers, designers, and tech professionals.</p>
        </div>

        {submitted ? (
          <div className="glass-card rounded-2xl p-10 text-center border-green-500/20">
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">✓</div>
            <h2 className="font-display text-2xl font-bold mb-2 text-foreground">Job Submitted Successfully!</h2>
            <p className="text-muted-foreground text-sm mb-6">Our admin team is reviewing your posting. It will be live on the board within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-white/5 transition-all">Post Another Job</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
            <h2 className="font-display text-xl font-bold flex items-center gap-2 border-b border-border pb-4 mb-6">
              <FileText className="w-5 h-5 text-cyan-400" /> Job Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Job Title</label>
                <input required type="text" placeholder="e.g. Senior React Developer" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Company Name</label>
                <input required type="text" placeholder="e.g. Razorpay" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Location</label>
                <input required type="text" placeholder="e.g. Bengaluru, India or Remote" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Job Type</label>
                <select value={formData.jobType} onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all text-muted-foreground">
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="remote">Remote (Worldwide)</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Experience Level</label>
                <select value={formData.experienceLevel} onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all text-muted-foreground">
                  <option value="entry">Entry-Level / Fresher</option>
                  <option value="mid">Mid-Level</option>
                  <option value="senior">Senior-Level</option>
                  <option value="lead">Lead / Architect</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills (Comma separated)</label>
                <input required type="text" placeholder="e.g. React, Node.js, AWS" value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Minimum Annual Salary (INR)</label>
                <input type="number" placeholder="e.g. 1200000" value={formData.salaryMin} onChange={e => setFormData({ ...formData, salaryMin: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Maximum Annual Salary (INR)</label>
                <input type="number" placeholder="e.g. 2400000" value={formData.salaryMax} onChange={e => setFormData({ ...formData, salaryMax: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Job Description</label>
              <textarea required rows={6} placeholder="Describe the responsibilities, requirements, stack, and perks..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
            </div>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
              <PlusCircle className="w-5 h-5" /> Submit Job Posting
            </button>
          </form>
        )}
      </div>
    </UserLayout>
  )
}
