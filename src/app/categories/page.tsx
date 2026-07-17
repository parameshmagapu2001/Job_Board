'use client'
import UserLayout from '@/components/layout/UserLayout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  { name: 'Software Engineering', icon: '💻', count: 12400, slug: 'software-engineering', color: 'from-blue-500/20 to-cyan-500/20', desc: 'Web, mobile, backend, and full-stack development roles.' },
  { name: 'Data & Analytics', icon: '📊', count: 4200, slug: 'data-analytics', color: 'from-purple-500/20 to-pink-500/20', desc: 'Data science, ML, BI, and analytics positions.' },
  { name: 'Design & UX', icon: '🎨', count: 3100, slug: 'design-ux', color: 'from-pink-500/20 to-orange-500/20', desc: 'UI/UX, product design, and visual design roles.' },
  { name: 'Product Management', icon: '🚀', count: 2800, slug: 'product-management', color: 'from-orange-500/20 to-yellow-500/20', desc: 'Product strategy, roadmap, and ownership roles.' },
  { name: 'Marketing', icon: '📣', count: 5600, slug: 'marketing', color: 'from-green-500/20 to-teal-500/20', desc: 'Digital marketing, SEO, growth, and brand roles.' },
  { name: 'Finance & Accounting', icon: '💰', count: 3900, slug: 'finance', color: 'from-yellow-500/20 to-amber-500/20', desc: 'CA, finance analyst, accounting, and investment roles.' },
  { name: 'Sales & BD', icon: '🤝', count: 6200, slug: 'sales', color: 'from-red-500/20 to-pink-500/20', desc: 'B2B, B2C sales, business development, and partnerships.' },
  { name: 'DevOps & Cloud', icon: '☁️', count: 2400, slug: 'devops-cloud', color: 'from-cyan-500/20 to-blue-500/20', desc: 'AWS, GCP, Azure, Kubernetes, and CI/CD roles.' },
  { name: 'Human Resources', icon: '👥', count: 2100, slug: 'hr', color: 'from-indigo-500/20 to-purple-500/20', desc: 'Talent acquisition, HR business partner, and L&D roles.' },
  { name: 'Operations', icon: '⚙️', count: 3300, slug: 'operations', color: 'from-slate-500/20 to-gray-500/20', desc: 'Supply chain, logistics, and business operations.' },
  { name: 'Customer Success', icon: '⭐', count: 1900, slug: 'customer-success', color: 'from-amber-500/20 to-orange-500/20', desc: 'Customer support, success, and onboarding roles.' },
  { name: 'Legal & Compliance', icon: '⚖️', count: 890, slug: 'legal', color: 'from-teal-500/20 to-green-500/20', desc: 'Corporate law, compliance, and regulatory roles.' },
]

export default function CategoriesPage() {
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Browse by <span className="gradient-text">Category</span></h1>
          <p className="text-muted-foreground">Find your perfect role across every industry and function.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.slug} href={`/jobs?category=${cat.slug}`} className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-300 group" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>{cat.icon}</div>
              <h3 className="font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-cyan-400">{cat.count.toLocaleString()} jobs</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
