'use client'
// src/app/admin/applications/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Search, FileText, Mail, Phone, Download } from 'lucide-react'

const DEMO = [
  { id: '1', jobTitle: 'Senior React Developer', company: 'Google', userName: 'Rahul Sharma', userEmail: 'rahul@example.com', phone: '+91 98765 43210', status: 'pending', appliedAt: '2024-01-15' },
  { id: '2', jobTitle: 'Product Manager', company: 'Flipkart', userName: 'Priya Nair', userEmail: 'priya@example.com', phone: '+91 87654 32109', status: 'shortlisted', appliedAt: '2024-01-14' },
  { id: '3', jobTitle: 'Data Scientist', company: 'Zepto', userName: 'Arjun Mehta', userEmail: 'arjun@example.com', phone: '+91 76543 21098', status: 'reviewing', appliedAt: '2024-01-13' },
  { id: '4', jobTitle: 'UI/UX Designer', company: 'Swiggy', userName: 'Sneha Reddy', userEmail: 'sneha@example.com', phone: '+91 65432 10987', status: 'rejected', appliedAt: '2024-01-12' },
  { id: '5', jobTitle: 'DevOps Engineer', company: 'Razorpay', userName: 'Kiran Kumar', userEmail: 'kiran@example.com', phone: '+91 54321 09876', status: 'hired', appliedAt: '2024-01-11' },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  reviewing: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  shortlisted: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  rejected: 'text-red-400 bg-red-500/10 border-red-500/20',
  hired: 'text-green-400 bg-green-500/10 border-green-500/20',
}

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState(DEMO)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = apps.filter(a => {
    const matchSearch = a.userName.toLowerCase().includes(search.toLowerCase()) || a.jobTitle.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || a.status === filter
    return matchSearch && matchFilter
  })

  const changeStatus = (id: string, status: string) => setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Applications</h1>
        <p className="text-sm text-muted-foreground">{apps.length} total applications</p>
      </div>

      {/* Status counts */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['all', 'pending', 'reviewing', 'shortlisted', 'hired', 'rejected'].map(s => {
          const count = s === 'all' ? apps.length : apps.filter(a => a.status === s).length
          return (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all flex items-center gap-2 ${filter === s ? `border ${STATUS_COLORS[s] || 'bg-muted text-foreground border-border'}` : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
              {s} <span className="font-bold">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="glass-card rounded-2xl p-4 mb-6 flex items-center gap-2 px-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or job..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {filtered.map(app => (
          <div key={app.id} className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-sm">{app.userName}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Applied for <span className="text-foreground">{app.jobTitle}</span> at {app.company}</div>
                </div>
                <select value={app.status} onChange={e => changeStatus(app.id, e.target.value)}
                  className={`px-3 py-1 text-xs rounded-full border cursor-pointer bg-transparent capitalize ${STATUS_COLORS[app.status]}`}>
                  {['pending','reviewing','shortlisted','rejected','hired'].map(s => <option key={s} value={s} className="bg-background">{s}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <a href={`mailto:${app.userEmail}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors"><Mail className="w-3 h-3" />{app.userEmail}</a>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="w-3 h-3" />{app.phone}</span>
                <span className="text-xs text-muted-foreground">Applied {app.appliedAt}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-muted hover:bg-muted/80 transition-all">
                <FileText className="w-3 h-3" /> Resume
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all">
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
