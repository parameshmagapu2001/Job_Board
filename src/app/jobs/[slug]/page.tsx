// src/app/jobs/[slug]/page.tsx
import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { MapPin, Briefcase, Users, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MOCK_JOBS } from '@/data/jobsData'
import JobActions from '@/components/jobs/JobActions'
import { Job } from '@/types'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = MOCK_JOBS.find(j => j.slug === params.slug || j.id === params.slug)
  if (!job) return { title: 'Job Not Found | JobBoard' }
  
  const cleanDescription = job.description ? job.description.replace(/<[^>]*>/g, '') : ''
  return {
    title: `${job.title} at ${job.company} | JobBoard`,
    description: cleanDescription.slice(0, 160),
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: `Apply for the ${job.title} role at ${job.company} in ${job.location}.`,
      url: `https://jobboard.in/jobs/${job.slug || job.id}`,
      siteName: 'JobBoard',
    }
  }
}

export default function JobDetailPage({ params }: Props) {
  const job = MOCK_JOBS.find(j => j.slug === params.slug || j.id === params.slug)
  if (!job) notFound()

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
                  {job.company?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1">
                  <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">{job.title}</h1>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-cyan-400" />{job.location}</span>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground capitalize">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      {job.jobType}
                    </span>
                    {job.applications !== undefined && (
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Users className="w-4 h-4 text-cyan-400" />{job.applications} applicants</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills?.map(s => (
                      <span key={s} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/50">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-4">Job Description</h2>
              <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description || '' }} />
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
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
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
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
            )}
          </div>

          {/* Sidebar */}
          <div>
            <JobActions job={job as Job} />
            
            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="glass-card rounded-2xl p-6 mt-5">
                <h3 className="font-semibold mb-4">Benefits & Perks</h3>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map(b => (
                    <span key={b} className="px-3 py-1.5 text-xs rounded-full border border-cyan-500/20 text-cyan-400 bg-cyan-500/5">{b}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
