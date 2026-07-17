'use client'
// src/app/jobs/page.tsx
import { Suspense } from 'react'
import UserLayout from '@/components/layout/UserLayout'
import JobsListing from '@/components/jobs/JobsListing'

export default function JobsPage() {
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Browse <span className="gradient-text">All Jobs</span></h1>
          <p className="text-muted-foreground">Discover opportunities that match your skills and ambitions</p>
        </div>
        <Suspense fallback={<div className="text-muted-foreground">Loading jobs...</div>}>
          <JobsListing />
        </Suspense>
      </div>
    </UserLayout>
  )
}
