// src/app/freshers/page.tsx
import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { GraduationCap, Star, ArrowRight, BookOpen } from 'lucide-react'
import JobsGrid from '@/components/jobs/JobsGrid'
import Link from 'next/link'
import { Job } from '@/types'
import { getFresherMockJobs } from '@/data/jobsData'

export const metadata: Metadata = {
  title: 'Fresher Jobs & Entry Level Openings | JobBoard',
  description: 'Start your career. Search and apply for software developer, analyst, and support jobs welcoming 0-1 years of experience.',
}

const FRESHER_JOBS = getFresherMockJobs() as Partial<Job>[]

const TIPS = [
  { title: 'Build Projects', desc: 'GitHub projects matter more than marks. Build 2-3 real-world projects relevant to your target role.' },
  { title: 'Learn DSA', desc: 'Data Structures & Algorithms are asked in every tech interview. Practice on LeetCode daily.' },
  { title: 'Network Early', desc: 'LinkedIn connections, college alumni, and referrals can open doors that resumes alone can\'t.' },
  { title: 'Target Startups', desc: 'Startups hire for potential, not just experience. You\'ll learn faster and grow quicker.' },
]

export default function FreshersPage() {
  return (
    <UserLayout>
      <section className="relative py-20 overflow-hidden grid-pattern">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 text-sm text-indigo-400 mb-6">
            <GraduationCap className="w-4 h-4" /> 0–1 Year Experience Welcome
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Fresher <span className="gradient-text">Jobs</span> in India</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Start your career journey. Thousands of entry-level positions from top companies ready to hire fresh talent.</p>
          <div className="flex items-center justify-center gap-8">
            {[['8,000+', 'Fresher Jobs'], ['500+', 'Hiring Companies'], ['₹3.5L', 'Avg Starting Salary']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl font-bold gradient-text">{val}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold mb-6">Latest Fresher Jobs</h2>
              <JobsGrid jobs={FRESHER_JOBS} />
              <div className="text-center mt-8">
                <Link href="/jobs?experienceLevel=fresher" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all">
                  View All Fresher Jobs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-5">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Career Tips for Freshers</h3>
                <div className="space-y-4">
                  {TIPS.map(({ title, desc }) => (
                    <div key={title} className="border-l-2 border-cyan-500/30 pl-3">
                      <div className="text-sm font-semibold mb-1">{title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-cyan-400" /> Popular Resources</h3>
                <div className="space-y-2">
                  {[['Resume Writing Guide', '/resume-tips'], ['Interview Questions', '/interview-questions'], ['Career Blog', '/blog']].map(([label, href]) => (
                    <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                      <span className="text-sm group-hover:text-cyan-400 transition-colors">{label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  )
}
