// src/data/adminData.ts

export const TRAFFIC_DATA = [
  { day: 'Mon', views: 2400, applications: 40 },
  { day: 'Tue', views: 1398, applications: 30 },
  { day: 'Wed', views: 9800, applications: 80 },
  { day: 'Thu', views: 3908, applications: 50 },
  { day: 'Fri', views: 4800, applications: 60 },
  { day: 'Sat', views: 3800, applications: 45 },
  { day: 'Sun', views: 4300, applications: 55 },
]

export const RECENT_JOBS = [
  { title: 'Senior React Developer', company: 'Google', views: 1240, applications: 89, status: 'active' },
  { title: 'Product Manager', company: 'Flipkart', views: 890, applications: 45, status: 'active' },
  { title: 'Data Scientist', company: 'Zepto', views: 670, applications: 32, status: 'active' },
  { title: 'UI/UX Designer', company: 'Swiggy', views: 540, applications: 28, status: 'active' },
  { title: 'DevOps Engineer', company: 'Razorpay', views: 430, applications: 19, status: 'draft' },
]

export const STATS = [
  { label: 'Total Jobs', value: '1,248', change: '+12%', up: true, icon: 'Briefcase', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Total Users', value: '48,291', change: '+8.2%', up: true, icon: 'Users', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Page Views', value: '284K', change: '+23%', up: true, icon: 'Eye', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { label: 'Applications', value: '9,640', change: '-2.4%', up: false, icon: 'FileText', color: 'text-amber-400', bg: 'bg-amber-500/10' },
]

export const MONTHLY_DATA = [
  { month: 'Aug', users: 12000, jobs: 800, applications: 3200 },
  { month: 'Sep', users: 18000, jobs: 1100, applications: 4800 },
  { month: 'Oct', users: 22000, jobs: 1400, applications: 5900 },
  { month: 'Nov', users: 28000, jobs: 1800, applications: 7200 },
  { month: 'Dec', users: 31000, jobs: 2100, applications: 8400 },
  { month: 'Jan', users: 48000, jobs: 2600, applications: 9600 },
]

export const TOP_CATEGORIES = [
  { name: 'Software Eng.', jobs: 12400 },
  { name: 'Marketing', jobs: 5600 },
  { name: 'Sales', jobs: 6200 },
  { name: 'Finance', jobs: 3900 },
  { name: 'Design', jobs: 3100 },
]

export const TOP_CITIES = [
  { name: 'Bangalore', value: 35 },
  { name: 'Hyderabad', value: 22 },
  { name: 'Mumbai', value: 18 },
  { name: 'Delhi NCR', value: 14 },
  { name: 'Remote', value: 11 },
]

export const DEMO_BLOGS = [
  { id: '1', title: 'Top 10 React Interview Questions 2024', slug: 'top-react-interview-questions', author: 'Admin', category: 'Interview Tips', views: 4520, published: true, createdAt: '2024-01-15' },
  { id: '2', title: 'How to Write a Winning Resume for IT Jobs', slug: 'it-resume-writing-guide', author: 'Admin', category: 'Resume Tips', views: 3210, published: true, createdAt: '2024-01-12' },
  { id: '3', title: 'Remote Work in India: A Complete Guide 2024', slug: 'remote-work-india-guide', author: 'Admin', category: 'Career Guide', views: 2890, published: false, createdAt: '2024-01-10' },
  { id: '4', title: 'Highest Paying Tech Jobs in Hyderabad', slug: 'highest-paying-tech-jobs-hyderabad', author: 'Admin', category: 'Salary Guide', views: 5670, published: true, createdAt: '2024-01-08' },
]

export const DEMO_ADS = [
  { id: '1', title: 'Resume Builder Banner', type: 'banner', placement: 'home-top', isActive: true, impressions: 45200, clicks: 1230, ctr: '2.7%' },
  { id: '2', title: 'Job Fair Sidebar', type: 'sidebar', placement: 'jobs-sidebar', isActive: true, impressions: 23100, clicks: 892, ctr: '3.9%' },
  { id: '3', title: 'LinkedIn Learning Inline', type: 'inline', placement: 'job-detail', isActive: false, impressions: 12400, clicks: 310, ctr: '2.5%' },
  { id: '4', title: 'Naukri Partnership', type: 'banner', placement: 'footer', isActive: true, impressions: 89000, clicks: 1780, ctr: '2.0%' },
]

export const DEMO_NOTIFS = [
  { id: '1', title: 'New Jobs Alert – React Developers', body: '50+ new React jobs posted this week!', type: 'job_alert', targetAudience: 'all', sent: true, sentAt: '2024-01-15 10:00' },
  { id: '2', title: 'Weekend Job Fair', body: 'Join our virtual job fair this Saturday!', type: 'promotional', targetAudience: 'users', sent: true, sentAt: '2024-01-13 09:00' },
  { id: '3', title: 'System Maintenance', body: 'Site will be under maintenance 2-4 AM IST.', type: 'system', targetAudience: 'all', sent: false, sentAt: null },
]
