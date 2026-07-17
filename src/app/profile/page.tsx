'use client'
import UserLayout from '@/components/layout/UserLayout'
import { useState } from 'react'
import { useAuth } from '@/app/providers'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { updateDocument } from '@/firebase/collections'
import { User, MapPin, Briefcase, Phone, Save, Upload, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const { user, userProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ displayName: user?.displayName || '', headline: userProfile?.profile?.headline || '', location: userProfile?.profile?.location || '', phone: userProfile?.profile?.phone || '', experience: userProfile?.profile?.experience || '', skills: userProfile?.profile?.skills?.join(', ') || '' })
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))
  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 text-sm transition-all"

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      await updateProfile(auth.currentUser!, { displayName: form.displayName })
      await updateDocument('users', user.uid, { displayName: form.displayName, profile: { headline: form.headline, location: form.location, phone: form.phone, experience: form.experience, skills: form.skills.split(',').map((s: string) => s.trim()).filter(Boolean) } })
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e) { alert('Failed to save') } finally { setSaving(false) }
  }

  if (!user) return <UserLayout><div className="max-w-3xl mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">Please sign in to view your profile.</p></div></UserLayout>

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-1">My Profile</h1>
          <p className="text-muted-foreground text-sm">Keep your profile updated to get better job matches.</p>
        </div>
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white relative">
                {user.email?.[0].toUpperCase()}
                <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-all"><Upload className="w-3 h-3" /></button>
              </div>
              <div>
                <div className="font-semibold text-lg">{user.displayName || 'Your Name'}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <div className="text-xs text-cyan-400 mt-1">{userProfile?.role || 'Job Seeker'}</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: 'Full Name', key: 'displayName', icon: User, placeholder: 'Rahul Sharma' },
                { label: 'Professional Headline', key: 'headline', icon: Briefcase, placeholder: 'Senior React Developer' },
                { label: 'Location', key: 'location', icon: MapPin, placeholder: 'Hyderabad, Telangana' },
                { label: 'Phone', key: 'phone', icon: Phone, placeholder: '+91 98765 43210' },
              ].map(({ label, key, icon: Icon, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5 flex items-center gap-1"><Icon className="w-3 h-3" />{label}</label>
                  <input value={(form as any)[key]} onChange={e => set(key, e.target.value)} className={inputCls} placeholder={placeholder} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Years of Experience</label>
                <select value={form.experience} onChange={e => set('experience', e.target.value)} className={inputCls}>
                  <option value="">Select experience</option>
                  {['Fresher (0 yrs)', '1–2 years', '3–5 years', '5–8 years', '8–12 years', '12+ years'].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Skills (comma separated)</label>
                <textarea value={form.skills} onChange={e => set('skills', e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="React, TypeScript, Node.js, AWS..." />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : saved ? '✓ Saved!' : <><Save className="w-4 h-4" />Save Profile</>}
              </button>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Resume</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-cyan-500/30 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium mb-1">Upload your resume</p>
              <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
              <button className="mt-4 px-4 py-2 text-sm bg-muted rounded-xl hover:bg-muted/80 transition-all">Choose File</button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
