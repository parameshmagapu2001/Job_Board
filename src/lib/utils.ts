import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
export const formatSalary = (min?: number, max?: number) => {
  if (!min) return 'Salary not specified'
  const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(0)}L` : `₹${n.toLocaleString()}`
  return max ? `${fmt(min)} – ${fmt(max)}` : `${fmt(min)}+`
}
export const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
export const truncate = (str: string, n: number) => str.length > n ? str.slice(0, n) + '...' : str
