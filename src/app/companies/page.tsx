'use client'
import UserLayout from '@/components/layout/UserLayout'
import { useState } from 'react'
import Link from 'next/link'
import { Search, CheckCircle, Briefcase, MapPin } from 'lucide-react'

const COMPANIES = [
  { id: '1', name: 'Google', logo: '🔍', industry: 'Technology', size: '10,000+', location: 'Hyderabad', jobCount: 24, isVerified: true, rating: 4.8 },
  { id: '2', name: 'Microsoft', logo: '🪟', industry: 'Technology', size: '10,000+', location: 'Hyderabad', jobCount: 18, isVerified: true, rating: 4.7 },
  { id: '3', name: 'Amazon', logo: '📦', industry: 'E-commerce', size: '10,000+', location: 'Bangalore', jobCount: 31, isVerified: true, rating: 4.5 },
  { id: '4', name: 'Flipkart', logo: '🛒', industry: 'E-commerce', size: '5,000–10,000', location: 'Bangalore', jobCount: 16, isVerified: true, rating: 4.4 },
  { id: '5', name: 'Swiggy', logo: '🍔', industry: 'Food Tech', size: '1,000–5,000', location: 'Bangalore', jobCount: 11, isVerified: true, rating: 4.2 },
  { id: '6', name: 'Zepto', logo: '⚡', industry: 'Quick Commerce', size: '500–1,000', location: 'Mumbai', jobCount: 8, isVerified: false, rating: 4.0 },
  { id: '7', name: 'Razorpay', logo: '💳', industry: 'Fintech', size: '1,000–5,000', location: 'Bangalore', jobCount: 15, isVerified: true, rating: 4.6 },
  { id: '8', name: 'CRED', logo: '💰', industry: 'Fintech', size: '500–1,000', location: 'Bangalore', jobCount: 9, isVerified: true, rating: 4.3 },
  { id: '9', name: 'PhonePe', logo: '📱', industry: 'Fintech', size: '1,000–5,000', location: 'Bangalore', jobCount: 12, isVerified: true, rating: 4.4 },
  { id: '10', name: 'Ola', logo: '🚗', industry: 'Mobility', size: '5,000–10,000', location: 'Bangalore', jobCount: 7, isVerified: true, rating: 4.1 },
  { id: '11', name: 'Zomato', logo: '🍕', industry: 'Food Tech', size: '5,000–10,000', location: 'Delhi', jobCount: 14, isVerified: true, rating: 4.3 },
  { id: '12', name: 'Meesho', logo: '👗', industry: 'Social Commerce', size: '1,000–5,000', location: 'Bangalore', jobCount: 10, isVerified: false, rating: 4.0 },
]

const INDUSTRIES = ['All', 'Technology', 'E-commerce', 'Fintech', 'Food Tech', 'Mobility']

export default function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const filtered = COMPANIES.filter(c => {
    const matchS = c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())
    const matchI = industry === 'All' || c.industry === industry
    return matchS && matchI
  })
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Top <span className="gradient-text">Companies</span> Hiring</h1>
          <p className="text-muted-foreground">Explore India's most innovative companies and find your dream workplace.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 glass-card rounded-xl">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {INDUSTRIES.map(i => (
              <button key={i} onClick={() => setIndustry(i)} className={`px-4 py-2 rounded-xl text-sm transition-all ${industry === i ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'glass-card text-muted-foreground hover:text-foreground'}`}>{i}</button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(company => (
            <Link key={company.id} href={`/company/${company.id}`} className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-300 group text-center">
              <div className="text-5xl mb-4">{company.logo}</div>
              <h3 className="font-semibold mb-1 flex items-center justify-center gap-1 group-hover:text-cyan-400 transition-colors">
                {company.name}
                {company.isVerified && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
              </h3>
              <p className="text-xs text-muted-foreground mb-1">{company.industry}</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-xs font-medium">{company.rating}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{company.location}</div>
                <div className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{company.jobCount} jobs</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
