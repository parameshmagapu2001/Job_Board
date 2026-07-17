// src/firebase/collections.ts
import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs,
  query, where, orderBy, limit, startAfter, serverTimestamp,
  DocumentData, QueryConstraint, onSnapshot, writeBatch, increment
} from 'firebase/firestore'
import { db } from './config'

// ─── Collection Names ────────────────────────────────────────────────────────
export const COLLECTIONS = {
  JOBS: 'jobs',
  CATEGORIES: 'categories',
  COMPANIES: 'companies',
  BLOGS: 'blogs',
  USERS: 'users',
  APPLICATIONS: 'applications',
  FEATURED_JOBS: 'featured_jobs',
  ADS: 'ads',
  NOTIFICATIONS: 'notifications',
  SEO_SETTINGS: 'seo_settings',
  SAVED_JOBS: 'saved_jobs',
} as const

// ─── Generic CRUD ────────────────────────────────────────────────────────────
export const createDocument = async (collectionName: string, data: DocumentData) => {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export const updateDocument = async (collectionName: string, id: string, data: Partial<DocumentData>) => {
  const ref = doc(db, collectionName, id)
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

export const deleteDocument = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id))
}

export const getDocument = async (collectionName: string, id: string) => {
  const snap = await getDoc(doc(db, collectionName, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export const getDocuments = async (collectionName: string, constraints: QueryConstraint[] = []) => {
  const q = query(collection(db, collectionName), ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ─── Jobs ────────────────────────────────────────────────────────────────────
export const jobsService = {
  getAll: (constraints?: QueryConstraint[]) =>
    getDocuments(COLLECTIONS.JOBS, constraints),
  
  getById: (id: string) => getDocument(COLLECTIONS.JOBS, id),
  
  create: (data: DocumentData) => createDocument(COLLECTIONS.JOBS, {
    ...data, views: 0, applications: 0, isActive: true, isFeatured: false
  }),
  
  update: (id: string, data: DocumentData) => updateDocument(COLLECTIONS.JOBS, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.JOBS, id),
  
  incrementViews: (id: string) => updateDoc(doc(db, COLLECTIONS.JOBS, id), { views: increment(1) }),
  
  getByCategory: (category: string) =>
    getDocuments(COLLECTIONS.JOBS, [where('category', '==', category), where('isActive', '==', true), orderBy('createdAt', 'desc')]),
  
  getFeatured: () =>
    getDocuments(COLLECTIONS.JOBS, [where('isFeatured', '==', true), where('isActive', '==', true), limit(10)]),
  
  getRemote: () =>
    getDocuments(COLLECTIONS.JOBS, [where('jobType', '==', 'remote'), where('isActive', '==', true), orderBy('createdAt', 'desc')]),
  
  getFreshers: () =>
    getDocuments(COLLECTIONS.JOBS, [where('experienceLevel', '==', 'fresher'), where('isActive', '==', true), orderBy('createdAt', 'desc')]),
  
  search: async (searchTerm: string) => {
    const all = await getDocuments(COLLECTIONS.JOBS, [where('isActive', '==', true)])
    const term = searchTerm.toLowerCase()
    return all.filter((j: any) =>
      j.title?.toLowerCase().includes(term) ||
      j.company?.toLowerCase().includes(term) ||
      j.skills?.some((s: string) => s.toLowerCase().includes(term))
    )
  },
  
  subscribeToActive: (callback: (jobs: any[]) => void) => {
    const q = query(collection(db, COLLECTIONS.JOBS), where('isActive', '==', true), orderBy('createdAt', 'desc'), limit(50))
    return onSnapshot(q, snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }
}

// ─── Categories ──────────────────────────────────────────────────────────────
export const categoriesService = {
  getAll: () => getDocuments(COLLECTIONS.CATEGORIES, [orderBy('name', 'asc')]),
  create: (data: DocumentData) => createDocument(COLLECTIONS.CATEGORIES, { ...data, jobCount: 0 }),
  update: (id: string, data: DocumentData) => updateDocument(COLLECTIONS.CATEGORIES, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.CATEGORIES, id),
}

// ─── Companies ───────────────────────────────────────────────────────────────
export const companiesService = {
  getAll: () => getDocuments(COLLECTIONS.COMPANIES, [orderBy('name', 'asc')]),
  getById: (id: string) => getDocument(COLLECTIONS.COMPANIES, id),
  create: (data: DocumentData) => createDocument(COLLECTIONS.COMPANIES, { ...data, jobCount: 0, isVerified: false }),
  update: (id: string, data: DocumentData) => updateDocument(COLLECTIONS.COMPANIES, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.COMPANIES, id),
}

// ─── Applications ────────────────────────────────────────────────────────────
export const applicationsService = {
  getAll: () => getDocuments(COLLECTIONS.APPLICATIONS, [orderBy('createdAt', 'desc')]),
  getByJob: (jobId: string) => getDocuments(COLLECTIONS.APPLICATIONS, [where('jobId', '==', jobId)]),
  getByUser: (userId: string) => getDocuments(COLLECTIONS.APPLICATIONS, [where('userId', '==', userId)]),
  create: (data: DocumentData) => createDocument(COLLECTIONS.APPLICATIONS, { ...data, status: 'pending' }),
  updateStatus: (id: string, status: string) => updateDocument(COLLECTIONS.APPLICATIONS, id, { status }),
}

// ─── Blogs ───────────────────────────────────────────────────────────────────
export const blogsService = {
  getAll: () => getDocuments(COLLECTIONS.BLOGS, [orderBy('createdAt', 'desc')]),
  getPublished: () => getDocuments(COLLECTIONS.BLOGS, [where('published', '==', true), orderBy('createdAt', 'desc')]),
  getById: (id: string) => getDocument(COLLECTIONS.BLOGS, id),
  getBySlug: async (slug: string) => {
    const docs = await getDocuments(COLLECTIONS.BLOGS, [where('slug', '==', slug)])
    return docs[0] || null
  },
  create: (data: DocumentData) => createDocument(COLLECTIONS.BLOGS, { ...data, views: 0, published: false }),
  update: (id: string, data: DocumentData) => updateDocument(COLLECTIONS.BLOGS, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.BLOGS, id),
}

// ─── Ads ─────────────────────────────────────────────────────────────────────
export const adsService = {
  getAll: () => getDocuments(COLLECTIONS.ADS, [orderBy('createdAt', 'desc')]),
  getActive: () => getDocuments(COLLECTIONS.ADS, [where('isActive', '==', true)]),
  create: (data: DocumentData) => createDocument(COLLECTIONS.ADS, { ...data, isActive: true, impressions: 0, clicks: 0 }),
  update: (id: string, data: DocumentData) => updateDocument(COLLECTIONS.ADS, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.ADS, id),
  incrementClicks: (id: string) => updateDoc(doc(db, COLLECTIONS.ADS, id), { clicks: increment(1) }),
}

// ─── Notifications ───────────────────────────────────────────────────────────
export const notificationsService = {
  getAll: () => getDocuments(COLLECTIONS.NOTIFICATIONS, [orderBy('createdAt', 'desc')]),
  create: (data: DocumentData) => createDocument(COLLECTIONS.NOTIFICATIONS, { ...data, sent: false }),
  markSent: (id: string) => updateDocument(COLLECTIONS.NOTIFICATIONS, id, { sent: true, sentAt: serverTimestamp() }),
}

// ─── Saved Jobs ──────────────────────────────────────────────────────────────
export const savedJobsService = {
  getByUser: (userId: string) => getDocuments(COLLECTIONS.SAVED_JOBS, [where('userId', '==', userId)]),
  save: (userId: string, jobId: string) => createDocument(COLLECTIONS.SAVED_JOBS, { userId, jobId }),
  unsave: async (userId: string, jobId: string) => {
    const saved = await getDocuments(COLLECTIONS.SAVED_JOBS, [where('userId', '==', userId), where('jobId', '==', jobId)])
    if (saved.length > 0) await deleteDocument(COLLECTIONS.SAVED_JOBS, (saved[0] as any).id)
  },
}
