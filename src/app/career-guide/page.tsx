import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { BookOpen, Award, Compass, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Career Guide & Tech Advice | JobBoard',
  description: 'Access curated advice, interview checklists, portfolio tips, and salary negotiation guides from tech hiring experts.',
}

const GUIDES = [
  { icon: Compass, title: 'Navigating Tech Careers in 2026', desc: 'Understanding remote setups, AI disruption, and choosing the right track (frontend vs backend vs full-stack).' },
  { icon: BookOpen, title: 'Mastering the Technical Interview', desc: 'Step-by-step breakdown of coding rounds, system design, and algorithmic problem-solving strategies.' },
  { icon: MessageSquare, title: 'Negotiating Tech Salaries', desc: 'How to handle stock options, equity packages, performance bonuses, and negotiate higher base salaries.' },
  { icon: Award, title: 'Building a Strong Portfolio', desc: 'Learn how to showcase GitHub projects, write clean readme documentation, and stand out to technical recruiters.' }
]

export default function CareerGuidePage() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-6">
            Career Guide
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Elevate Your <span className="gradient-text">Tech Career</span></h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Expert guides, curated advice, and strategic checklists to help you land interviews, ace system design, and increase your compensation.</p>
        </div>

        <div className="grid gap-6">
          {GUIDES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <button className="text-xs text-cyan-400 font-semibold hover:underline">Read Article →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
