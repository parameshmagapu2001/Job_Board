'use client'
// src/app/admin/companies/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit2, Trash2, Search, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const DEMO = [
  { id: '1', name: 'Google', industry: 'Technology', size: '10000+', jobCount: 24, isVerified: true, location: 'Hyderabad' },
  { id: '2', name: 'Flipkart', industry: 'E-commerce', size: '5000-10000', jobCount: 18, isVerified: true, location: 'Bangalore' },
  { id: '3', name: 'Swiggy', industry: 'Food Tech', size: '1000-5000', jobCount: 11, isVerified: true, location: 'Bangalore' },
  { id: '4', name: 'Zepto', industry: 'Quick Commerce', size: '500-1000', jobCount: 8, isVerified: false, location: 'Mumbai' },
  { id: '5', name: 'Razorpay', industry: 'Fintech', size: '1000-5000', jobCount: 15, isVerified: true, location: 'Bangalore' },
]

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(DEMO)
  const [search, setSearch] = useState('')

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()))
  const toggleVerify = (id: string) => setCompanies(prev => prev.map(c => c.id === id ? { ...c, isVerified: !c.isVerified } : c))
  const del = (id: string) => { if (confirm('Delete company?')) setCompanies(prev => prev.filter(c => c.id !== id)) }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Companies</h1>
          <p className="text-sm text-muted-foreground">{companies.length} companies</p>
        </div>
        <Link href="/admin/companies/new" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" /> Add Company
        </Link>
      </div>

      <div className="glass-card rounded-2xl p-4 mb-6 flex items-center gap-2 px-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(company => (
          <div key={company.id} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center font-bold text-lg">{company.name[0]}</div>
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">
                    {company.name}
                    {company.isVerified && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div className="text-xs text-muted-foreground">{company.industry}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleVerify(company.id)} className={`p-1.5 rounded-lg transition-all ${company.isVerified ? 'text-cyan-400 hover:bg-cyan-500/10' : 'text-muted-foreground hover:bg-white/5'}`} title={company.isVerified ? 'Unverify' : 'Verify'}>
                  {company.isVerified ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-all"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => del(company.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[['Jobs', company.jobCount], ['Size', company.size.replace('-', '–')], ['City', company.location]].map(([label, value]) => (
                <div key={label} className="bg-muted/50 rounded-xl p-2">
                  <div className="text-xs font-semibold">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
