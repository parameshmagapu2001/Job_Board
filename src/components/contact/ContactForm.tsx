'use client'
// src/components/contact/ContactForm.tsx
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {submitted ? (
        <div className="glass-card rounded-2xl p-10 text-center border-green-500/20 h-full flex flex-col justify-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mx-auto mb-6 text-xl font-bold">✓</div>
          <h2 className="font-display text-2xl font-bold mb-2">Message Sent!</h2>
          <p className="text-muted-foreground text-sm mb-6">Thank you for reaching out. We have received your inquiry and will reply shortly.</p>
          <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-white/5 transition-all mx-auto">Send New Message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Full Name</label>
            <input required type="text" placeholder="e.g. Ramesh Kumar" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email Address</label>
            <input required type="email" placeholder="e.g. ramesh@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Message</label>
            <textarea required rows={5} placeholder="Write your message details..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all" />
          </div>

          <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}
    </div>
  )
}
