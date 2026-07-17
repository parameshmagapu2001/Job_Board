'use client'
// src/app/jobs/[slug]/page.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import UserLayout from '@/components/layout/UserLayout'
import { MapPin, Clock, Briefcase, Users, ExternalLink, Bookmark, Share2, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const DEMO_JOB = {
  id: '1',
  title: 'Senior React Developer',
  company: 'Google',
  companyLogo: '',
  location: 'Hyderabad, India',
  jobType: 'remote',
  experienceLevel: 'senior',
  category: 'Software Engineering',
  description: `<p>We are looking for a talented and experienced Senior React Developer to join our growing team at Google. You will be working on cutting-edge projects that impact billions of users worldwide.</p><p>As a Senior React Developer, you will collaborate with cross-functional teams to design, develop, and maintain high-quality web applications.</p>`,
  requirements: ['5+ years of experience with React.js', 'Strong proficiency in TypeScript', 'Experience with Next.js and SSR/SSG', 'Knowledge of RESTful APIs and GraphQL', 'Experience with testing frameworks like Jest', 'Strong understanding of web performance optimization'],
  responsibilities: ['Design and develop scalable React applications', 'Mentor junior developers and conduct code reviews', 'Collaborate with designers and backend engineers', 'Optimize applications for performance and scalability', 'Participate in agile ceremonies and sprint planning'],
  skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'Jest', 'AWS'],
  salaryMin: 2000000,
  salaryMax: 3500000,
  benefits: ['Health Insurance', 'Remote Work', 'Learning Budget', 'Stock Options', 'Flexible Hours', '30 Days PTO'],
  applicationUrl: 'https://careers.google.com',
  isFeatured: true,
  views: 1240,
  applications: 89,
}

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState(DEMO_JOB)
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {job.company[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="font-display text-2xl font-bold mb-1">{job.title}</h1>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setSaved(!saved)} className={`p-2 rounded-xl border transition-all ${saved ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' : 'border-border text-muted-foreground hover:border-border/80'}`}>
                        <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-2 rounded-xl border border-border text-muted-foreground hover:border-border/80 transition-all">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-cyan-400" />{job.location}</span>
<span className="flex items-center gap-1.5 text-sm text-muted-foreground capitalize">
  <Briefcase className="w-4 h-4 text-cyan-400" />
  {job.jobType}
</span>                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Users className="w-4 h-4 text-cyan-400" />{job.applications} applicants</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map(s => (
                      <span key={s} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/50">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-4">Job Description</h2>
              <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>

            {/* Requirements */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Apply Card */}
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-5">
                <div className="font-display text-2xl font-bold gradient-text mb-1">
                  ₹{(job.salaryMin / 100000).toFixed(0)}–{(job.salaryMax / 100000).toFixed(0)} LPA
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
                  ['Views', job.views.toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Benefits & Perks</h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map(b => (
                  <span key={b} className="px-3 py-1.5 text-xs rounded-full border border-cyan-500/20 text-cyan-400 bg-cyan-500/5">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
