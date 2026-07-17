'use client'
// src/app/admin/page.tsx
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Briefcase, Users, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, Building2, FileText, Star, Activity } from 'lucide-react'
import { jobsService, applicationsService } from '@/firebase/collections'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

import { TRAFFIC_DATA, RECENT_JOBS, STATS } from '@/data/adminData'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, change, up, icon, color, bg }) => {
          const ICON_MAP = { Briefcase, Users, Eye, FileText }
          const Icon = ICON_MAP[icon as keyof typeof ICON_MAP] || Briefcase
          return (
            <div key={label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
                  {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{change}
                </span>
              </div>
              <div className="font-display text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Traffic & Applications</h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={TRAFFIC_DATA}>
              <defs>
                <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="apps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="views" stroke="#06b6d4" strokeWidth={2} fill="url(#views)" name="Views" />
              <Area type="monotone" dataKey="applications" stroke="#818cf8" strokeWidth={2} fill="url(#apps)" name="Applications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Add New Job', href: '/admin/jobs/new', icon: Briefcase, color: 'text-blue-400 bg-blue-500/10' },
              { label: 'Add Company', href: '/admin/companies/new', icon: Building2, color: 'text-purple-400 bg-purple-500/10' },
              { label: 'New Blog Post', href: '/admin/blogs/new', icon: FileText, color: 'text-green-400 bg-green-500/10' },
              { label: 'Send Notification', href: '/admin/notifications/new', icon: Activity, color: 'text-amber-400 bg-amber-500/10' },
              { label: 'Manage Featured', href: '/admin/featured', icon: Star, color: 'text-cyan-400 bg-cyan-500/10' },
            ].map(({ label, href, icon: Icon, color }) => (
              <a key={href} href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className={`w-8 h-8 rounded-lg ${color.split(' ')[1]} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color.split(' ')[0]}`} />
                </div>
                <span className="text-sm font-medium group-hover:text-cyan-400 transition-colors">{label}</span>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-cyan-400 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Jobs Table */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold">Recent Jobs</h2>
          <a href="/admin/jobs" className="text-xs text-cyan-400 hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border/50">
                <th className="text-left pb-3 font-medium">Job Title</th>
                <th className="text-left pb-3 font-medium">Company</th>
                <th className="text-right pb-3 font-medium">Views</th>
                <th className="text-right pb-3 font-medium">Applied</th>
                <th className="text-right pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {RECENT_JOBS.map((job, i) => (
                <tr key={i} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 font-medium">{job.title}</td>
                  <td className="py-3 text-muted-foreground">{job.company}</td>
                  <td className="py-3 text-right text-muted-foreground">{job.views.toLocaleString()}</td>
                  <td className="py-3 text-right text-muted-foreground">{job.applications}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${job.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
