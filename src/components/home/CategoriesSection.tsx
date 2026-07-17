'use client'
// src/components/home/CategoriesSection.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  { name: 'Software Engineering', icon: '💻', count: 400, slug: 'software-engineering', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Data & Analytics', icon: '📊', count: 200, slug: 'data-analytics', color: 'from-purple-500/20 to-pink-500/20' },
  { name: 'Design & UX', icon: '🎨', count: 100, slug: 'design-ux', color: 'from-pink-500/20 to-orange-500/20' },
  { name: 'Product Management', icon: '🚀', count: 200, slug: 'product-management', color: 'from-orange-500/20 to-yellow-500/20' },
  { name: 'Marketing', icon: '📣', count: 600, slug: 'marketing', color: 'from-green-500/20 to-teal-500/20' },
  { name: 'Finance & Accounting', icon: '💰', count: 900, slug: 'finance', color: 'from-yellow-500/20 to-amber-500/20' },
  { name: 'Sales & BD', icon: '🤝', count: 200, slug: 'sales', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'DevOps & Cloud', icon: '☁️', count: 400, slug: 'devops-cloud', color: 'from-cyan-500/20 to-blue-500/20' },
]

export default function CategoriesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-2">Browse by Category</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Explore <span className="gradient-text">Career Paths</span></h2>
          </div>
          <Link href="/categories" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            All categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.slug} href={`/jobs?category=${cat.slug}`}
              className="glass-card p-5 rounded-2xl hover:neon-border transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.count.toLocaleString()} jobs</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
