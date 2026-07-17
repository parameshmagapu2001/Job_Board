import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

  const base = 'https://job-board-india.vercel.app'

  const staticRoutes = [
    '',
    '/jobs',
    '/remote-jobs',
    '/frontend-jobs',
    '/ai-jobs',
    '/freshers',
    '/companies',
    '/blog',
    '/interview-questions',
    '/resume-tips',
    '/career-guide',
    '/about',
    '/contact',
    '/pricing',
  ]

  return staticRoutes.map((route) => ({
    url: `${base}${route}`,

    lastModified: new Date(),

    changeFrequency:
      route === ''
        ? 'daily'
        : 'weekly',

    priority:
      route === ''
        ? 1
        : 0.8,
  }))
}