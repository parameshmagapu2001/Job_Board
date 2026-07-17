'use client'
// src/app/admin/categories/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { categoriesService } from '@/firebase/collections'

const DEMO_CATS = [
  { id: '1', name: 'Software Engineering', icon: '💻', slug: 'software-engineering', jobCount: 12400, isActive: true },
  { id: '2', name: 'Data & Analytics', icon: '📊', slug: 'data-analytics', jobCount: 4200, isActive: true },
  { id: '3', name: 'Design & UX', icon: '🎨', slug: 'design-ux', jobCount: 3100, isActive: true },
  { id: '4', name: 'Product Management', icon: '🚀', slug: 'product-management', jobCount: 2800, isActive: true },
  { id: '5', name: 'Marketing', icon: '📣', slug: 'marketing', jobCount: 5600, isActive: true },
  { id: '6', name: 'Finance', icon: '💰', slug: 'finance', jobCount: 3900, isActive: false },
]

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState(DEMO_CATS)
  const [editId, setEditId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', icon: '', slug: '' })

  const save = () => {
    if (!form.name) return
    if (editId) {
      setCats(prev => prev.map(c => c.id === editId ? { ...c, ...form } : c))
      setEditId(null)
    } else {
      setCats(prev => [...prev, { id: Date.now().toString(), ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'), jobCount: 0, isActive: true }])
      setAdding(false)
    }
    setForm({ name: '', icon: '', slug: '' })
  }

  const startEdit = (c: any) => { setEditId(c.id); setForm({ name: c.name, icon: c.icon, slug: c.slug }) }
  const del = (id: string) => { if (confirm('Delete?')) setCats(prev => prev.filter(c => c.id !== id)) }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Categories</h1>
          <p className="text-sm text-muted-foreground">{cats.length} categories</p>
        </div>
        <button onClick={() => { setAdding(true); setForm({ name: '', icon: '📁', slug: '' }) }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {(adding || editId) && (
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4">{editId ? 'Edit Category' : 'New Category'}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm" placeholder="Category name" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Icon (emoji)</label>
              <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm" placeholder="💼" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Slug</label>
              <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none text-sm" placeholder="auto-generated" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={() => { setAdding(false); setEditId(null) }} className="px-4 py-2 bg-muted text-sm rounded-xl hover:bg-muted/80 transition-all flex items-center gap-2">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map(cat => (
          <div key={cat.id} className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">{cat.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{cat.name}</div>
              <div className="text-xs text-muted-foreground">{cat.jobCount.toLocaleString()} jobs</div>
              <div className={`text-xs mt-1 ${cat.isActive ? 'text-green-400' : 'text-muted-foreground'}`}>{cat.isActive ? 'Active' : 'Inactive'}</div>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => startEdit(cat)} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-all"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => del(cat.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
