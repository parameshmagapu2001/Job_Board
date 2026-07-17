'use client'
// src/app/admin/analytics/page.tsx
import AdminLayout from '@/components/admin/AdminLayout'
import { TrendingUp, Users, Eye, Briefcase, MapPin, Tag } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

import { MONTHLY_DATA, TOP_CATEGORIES, TOP_CITIES } from '@/data/adminData'

const COLORS = ['#06b6d4', '#818cf8', '#34d399', '#f59e0b', '#f87171']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs border border-border/50">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any) => <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</p>)}
      </div>
    )
  }
  return null
}

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground">Platform performance overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Monthly Active Users', value: '48,291', change: '+8.2%', icon: Users, color: 'text-purple-400 bg-purple-500/10' },
          { label: 'Page Views', value: '284K', change: '+23%', icon: Eye, color: 'text-cyan-400 bg-cyan-500/10' },
          { label: 'Jobs Posted', value: '1,248', change: '+12%', icon: Briefcase, color: 'text-blue-400 bg-blue-500/10' },
          { label: 'Applications', value: '9,640', change: '+18%', icon: TrendingUp, color: 'text-green-400 bg-green-500/10' },
        ].map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${color.split(' ')[1]} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color.split(' ')[0]}`} />
              </div>
              <span className="text-xs text-green-400 font-medium">{change}</span>
            </div>
            <div className="font-display text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Growth Chart */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="font-semibold mb-6">Platform Growth (6 Months)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={MONTHLY_DATA}>
            <defs>
              {[['users','#818cf8'],['jobs','#06b6d4'],['applications','#34d399']].map(([key, color]) => (
                <linearGradient key={key} id={key} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="users" stroke="#818cf8" strokeWidth={2} fill="url(#users)" name="Users" />
            <Area type="monotone" dataKey="jobs" stroke="#06b6d4" strokeWidth={2} fill="url(#jobs)" name="Jobs" />
            <Area type="monotone" dataKey="applications" stroke="#34d399" strokeWidth={2} fill="url(#applications)" name="Applications" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-6 flex items-center gap-2"><Tag className="w-4 h-4 text-cyan-400" /> Top Categories</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TOP_CATEGORIES} layout="vertical">
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="jobs" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* City Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-6 flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400" /> Jobs by City</h2>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={TOP_CITIES} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {TOP_CITIES.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {TOP_CITIES.map((city, i) => (
                <div key={city.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-muted-foreground">{city.name}</span>
                  </div>
                  <span className="font-medium">{city.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
