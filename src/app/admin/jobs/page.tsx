'use client'
// src/app/admin/jobs/page.tsx
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Search, Edit2, Trash2, Eye, Star, ToggleLeft, ToggleRight, Filter } from 'lucide-react'
import Link from 'next/link'
import { jobsService } from '@/firebase/collections'

const DEMO = [
  { id: '1', title: 'Senior React Developer', company: 'Google', location: 'Remote', jobType: 'remote', isActive: true, isFeatured: true, views: 1240, applications: 89, createdAt: '2024-01-15' },
  { id: '2', title: 'Product Manager', company: 'Flipkart', location: 'Bangalore', jobType: 'full-time', isActive: true, isFeatured: false, views: 890, applications: 45, createdAt: '2024-01-14' },
  { id: '3', title: 'UI/UX Designer', company: 'Swiggy', location: 'Mumbai', jobType: 'full-time', isActive: false, isFeatured: false, views: 670, applications: 32, createdAt: '2024-01-13' },
  { id: '4', title: 'Data Scientist', company: 'Zepto', location: 'Hyderabad', jobType: 'remote', isActive: true, isFeatured: true, views: 1120, applications: 67, createdAt: '2024-01-12' },
  { id: '5', title: 'DevOps Engineer', company: 'Razorpay', location: 'Bangalore', jobType: 'full-time', isActive: true, isFeatured: false, views: 534, applications: 21, createdAt: '2024-01-11' },
]

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState(DEMO)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'active' && j.isActive) || (filter === 'inactive' && !j.isActive) || (filter === 'featured' && j.isFeatured)
    return matchSearch && matchFilter
  })

  const toggleActive = (id: string) => setJobs(prev => prev.map(j => j.id === id ? { ...j, isActive: !j.isActive } : j))
  const toggleFeatured = (id: string) => setJobs(prev => prev.map(j => j.id === id ? { ...j, isFeatured: !j.isFeatured } : j))
  const deleteJob = (id: string) => { if (confirm('Delete this job?')) setJobs(prev => prev.filter(j => j.id !== id)) }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Jobs</h1>
          <p className="text-sm text-muted-foreground">{jobs.length} total jobs</p>
        </div>
        <Link href="/admin/jobs/new" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" /> Add Job
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'featured'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs rounded-xl capitalize transition-all ${filter === f ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border/50">
              <tr className="text-xs text-muted-foreground">
                <th className="text-left px-6 py-4 font-medium">Job</th>
                <th className="text-left px-4 py-4 font-medium">Type</th>
                <th className="text-right px-4 py-4 font-medium">Views</th>
                <th className="text-right px-4 py-4 font-medium">Applied</th>
                <th className="text-center px-4 py-4 font-medium">Featured</th>
                <th className="text-center px-4 py-4 font-medium">Active</th>
                <th className="text-right px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{job.company} · {job.location}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-muted capitalize">{job.jobType}</span>
                  </td>
                  <td className="px-4 py-4 text-right text-muted-foreground">{job.views.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-muted-foreground">{job.applications}</td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleFeatured(job.id)} className={`transition-colors ${job.isFeatured ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}>
                      <Star className="w-4 h-4 mx-auto" fill={job.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleActive(job.id)} className={`transition-colors ${job.isActive ? 'text-green-400' : 'text-muted-foreground'}`}>
                      {job.isActive ? <ToggleRight className="w-6 h-6 mx-auto" /> : <ToggleLeft className="w-6 h-6 mx-auto" />}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/jobs/${job.id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all" title="View"><Eye className="w-4 h-4" /></Link>
                      <Link href={`/admin/jobs/${job.id}/edit`} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-all" title="Edit"><Edit2 className="w-4 h-4" /></Link>
                      <button onClick={() => deleteJob(job.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-3xl mb-3">📋</div>
              <p className="font-medium">No jobs found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
