'use client'
// src/components/home/HeroSection.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Sparkles, TrendingUp, ArrowRight } from 'lucide-react'

const TRENDING = ['React Developer', 'Data Scientist', 'Product Manager', 'UI/UX Designer', 'DevOps Engineer']

export default function HeroSection() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('location', location)
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden grid-pattern">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>Over 50,000+ jobs posted this month</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-800 leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Find Your <span className="gradient-text neon-text">Dream Job</span>
            <br />in India
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Search millions of jobs from top companies. Filter by role, location, skill, or salary — and apply in under 60 seconds.
          </p>

          {/* Search Box */}
          <div className="glass-card p-2 rounded-2xl max-w-3xl mx-auto animate-fade-up gradient-border" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background/60">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skill, or company..."
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/60 sm:w-52">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City or Remote"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center gap-2 justify-center"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Trending Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" /> Trending:
            </span>
            {TRENDING.map(term => (
              <button
                key={term}
                onClick={() => { setKeyword(term); router.push(`/jobs?q=${term}`) }}
                className="px-3 py-1 text-xs rounded-full glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-cyan-500/30 transition-all"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Trusted By Industry Leaders */}
          <div className="mt-20 border-t border-border/20 pt-10 animate-fade-up hidden sm:block" style={{ animationDelay: '0.5s' }}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Trusted by Industry Leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 hover:opacity-75 transition-opacity duration-300">
              <span className="font-display font-bold text-sm sm:text-base tracking-widest text-muted-foreground">GOOGLE</span>
              <span className="font-display font-bold text-sm sm:text-base tracking-widest text-muted-foreground">MICROSOFT</span>
              <span className="font-display font-bold text-sm sm:text-base tracking-widest text-muted-foreground">AMAZON</span>
              <span className="font-display font-bold text-sm sm:text-base tracking-widest text-muted-foreground">FLIPKART</span>
              <span className="font-display font-bold text-sm sm:text-base tracking-widest text-muted-foreground">SWIGGY</span>
            </div>
          </div>
        </div>

        {/* Floating Job Cards */}
        <div className="hidden lg:block">
          <div className="absolute left-4 top-1/3 glass-card p-4 rounded-xl w-56 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">🏢</div>
              <div>
                <div className="text-xs font-semibold">React Developer</div>
                <div className="text-xs text-muted-foreground">Google · Remote</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-cyan-400 font-medium">₹18–25 LPA</span>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
          </div>
          <div className="absolute right-4 top-1/4 glass-card p-4 rounded-xl w-56 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center text-lg">🚀</div>
              <div>
                <div className="text-xs font-semibold">Product Manager</div>
                <div className="text-xs text-muted-foreground">Flipkart · Bangalore</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-cyan-400 font-medium">₹25–35 LPA</span>
              <span className="text-xs text-muted-foreground">5h ago</span>
            </div>
          </div>
          <div className="absolute right-12 bottom-1/3 glass-card p-4 rounded-xl w-56 animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center text-lg">💡</div>
              <div>
                <div className="text-xs font-semibold">Data Scientist</div>
                <div className="text-xs text-muted-foreground">Swiggy · Hyderabad</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-cyan-400 font-medium">₹20–30 LPA</span>
              <span className="text-xs text-muted-foreground">1d ago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
