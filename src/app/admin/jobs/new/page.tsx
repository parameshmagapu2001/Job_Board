'use client'
// src/app/admin/jobs/new/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { ArrowLeft, Plus, X, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { jobsService } from '@/firebase/collections'

const CATEGORIES = ['Software Engineering','Data & Analytics','Design & UX','Product Management','Marketing','Finance','Sales','DevOps & Cloud','HR','Operations']
const JOB_TYPES = ['full-time','part-time','contract','remote','internship','freelance']
const EXP_LEVELS = ['fresher','junior','mid','senior','lead','manager']

export default function AddJobPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [form, setForm] = useState({
    title: '', company: '', location: '', city: '', jobType: 'full-time',
    experienceLevel: 'mid', category: 'Software Engineering', description: '',
    requirements: '', responsibilities: '', skills: [] as string[],
    salaryMin: '', salaryMax: '', applicationUrl: '', applicationEmail: '',
    isActive: true, isFeatured: false,
  })

  const set = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }))

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !form.skills.includes(s)) { set('skills', [...form.skills, s]); setSkillInput('') }
  }
  const removeSkill = (s: string) => set('skills', form.skills.filter(x => x !== s))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try {
      const slug = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()
      await jobsService.create({
        ...form, slug,
        requirements: form.requirements.split('\n').filter(Boolean),
        responsibilities: form.responsibilities.split('\n').filter(Boolean),
        salaryMin: Number(form.salaryMin) || 0,
        salaryMax: Number(form.salaryMax) || 0,
      })
      router.push('/admin/jobs')
    } catch (err) { alert('Failed to save job') } finally { setSaving(false) }
  }

  const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground block mb-1.5">{label}{required && <span className="text-destructive ml-1">*</span>}</label>
      {children}
    </div>
  )

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 text-sm transition-all"

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/jobs" className="p-2 rounded-xl hover:bg-white/5 transition-all"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="font-display text-2xl font-bold">Add New Job</h1>
          <p className="text-sm text-muted-foreground">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Basic Information</h2>
              <Field label="Job Title" required>
                <input value={form.title} onChange={e => set('title', e.target.value)} required className={inputCls} placeholder="e.g. Senior React Developer" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input value={form.company} onChange={e => set('company', e.target.value)} required className={inputCls} placeholder="e.g. Google" />
                </Field>
                <Field label="Location" required>
                  <input value={form.location} onChange={e => set('location', e.target.value)} required className={inputCls} placeholder="e.g. Bangalore, India" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Job Type">
                  <select value={form.jobType} onChange={e => set('jobType', e.target.value)} className={inputCls}>
                    {JOB_TYPES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                  </select>
                </Field>
                <Field label="Experience Level">
                  <select value={form.experienceLevel} onChange={e => set('experienceLevel', e.target.value)} className={inputCls}>
                    {EXP_LEVELS.map(l => <option key={l} value={l} className="capitalize">{l}</option>)}
                  </select>
                </Field>
                <Field label="Category">
                  <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Job Details</h2>
              <Field label="Job Description" required>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required rows={6}
                  className={`${inputCls} resize-none`} placeholder="Describe the role, team, and what you're looking for..." />
              </Field>
              <Field label="Requirements (one per line)">
                <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)} rows={5}
                  className={`${inputCls} resize-none`} placeholder="5+ years of experience with React&#10;Strong TypeScript skills&#10;..." />
              </Field>
              <Field label="Responsibilities (one per line)">
                <textarea value={form.responsibilities} onChange={e => set('responsibilities', e.target.value)} rows={5}
                  className={`${inputCls} resize-none`} placeholder="Design and develop features&#10;Mentor junior developers&#10;..." />
              </Field>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Skills</h2>
              <div className="flex gap-2">
                <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className={`${inputCls} flex-1`} placeholder="Type a skill and press Enter..." />
                <button type="button" onClick={addSkill} className="px-4 py-2.5 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-all flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-full">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Salary</h2>
              <Field label="Min Salary (₹/year)">
                <input type="number" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)} className={inputCls} placeholder="e.g. 1200000" />
              </Field>
              <Field label="Max Salary (₹/year)">
                <input type="number" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)} className={inputCls} placeholder="e.g. 2000000" />
              </Field>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Application</h2>
              <Field label="Application URL">
                <input type="url" value={form.applicationUrl} onChange={e => set('applicationUrl', e.target.value)} className={inputCls} placeholder="https://..." />
              </Field>
              <Field label="Application Email">
                <input type="email" value={form.applicationEmail} onChange={e => set('applicationEmail', e.target.value)} className={inputCls} placeholder="hr@company.com" />
              </Field>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Settings</h2>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm font-medium">Active</div>
                  <div className="text-xs text-muted-foreground">Visible to job seekers</div>
                </div>
                <button type="button" onClick={() => set('isActive', !form.isActive)}
                  className={`w-11 h-6 rounded-full transition-all ${form.isActive ? 'bg-cyan-500' : 'bg-muted'} relative`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.isActive ? 'left-6' : 'left-1'}`} />
                </button>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm font-medium">Featured</div>
                  <div className="text-xs text-muted-foreground">Show in featured section</div>
                </div>
                <button type="button" onClick={() => set('isFeatured', !form.isFeatured)}
                  className={`w-11 h-6 rounded-full transition-all ${form.isFeatured ? 'bg-amber-500' : 'bg-muted'} relative`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.isFeatured ? 'left-6' : 'left-1'}`} />
                </button>
              </label>
            </div>

            <button type="submit" disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Publish Job</>}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
