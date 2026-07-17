'use client'
import UserLayout from '@/components/layout/UserLayout'
import { useAuth } from '@/app/providers'
import Link from 'next/link'
import { FileText, ArrowRight, Clock, CheckCircle, XCircle, Eye, Star } from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  pending:     { label: 'Pending',     color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',   icon: Clock },
  reviewing:   { label: 'Reviewing',   color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',      icon: Eye },
  shortlisted: { label: 'Shortlisted', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',      icon: Star },
  rejected:    { label: 'Rejected',    color: 'text-red-400 bg-red-500/10 border-red-500/20',          icon: XCircle },
  hired:       { label: 'Hired! 🎉',   color: 'text-green-400 bg-green-500/10 border-green-500/20',   icon: CheckCircle },
}

const DEMO_APPS = [
  { id: '1', jobTitle: 'Senior React Developer', company: 'Google', location: 'Remote', status: 'shortlisted', appliedAt: 'Jan 15, 2024', logo: '🔍' },
  { id: '2', jobTitle: 'Product Manager', company: 'Flipkart', location: 'Bangalore', status: 'reviewing', appliedAt: 'Jan 12, 2024', logo: '🛒' },
  { id: '3', jobTitle: 'Full Stack Engineer', company: 'Razorpay', location: 'Bangalore', status: 'pending', appliedAt: 'Jan 10, 2024', logo: '💳' },
  { id: '4', jobTitle: 'Data Scientist', company: 'Zepto', location: 'Hyderabad', status: 'rejected', appliedAt: 'Jan 5, 2024', logo: '⚡' },
]

export default function ApplicationsPage() {
  const { user } = useAuth()
  if (!user) return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">Sign in to track applications</h2>
        <Link href="/auth/login" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all mt-4">Sign In <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </UserLayout>
  )

  const counts = Object.keys(STATUS_CONFIG).reduce((acc, k) => ({ ...acc, [k]: DEMO_APPS.filter(a => a.status === k).length }), {} as Record<string, number>)

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-1">My Applications</h1>
          <p className="text-muted-foreground text-sm">Track all your job applications in one place.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {Object.entries(STATUS_CONFIG).map(([key, { label, color }]) => (
            <div key={key} className="glass-card rounded-xl p-3 text-center">
              <div className={`text-lg font-bold ${color.split(' ')[0]}`}>{counts[key] || 0}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {DEMO_APPS.map(app => {
            const cfg = STATUS_CONFIG[app.status]
            const Icon = cfg.icon
            return (
              <div key={app.id} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">{app.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{app.jobTitle}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{app.company} · {app.location}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />Applied {app.appliedAt}</div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border font-medium flex-shrink-0 ${cfg.color}`}>
                  <Icon className="w-3 h-3" />{cfg.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </UserLayout>
  )
}
