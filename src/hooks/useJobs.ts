import { useState, useEffect, useCallback } from 'react'
import { jobsService } from '@/firebase/collections'
import { Job, SearchFilters } from '@/types'

export function useJobs(filters?: SearchFilters) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await jobsService.getAll()
      setJobs(data as Job[])
    } catch (e: any) { setError(e.message) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchJobs() }, [fetchJobs])
  return { jobs, loading, error, refetch: fetchJobs }
}

export function useFeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    jobsService.getFeatured().then(d => setJobs(d as Job[])).catch(() => {}).finally(() => setLoading(false))
  }, [])
  return { jobs, loading }
}
