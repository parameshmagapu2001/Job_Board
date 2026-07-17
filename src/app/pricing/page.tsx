import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { Check, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing Plans | JobBoard',
  description: 'Choose a plan that fits your startup or corporate hiring needs. Get your tech job postings in front of thousands of developers.',
}

const PLANS = [
  { name: 'Standard', price: 'Free', period: 'forever', desc: 'Best for standard job posting needs for single hire requirements.', features: ['1 active job posting', '30 days duration', 'Basic applicant management', 'Email alerts', 'Standard search listing'], popular: false },
  { name: 'Professional', price: '₹4,999', period: 'month', desc: 'Best for growing startups requiring continuous hiring Pipelines.', features: ['5 active job postings', 'Featured tags & custom badges', 'Priority search listing', 'Advanced applicant filtering', 'Social media promotion', 'Resume database access'], popular: true },
  { name: 'Enterprise', price: '₹14,999', period: 'month', desc: 'Custom hiring setups for larger teams and premium verification.', features: ['Unlimited active job postings', 'Featured branding (Homepage spotlight)', 'Custom recruiter API access', 'Dedicated account manager', 'AI-assisted applicant ranking', 'Custom contracts & invoicing'], popular: false }
]

export default function PricingPage() {
  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-6">
            Simple Pricing
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Post Jobs, Find <span className="gradient-text">Top Talent</span></h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Choose a plan that fits your business needs. Get your job postings in front of thousands of active tech professionals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`glass-card rounded-3xl p-8 relative flex flex-col ${plan.popular ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/10' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-xs font-bold text-white rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h2 className="font-display text-2xl font-bold mb-2 text-foreground">{plan.name}</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed min-h-[40px]">{plan.desc}</p>
              <div className="flex items-baseline mb-6 gap-1">
                <span className="font-display text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">/{plan.period}</span>}
              </div>

              <hr className="border-border mb-6" />

              <ul className="space-y-4 flex-1 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="text-xs text-muted-foreground flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" /> {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90' : 'bg-muted hover:bg-white/5 border border-border text-foreground'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 border-cyan-500/20">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-2xl flex-shrink-0">💬</div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display text-lg font-bold mb-1">Need a custom enterprise agreement?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">If you post more than 20 jobs monthly or need custom integrations, get in touch with our partnerships team for tailored plans.</p>
          </div>
          <a href="/contact" className="px-6 py-3 bg-muted border border-border hover:bg-white/5 transition-all text-sm font-semibold rounded-xl whitespace-nowrap">
            Contact Sales
          </a>
        </div>
      </div>
    </UserLayout>
  )
}
