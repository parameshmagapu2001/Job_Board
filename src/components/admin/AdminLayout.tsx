'use client'
// src/components/admin/AdminLayout.tsx
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useAuth } from '@/app/providers'
import {
  LayoutDashboard, Briefcase, Tag, Building2, FileText, Megaphone,
  Bell, Users, Settings, BarChart3, LogOut, Menu, X, Zap,
  ChevronRight, Star, Globe
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  { label: 'Featured Jobs', href: '/admin/featured', icon: Star },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Companies', href: '/admin/companies', icon: Building2 },
  { label: 'Applications', href: '/admin/applications', icon: FileText },
  { label: 'Blog', href: '/admin/blogs', icon: Globe },
  { label: 'Ads', href: '/admin/ads', icon: Megaphone },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()

  const handleLogout = async () => { await signOut(auth); router.push('/auth/login') }

  const Sidebar = () => (
    <div className={`flex flex-col h-full ${collapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 p-5 border-b border-border/50 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && <div><div className="font-display font-bold text-sm gradient-text"></div><div className="text-xs text-muted-foreground">Admin Panel</div></div>}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${active ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/10 text-cyan-400 border border-cyan-500/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
              title={collapsed ? label : undefined}>
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-cyan-400' : ''}`} />
              {!collapsed && <span className="flex-1">{label}</span>}
              {!collapsed && active && <ChevronRight className="w-3 h-3 opacity-50" />}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className={`p-3 border-t border-border/50`}>
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{user?.displayName || 'Admin'}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
        )}
        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col glass border-r border-border/50 fixed inset-y-0 left-0 z-40">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative glass border-r border-border/50 flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className={`flex-1 flex flex-col ${collapsed ? 'lg:pl-16' : 'lg:pl-60'} transition-all duration-300`}>
        {/* Top bar */}
        <header className="h-14 glass border-b border-border/50 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex p-2 rounded-lg hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all flex items-center gap-1">
              <Globe className="w-3 h-3" /> View Site
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xs font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
