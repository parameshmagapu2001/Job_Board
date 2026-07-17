'use client'
// src/app/admin/blogs/page.tsx
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Plus, Edit2, Trash2, Eye, Globe, EyeOff, Search } from 'lucide-react'
import Link from 'next/link'

import { DEMO_BLOGS } from '@/data/adminData'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(DEMO_BLOGS)
  const [search, setSearch] = useState('')

  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
  const togglePublish = (id: string) => setBlogs(prev => prev.map(b => b.id === id ? { ...b, published: !b.published } : b))
  const del = (id: string) => { if (confirm('Delete post?')) setBlogs(prev => prev.filter(b => b.id !== id)) }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">{blogs.length} posts</p>
        </div>
        <Link href="/admin/blogs/new" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="glass-card rounded-2xl p-4 mb-6 flex items-center gap-2 px-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
          <thead className="border-b border-border/50">
            <tr className="text-xs text-muted-foreground">
              <th className="text-left px-6 py-4 font-medium">Post</th>
              <th className="text-left px-4 py-4 font-medium">Category</th>
              <th className="text-right px-4 py-4 font-medium">Views</th>
              <th className="text-center px-4 py-4 font-medium">Status</th>
              <th className="text-right px-4 py-4 font-medium">Date</th>
              <th className="text-right px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filtered.map(blog => (
              <tr key={blog.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium line-clamp-1">{blog.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono">/{blog.slug}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-muted">{blog.category}</span>
                </td>
                <td className="px-4 py-4 text-right text-muted-foreground">{blog.views.toLocaleString()}</td>
                <td className="px-4 py-4 text-center">
                  <button onClick={() => togglePublish(blog.id)} className={`flex items-center gap-1 mx-auto text-xs px-2 py-1 rounded-full transition-all ${blog.published ? 'bg-green-500/10 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                    {blog.published ? <><Globe className="w-3 h-3" /> Published</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                  </button>
                </td>
                <td className="px-4 py-4 text-right text-xs text-muted-foreground">{blog.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/blog/${blog.slug}`} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"><Eye className="w-4 h-4" /></Link>
                    <Link href={`/admin/blogs/${blog.id}/edit`} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-all"><Edit2 className="w-4 h-4" /></Link>
                    <button onClick={() => del(blog.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
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
