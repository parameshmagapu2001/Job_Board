'use client'
// src/app/admin/notifications/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Bell, Send, Plus, CheckCircle, Clock, Users, Trash2 } from 'lucide-react'
import { notificationsService } from '@/firebase/collections'

import { DEMO_NOTIFS } from '@/data/adminData'

export default function AdminNotificationsPage() {
  const [notifs, setNotifs] = useState(DEMO_NOTIFS)
  const [showForm, setShowForm] = useState(false)
  const [sending, setSending] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', body: '', type: 'job_alert', targetAudience: 'all', linkUrl: '' })

  const handleCreate = async () => {
    if (!form.title || !form.body) return
    const id = Date.now().toString()
    setNotifs(prev => [...prev, { id, ...form, sent: false, sentAt: null }])
    setForm({ title: '', body: '', type: 'job_alert', targetAudience: 'all', linkUrl: '' })
    setShowForm(false)
  }

  const handleSend = async (id: string) => {
    setSending(id)
    await new Promise(r => setTimeout(r, 1500))
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, sent: true, sentAt: new Date().toISOString().slice(0,16).replace('T',' ') } : n))
    setSending(null)
  }

  const del = (id: string) => { if (confirm('Delete?')) setNotifs(prev => prev.filter(n => n.id !== id)) }

  const TYPE_COLORS: Record<string, string> = {
    job_alert: 'text-cyan-400 bg-cyan-500/10',
    promotional: 'text-purple-400 bg-purple-500/10',
    system: 'text-amber-400 bg-amber-500/10',
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Push Notifications</h1>
          <p className="text-sm text-muted-foreground">Send alerts to your users</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" /> New Notification
        </button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4">Compose Notification</h2>
          <div className="space-y-4">
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm" placeholder="Notification title..." />
            <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm resize-none" placeholder="Message body..." />
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm">
                  <option value="job_alert">Job Alert</option>
                  <option value="promotional">Promotional</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Target Audience</label>
                <select value={form.targetAudience} onChange={e => setForm(p => ({ ...p, targetAudience: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm">
                  <option value="all">All Users</option>
                  <option value="users">Job Seekers Only</option>
                  <option value="employers">Employers Only</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Link URL (optional)</label>
                <input type="url" value={form.linkUrl} onChange={e => setForm(p => ({ ...p, linkUrl: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm" placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
                <Bell className="w-4 h-4" /> Create
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-muted text-sm rounded-xl hover:bg-muted/80 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notifs.map(n => (
          <div key={n.id} className="glass-card rounded-2xl p-5 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl ${TYPE_COLORS[n.type]?.split(' ')[1] || 'bg-muted'} flex items-center justify-center flex-shrink-0`}>
              <Bell className={`w-5 h-5 ${TYPE_COLORS[n.type]?.split(' ')[0] || ''}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-sm">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!n.sent && (
                    <button onClick={() => handleSend(n.id)} disabled={sending === n.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50">
                      {sending === n.id ? '...' : <><Send className="w-3 h-3" /> Send</>}
                    </button>
                  )}
                  <button onClick={() => del(n.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[n.type] || 'bg-muted text-muted-foreground'}`}>{n.type.replace('_', ' ')}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="w-3 h-3" />{n.targetAudience}</span>
                {n.sent ? (
                  <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle className="w-3 h-3" /> Sent {n.sentAt}</span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> Not sent</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
