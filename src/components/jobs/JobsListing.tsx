'use client'
// src/components/jobs/JobsListing.tsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import JobCard from './JobCard'
import { jobsService } from '@/firebase/collections'
import { Job } from '@/types'
import { getAllMockJobs } from '@/data/jobsData'

const DEMO_JOBS = getAllMockJobs() as Partial<Job>[]

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'remote', 'internship', 'freelance']
const EXP_LEVELS = ['fresher', 'junior', 'mid', 'senior', 'lead', 'manager']
const CATEGORIES = ['Software Engineering', 'Data & Analytics', 'Design', 'Product', 'Marketing', 'Finance', 'Sales', 'DevOps']

export default function JobsListing() {
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState<any[]>(DEMO_JOBS)
  const [filtered, setFiltered] = useState<any[]>(DEMO_JOBS)
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(new Set())

  useEffect(() => {
    jobsService.getAll().then(data => { if (data.length > 0) { setJobs(data); setFiltered(data) } }).catch(() => {})
  }, [])

  useEffect(() => {
    let result = [...jobs]
    if (keyword) result = result.filter(j => j.title?.toLowerCase().includes(keyword.toLowerCase()) || j.company?.toLowerCase().includes(keyword.toLowerCase()) || j.skills?.some((s: string) => s.toLowerCase().includes(keyword.toLowerCase())))
    if (location) result = result.filter(j => j.location?.toLowerCase().includes(location.toLowerCase()))
    if (selectedTypes.length) result = result.filter(j => selectedTypes.includes(j.jobType))
    if (selectedLevels.length) result = result.filter(j => selectedLevels.includes(j.experienceLevel))
    if (selectedCategories.length) result = result.filter(j => selectedCategories.includes(j.category))
    if (sortBy === 'salary') result.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0))
    else if (sortBy === 'newest') result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    setFiltered(result)
  }, [keyword, location, selectedTypes, selectedLevels, selectedCategories, sortBy, jobs])

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    arr.includes(val) ? setArr(arr.filter(x => x !== val)) : setArr([...arr, val])

  const clearFilters = () => { setKeyword(''); setLocation(''); setSelectedTypes([]); setSelectedLevels([]); setSelectedCategories([]) }
  const activeFilters = selectedTypes.length + selectedLevels.length + selectedCategories.length

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className={`${showFilters ? 'fixed inset-0 z-50 p-4 overflow-y-auto bg-background' : 'hidden'} lg:block lg:static lg:z-auto lg:p-0 lg:bg-transparent w-full lg:w-72 flex-shrink-0`}>
        <div className="glass-card rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Filters {activeFilters > 0 && <span className="ml-2 px-2 py-0.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">{activeFilters}</span>}</h3>
            <div className="flex gap-2">
              {activeFilters > 0 && <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">Clear all</button>}
              <button className="lg:hidden" onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Job Type */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Job Type</h4>
            <div className="space-y-2">
              {JOB_TYPES.map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggle(selectedTypes, setSelectedTypes, type)} className="accent-cyan-500" />
                  <span className="text-sm capitalize group-hover:text-foreground text-muted-foreground transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Experience</h4>
            <div className="space-y-2">
              {EXP_LEVELS.map(lvl => (
                <label key={lvl} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={selectedLevels.includes(lvl)} onChange={() => toggle(selectedLevels, setSelectedLevels, lvl)} className="accent-cyan-500" />
                  <span className="text-sm capitalize group-hover:text-foreground text-muted-foreground transition-colors">{lvl}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</h4>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggle(selectedCategories, setSelectedCategories, cat)} className="accent-cyan-500" />
                  <span className="text-sm group-hover:text-foreground text-muted-foreground transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={() => setShowFilters(false)} className="lg:hidden w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-cyan-500/20">
            Show Results
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Search bar */}
        <div className="glass-card rounded-2xl p-3 mb-5 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search jobs, skills, companies..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 text-sm bg-muted rounded-xl outline-none">
              <option value="newest">Newest First</option>
              <option value="salary">Highest Salary</option>
            </select>
            <button onClick={() => setShowFilters(true)} className="lg:hidden px-3 py-2 bg-muted rounded-xl flex items-center gap-1 text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilters > 0 && `(${activeFilters})`}
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} jobs found</p>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="glass-card rounded-2xl p-16 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold mb-2">No jobs found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="mt-4 px-4 py-2 text-sm bg-muted rounded-xl hover:bg-muted/80 transition-all">Clear Filters</button>
            </div>
          ) : (
            filtered.map(job => (
              <JobCard key={job.id} job={job} saved={saved.has(job.id)} onSave={id => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
