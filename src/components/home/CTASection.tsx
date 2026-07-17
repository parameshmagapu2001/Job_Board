// src/components/home/CTASection.tsx
import Link from 'next/link'
import { ArrowRight, Briefcase, Users } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
            <Briefcase className="w-10 h-10 text-cyan-400 mb-6" />
            <h3 className="font-display text-2xl font-bold mb-3">Looking for a Job?</h3>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">Create your profile, set job alerts, and apply to thousands of positions in seconds.</p>
            <Link href="/auth/register" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
            <Users className="w-10 h-10 text-indigo-400 mb-6" />
            <h3 className="font-display text-2xl font-bold mb-3">Hiring Talent?</h3>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">Post jobs and reach millions of qualified professionals across India.</p>
            <Link href="/post-job" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20">
              Post a Job <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
