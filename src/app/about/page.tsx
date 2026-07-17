import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { Award, ShieldCheck, Users, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | JobBoard',
  description: 'Learn about JobBoard, the premium hiring platform designed to bridge the gap between talented developers, startups, and top tech companies.',
}

const VALUES = [
  { icon: Users, title: 'Community First', desc: 'We build relationships between top talent and innovative startups, helping developers elevate their careers.' },
  { icon: Zap, title: 'Speed & Efficiency', desc: 'No endless rounds or slow feedback. We facilitate instant applications and fast-paced recruiting.' },
  { icon: ShieldCheck, title: 'Verified Companies', desc: 'Every employer listing a job on our platform undergoes a detailed verification process to avoid spam.' },
  { icon: Award, title: 'Premium Standards', desc: 'We only partner with employers offering competitive salaries, good cultures, and growth potential.' },
]

export default function AboutPage() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-6">
            Our Mission
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">About <span className="gradient-text">JobBoard</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            JobBoard is a premium, AI-powered hiring platform designed to bridge the gap between talented developers, startups, and top tech companies across the globe.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
          <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Why We Exist</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Traditional job boards are noisy, generic, and slow. Candidates get lost in databases of resumes, and employers waste hundreds of hours filtering unqualified leads. 
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We built JobBoard to streamline the process. Utilizing AI algorithms and a focused developer-centric community, we enable candidates to showcase their actual skills and match with employers looking for their specific stack.
          </p>
        </div>

        <h2 className="font-display text-2xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-3xl p-10 border border-cyan-500/20">
          <h3 className="font-display text-2xl font-bold mb-2">Ready to find your next role?</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">Create a profile and let top tech startups discover your developer expertise today.</p>
          <a href="/auth/register" className="inline-flex px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
            Get Started (Free)
          </a>
        </div>
      </div>
    </UserLayout>
  )
}
