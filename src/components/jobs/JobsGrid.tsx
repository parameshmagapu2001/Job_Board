'use client'
// src/components/jobs/JobsGrid.tsx
import { useState } from 'react'
import { Job } from '@/types'
import JobCard from '@/components/jobs/JobCard'

interface JobsGridProps {
  jobs: Partial<Job>[]
}

export default function JobsGrid({ jobs }: JobsGridProps) {
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const handleSave = (id: string) => {
    setSaved(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job as Job} 
          saved={saved.has(job.id!)} 
          onSave={handleSave} 
        />
      ))}
    </div>
  )
}
