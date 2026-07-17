// src/types/index.ts
import { Timestamp } from 'firebase/firestore'

export interface Job {
  id: string
  title: string
  slug: string
  company: string
  companyId?: string
  companyLogo?: string
  location: string
  city?: string
  state?: string
  country?: string
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'remote'
  experienceLevel: 'fresher' | 'junior' | 'mid' | 'senior' | 'lead' | 'manager'
  category: string
  categoryId?: string
  description: string
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  salaryMin?: number
  salaryMax?: number
  salaryCurrency?: string
  salaryPeriod?: 'hourly' | 'monthly' | 'yearly'
  benefits?: string[]
  applicationUrl?: string
  applicationEmail?: string
  isActive: boolean
  isFeatured: boolean
  views: number
  applications: number
  expiresAt?: Timestamp
  postedBy?: string
  source?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  color?: string
  jobCount: number
  description?: string
  isActive: boolean
  createdAt: Timestamp
}

export interface Company {
  id: string
  name: string
  slug: string
  logo?: string
  banner?: string
  website?: string
  industry?: string
  size?: string
  founded?: number
  description?: string
  headquarters?: string
  isVerified: boolean
  jobCount: number
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  createdAt: Timestamp
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail?: string
  author: string
  authorId?: string
  category?: string
  tags?: string[]
  published: boolean
  views: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  role: 'user' | 'admin' | 'employer'
  profile?: {
    headline?: string
    location?: string
    skills?: string[]
    experience?: string
    resumeUrl?: string
    phone?: string
  }
  savedJobs?: string[]
  notifications?: boolean
  createdAt: Timestamp
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  companyName: string
  userId: string
  userName: string
  userEmail: string
  resumeUrl?: string
  coverLetter?: string
  phone?: string
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Ad {
  id: string
  title: string
  type: 'banner' | 'sidebar' | 'inline' | 'popup'
  placement: string
  imageUrl?: string
  linkUrl: string
  code?: string
  isActive: boolean
  impressions: number
  clicks: number
  startDate?: Timestamp
  endDate?: Timestamp
  createdAt: Timestamp
}

export interface Notification {
  id: string
  title: string
  body: string
  type: 'job_alert' | 'system' | 'promotional'
  targetAudience: 'all' | 'users' | 'employers'
  imageUrl?: string
  linkUrl?: string
  sent: boolean
  sentAt?: Timestamp
  createdAt: Timestamp
}

export interface SearchFilters {
  keyword?: string
  location?: string
  category?: string
  jobType?: string
  experienceLevel?: string
  salaryMin?: number
  salaryMax?: number
  isRemote?: boolean
  isFresher?: boolean
  page?: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  hasMore: boolean
}
