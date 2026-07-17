'use client'
// src/app/admin/users/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Search, Shield, User, Mail, Calendar, MoreVertical } from 'lucide-react'

const DEMO_USERS = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'user', joined: '2024-01-10', applications: 12, saved: 45 },
  { id: '2', name: 'Priya Nair', email: 'priya@example.com', role: 'employer', joined: '2024-01-08', applications: 0, saved: 0 },
  { id: '3', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'admin', joined: '2023-12-01', applications: 3, saved: 8 },
  { id: '4', name: 'Sneha Reddy', email: 'sneha@example.com', role: 'user', joined: '2024-01-12', applications: 6, saved: 23 },
  { id: '5', name: 'Kiran Kumar', email: 'kiran@example.com', role: 'user', joined: '2024-01-15', applications: 2, saved: 11 },
  { id: '6', name: 'Ananya Singh', email: 'ananya@example.com', role: 'employer', joined: '2024-01-07', applications: 0, saved: 0 },
]

const ROLE_COLORS: Record<string, string> = {
  admin: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  employer: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  user: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState(DEMO_USERS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || u.role === filter
    return matchSearch && matchFilter
  })

  const changeRole = (id: string, role: string) => setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Users</h1>
        <p className="text-sm text-muted-foreground">{users.length} registered users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Job Seekers', count: users.filter(u => u.role === 'user').length, icon: User, color: 'text-cyan-400 bg-cyan-500/10' },
          { label: 'Employers', count: users.filter(u => u.role === 'employer').length, icon: Shield, color: 'text-purple-400 bg-purple-500/10' },
          { label: 'Admins', count: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-amber-400 bg-amber-500/10' },
        ].map(({ label, count, icon: Icon, color }) => (
          <div key={label} className="glass-card rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${color.split(' ')[1]} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color.split(' ')[0]}`} />
            </div>
            <div>
              <div className="font-bold text-xl">{count}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          {['all','user','employer','admin'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs rounded-xl capitalize transition-all ${filter === f ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
          <thead className="border-b border-border/50">
            <tr className="text-xs text-muted-foreground">
              <th className="text-left px-6 py-4 font-medium">User</th>
              <th className="text-left px-4 py-4 font-medium">Role</th>
              <th className="text-right px-4 py-4 font-medium">Applications</th>
              <th className="text-right px-4 py-4 font-medium">Saved Jobs</th>
              <th className="text-right px-4 py-4 font-medium">Joined</th>
              <th className="text-right px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 flex items-center justify-center text-xs font-bold">
                      {user.name[0]}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <select value={user.role} onChange={e => changeRole(user.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs border capitalize bg-transparent cursor-pointer ${ROLE_COLORS[user.role]}`}>
                    <option value="user">user</option>
                    <option value="employer">employer</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-4 py-4 text-right text-muted-foreground">{user.applications}</td>
                <td className="px-4 py-4 text-right text-muted-foreground">{user.saved}</td>
                <td className="px-4 py-4 text-right text-xs text-muted-foreground">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"><MoreVertical className="w-4 h-4" /></button>
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
