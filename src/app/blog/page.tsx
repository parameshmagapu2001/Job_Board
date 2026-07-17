'use client'
import UserLayout from '@/components/layout/UserLayout'
import Link from 'next/link'
import { Calendar, Eye, ArrowRight, Search, Tag } from 'lucide-react'
import { useState } from 'react'

const BLOGS = [
  { id: '1', title: 'Top 10 React Interview Questions for 2024', slug: 'top-react-interview-questions-2024', excerpt: 'Master these React concepts before your next frontend interview. Hooks, context, performance optimization and more.', category: 'Interview Tips', views: 4520, author: 'Team', date: 'Jan 15, 2024', thumbnail: '⚛️', readTime: '8 min' },
  { id: '2', title: 'How to Write a Winning Resume for IT Jobs', slug: 'it-resume-writing-guide', excerpt: 'A step-by-step guide to crafting a resume that gets past ATS systems and impresses hiring managers at top tech companies.', category: 'Resume Tips', views: 3210, author: ' Team', date: 'Jan 12, 2024', thumbnail: '📄', readTime: '6 min' },
  { id: '3', title: 'Highest Paying Tech Jobs in Hyderabad 2024', slug: 'highest-paying-tech-jobs-hyderabad', excerpt: 'Discover which roles command the highest salaries in Hyderabad\'s booming tech ecosystem — and how to land them.', category: 'Salary Guide', views: 5670, author: ' Team', date: 'Jan 10, 2024', thumbnail: '💰', readTime: '5 min' },
  { id: '4', title: 'Remote Work in India: Complete Guide 2024', slug: 'remote-work-india-guide-2024', excerpt: 'Everything you need to know about working remotely in India — tools, taxes, productivity, and finding remote-friendly employers.', category: 'Career Guide', views: 2890, author: ' Team', date: 'Jan 8, 2024', thumbnail: '🌐', readTime: '10 min' },
  { id: '5', title: 'System Design Interview Prep: Beginner to Advanced', slug: 'system-design-interview-prep', excerpt: 'Learn how to ace system design rounds at FAANG and top Indian startups. Real examples, diagrams, and frameworks.', category: 'Interview Tips', views: 6340, author: 'Team', date: 'Jan 5, 2024', thumbnail: '🏗️', readTime: '15 min' },
  { id: '6', title: 'From College to Crores: A Fresher\'s Roadmap', slug: 'fresher-career-roadmap', excerpt: 'A practical roadmap for fresh graduates to land their first tech job, negotiate salary, and grow to senior roles.', category: 'Career Guide', views: 7120, author: ' Team', date: 'Jan 2, 2024', thumbnail: '🚀', readTime: '12 min' },
]

const CATEGORIES = ['All', 'Interview Tips', 'Resume Tips', 'Salary Guide', 'Career Guide']

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = BLOGS.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'All' || b.category === cat
    return matchSearch && matchCat
  })
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Career <span className="gradient-text">Blog</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Tips, guides, and insights to supercharge your job search and career growth.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 glass-card rounded-xl">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-sm transition-all ${cat === c ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'glass-card text-muted-foreground hover:text-foreground'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(blog => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="glass-card rounded-2xl overflow-hidden hover:neon-border transition-all duration-300 group">
              <div className="h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-6xl">{blog.thumbnail}</div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1"><Tag className="w-3 h-3" />{blog.category}</span>
                  <span className="text-xs text-muted-foreground">{blog.readTime} read</span>
                </div>
                <h2 className="font-semibold text-sm leading-snug mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">{blog.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.date}</div>
                  <div className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views.toLocaleString()}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-4xl mb-4">📝</div>
            <p className="font-semibold">No articles found</p>
          </div>
        )}
      </div>
    </UserLayout>
  )
}
