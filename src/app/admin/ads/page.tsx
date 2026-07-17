'use client'
// src/app/admin/ads/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit2, Trash2, BarChart2, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'

import { DEMO_ADS } from '@/data/adminData'

const TYPE_COLORS: Record<string, string> = {
  banner: 'text-blue-400 bg-blue-500/10',
  sidebar: 'text-purple-400 bg-purple-500/10',
  inline: 'text-cyan-400 bg-cyan-500/10',
  popup: 'text-amber-400 bg-amber-500/10',
}

export default function AdminAdsPage() {
  const [ads, setAds] = useState(DEMO_ADS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'banner', placement: '', linkUrl: '', code: '' })

  const toggleActive = (id: string) => setAds(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a))
  const del = (id: string) => { if (confirm('Delete ad?')) setAds(prev => prev.filter(a => a.id !== id)) }

  const save = () => {
    if (!form.title) return
    setAds(prev => [...prev, { id: Date.now().toString(), ...form, isActive: true, impressions: 0, clicks: 0, ctr: '0%' }])
    setForm({ title: '', type: 'banner', placement: '', linkUrl: '', code: '' })
    setShowForm(false)
  }

  const totalImpressions = ads.reduce((sum, a) => sum + a.impressions, 0)
  const totalClicks = ads.reduce((sum, a) => sum + a.clicks, 0)

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Ad Management</h1>
          <p className="text-sm text-muted-foreground">Manage banners, sidebars & inline ads</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" /> Add Ad
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Impressions', value: totalImpressions.toLocaleString(), color: 'text-blue-400 bg-blue-500/10' },
          { label: 'Total Clicks', value: totalClicks.toLocaleString(), color: 'text-cyan-400 bg-cyan-500/10' },
          { label: 'Avg CTR', value: `${((totalClicks / totalImpressions) * 100).toFixed(1)}%`, color: 'text-green-400 bg-green-500/10' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card rounded-2xl p-5">
            <div className="font-display text-2xl font-bold mb-1">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4">New Ad</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Title', key: 'title', type: 'text', placeholder: 'Ad name' },
              { label: 'Link URL', key: 'linkUrl', type: 'url', placeholder: 'https://...' },
              { label: 'Placement', key: 'placement', type: 'text', placeholder: 'e.g. home-top' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="text-xs text-muted-foreground block mb-1.5">{label}</label>
                <input type={type} value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm" placeholder={placeholder} />
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm">
                {['banner','sidebar','inline','popup'].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs text-muted-foreground block mb-1.5">Ad Code / Script (optional)</label>
            <textarea value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm font-mono resize-none" placeholder="<!-- AdSense or custom code -->" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">Save</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-muted text-sm rounded-xl hover:bg-muted/80 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border/50">
            <tr className="text-xs text-muted-foreground">
              <th className="text-left px-6 py-4 font-medium">Ad</th>
              <th className="text-left px-4 py-4 font-medium">Type</th>
              <th className="text-left px-4 py-4 font-medium">Placement</th>
              <th className="text-right px-4 py-4 font-medium">Impressions</th>
              <th className="text-right px-4 py-4 font-medium">Clicks</th>
              <th className="text-right px-4 py-4 font-medium">CTR</th>
              <th className="text-center px-4 py-4 font-medium">Active</th>
              <th className="text-right px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {ads.map(ad => (
              <tr key={ad.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4 font-medium">{ad.title}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${TYPE_COLORS[ad.type] || 'bg-muted text-muted-foreground'}`}>{ad.type}</span>
                </td>
                <td className="px-4 py-4 text-muted-foreground text-xs font-mono">{ad.placement}</td>
                <td className="px-4 py-4 text-right text-muted-foreground">{ad.impressions.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-muted-foreground">{ad.clicks.toLocaleString()}</td>
                <td className="px-4 py-4 text-right text-green-400 font-medium">{ad.ctr}</td>
                <td className="px-4 py-4 text-center">
                  <button onClick={() => toggleActive(ad.id)} className={`transition-colors ${ad.isActive ? 'text-green-400' : 'text-muted-foreground'}`}>
                    {ad.isActive ? <ToggleRight className="w-6 h-6 mx-auto" /> : <ToggleLeft className="w-6 h-6 mx-auto" />}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => del(ad.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
