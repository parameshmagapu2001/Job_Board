'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { useState } from 'react'
import { Star, GripVertical, X, Plus, Search } from 'lucide-react'

const ALL_JOBS = [
  { id: '1', title: 'Senior React Developer', company: 'Google', location: 'Remote', isFeatured: true },
  { id: '2', title: 'Product Manager', company: 'Flipkart', location: 'Bangalore', isFeatured: true },
  { id: '3', title: 'Data Scientist', company: 'Zepto', location: 'Hyderabad', isFeatured: true },
  { id: '4', title: 'UI/UX Designer', company: 'Swiggy', location: 'Mumbai', isFeatured: false },
  { id: '5', title: 'DevOps Engineer', company: 'Razorpay', location: 'Bangalore', isFeatured: false },
  { id: '6', title: 'Backend Engineer', company: 'CRED', location: 'Bangalore', isFeatured: false },
]

export default function AdminFeaturedPage() {
  const [jobs, setJobs] = useState(ALL_JOBS)
  const [search, setSearch] = useState('')
  const featured = jobs.filter(j => j.isFeatured)
  const available = jobs.filter(j => !j.isFeatured && (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())))
  const toggleFeatured = (id: string) => setJobs(p => p.map(j => j.id === id ? { ...j, isFeatured: !j.isFeatured } : j))

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Featured Jobs</h1>
        <p className="text-sm text-muted-foreground">Manage which jobs appear in the featured section on the homepage.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5"><Star className="w-5 h-5 text-amber-400" /><h2 className="font-semibold">Currently Featured ({featured.length})</h2></div>
          {featured.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground"><Star className="w-8 h-8 mx-auto mb-3 opacity-30" /><p className="text-sm">No featured jobs yet</p></div>
          ) : (
            <div className="space-y-3">
              {featured.map(job => (
                <div key={job.id} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{job.title}</div>
                    <div className="text-xs text-muted-foreground">{job.company} · {job.location}</div>
                  </div>
                  <button onClick={() => toggleFeatured(job.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Add to Featured</h2>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {available.map(job => (
              <div key={job.id} className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{job.title}</div>
                  <div className="text-xs text-muted-foreground">{job.company} · {job.location}</div>
                </div>
                <button onClick={() => toggleFeatured(job.id)} className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"><Plus className="w-4 h-4" /></button>
              </div>
            ))}
            {available.length === 0 && <p className="text-xs text-muted-foreground text-center py-6">No more jobs to feature</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
