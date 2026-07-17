// src/components/layout/UserLayout.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell, User, Menu, X, Briefcase, ChevronDown, Sun, Moon, Zap } from 'lucide-react'
import { useAuth } from '@/app/providers'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'

const NAV_LINKS = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Remote', href: '/remote-jobs' },
  { label: 'Freshers', href: '/freshers' },
  {
    label: 'Resources', href: '#', children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Interview Questions', href: '/interview-questions' },
      { label: 'Resume Tips', href: '/resume-tips' },
    ]
  },
  { label: 'Companies', href: '/companies' },
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { user, isAdmin } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border/50 py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
         <Link href="/" className="flex items-center gap-3 group">

  {/* Logo */}
  <div
    className="
      relative
      w-11
      h-11
      
      overflow-hidden
      transition-all
      duration-300
      group-hover:scale-105
      shadow-xs
      shadow-cyan-500/20
      group-hover:shadow-cyan-400/40
    "
  >
    <img
      src="/logo_sus.png"
      alt="JobBoard"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Brand */}
  <div className="flex flex-col leading-none">

  <span
    className="
      font-display
      text-[20px]
      font-extrabold
      tracking-[-0.04em]
      text-white
      uppercase
      leading-none
    "
  >
    JOB
  </span>

  <span
    className="
      font-display
      text-[16px]
      font-semibold
      tracking-[0.42em]
      text-cyan-300
      uppercase
      mt-0.5
      pl-[2px]
    "
  >
    BOARD
  </span>

</div>
</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                    {link.label} <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 glass-card p-2 rounded-xl">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === link.href ? 'text-foreground bg-white/5' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <Link href="/admin" className="px-3 py-1.5 text-xs font-medium text-amber-400 border border-amber-400/30 rounded-lg hover:bg-amber-400/10 transition-all">
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-all relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
                </button>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xs font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 glass-card p-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/profile" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg">Profile</Link>
                    <Link href="/saved-jobs" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg">Saved Jobs</Link>
                    <Link href="/applications" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg">Applications</Link>
                    <hr className="border-border my-1" />
                    <button onClick={() => signOut(auth)} className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-white/5 rounded-lg">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all">Sign In</Link>
                <Link href="/auth/register" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu btn */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 mx-4 glass-card rounded-2xl p-4 max-h-[75vh] overflow-y-auto">
            {NAV_LINKS.map(link => (
              link.children ? (
                <div key={link.label} className="py-1">
                  <div className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">{link.label}</div>
                  <div className="pl-2 border-l border-border/50 ml-4 my-1 space-y-1">
                    {link.children.map(child => (
                      <Link key={child.label} href={child.href}
                        className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg"
                        onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href || '#'}
                  className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg"
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              )
            ))}
            <hr className="border-border my-2" />
            {user ? (
              <>
                <Link href="/profile" className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg" onClick={() => setMobileOpen(false)}>Profile</Link>
                <Link href="/saved-jobs" className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg" onClick={() => setMobileOpen(false)}>Saved Jobs</Link>
                <Link href="/applications" className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg" onClick={() => setMobileOpen(false)}>Applications</Link>
                <hr className="border-border my-2" />
                <button onClick={() => { signOut(auth); setMobileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-white/5 rounded-lg">Sign Out</button>
              </>
            ) : (
              <div className="space-y-2 mt-2">
                <Link href="/auth/login" className="block px-4 py-2.5 text-sm font-medium text-center text-muted-foreground hover:text-foreground border border-border/50 rounded-xl" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link href="/auth/register" className="block px-4 py-2.5 text-sm font-medium text-center bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
    <footer className="border-t border-border/50 mt-20">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

      {/* Brand */}
      <div className="col-span-2">

        <Link
          href="/"
          className="flex items-center gap-3 mb-5 group"
        >

          <div
            className="
              relative
              w-11
              h-11
              rounded-2xl
              overflow-hidden
              shadow-lg
              shadow-cyan-500/20
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:shadow-cyan-500/40
            "
          >
            <img
              src="/logo_sus.png"
              alt="JobBoard"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col leading-none">

  <span
    className="
      font-display
      text-[18px]
      font-extrabold
      tracking-[-0.04em]
      text-white
      uppercase
      leading-none
    "
  >
    JOB
  </span>

  <span
    className="
      font-display
      text-[14px]
      font-semibold
      tracking-[0.42em]
      text-cyan-300
      uppercase
      mt-0.8
      pl-[2px]
    "
  >
    BOARD
  </span>

</div>
        </Link>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
          AI-powered hiring platform helping developers,
          startups, and companies connect faster with
          modern recruitment workflows and intelligent
          job discovery.
        </p>

      </div>

      {/* Footer Links */}
      {[
        {
          title: 'Jobs',
          links: [
            ['All Jobs', '/jobs'],
            ['Remote Jobs', '/remote-jobs'],
            ['Frontend Jobs', '/frontend-jobs'],
            ['AI Jobs', '/ai-jobs'],
          ],
        },

        {
          title: 'Company',
          links: [
            ['About Us', '/about'],
            ['Post a Job', '/post-job'],
            ['Pricing', '/pricing'],
            ['Contact', '/contact'],
          ],
        },

        {
          title: 'Resources',
          links: [
            ['Interview Questions', '/interview-questions'],
            ['Resume Tips', '/resume-tips'],
            ['Career Guide', '/career-guide'],
            ['Blog', '/blog'],
          ],
        },
      ].map((col) => (

        <div key={col.title}>

          <h3 className="font-semibold text-sm mb-4 text-foreground">
            {col.title}
          </h3>

          <ul className="space-y-3">

            {col.links.map(([label, href]) => (

              <li key={href}>

                <Link
                  href={href}
                  className="
                    text-sm
                    text-muted-foreground
                    hover:text-cyan-400
                    transition-colors
                  "
                >
                  {label}
                </Link>

              </li>
            ))}

          </ul>

        </div>
      ))}

    </div>

    {/* Bottom */}
    <div
      className="
        border-t
        border-border/50
        mt-14
        pt-6
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4
      "
    >

      <p className="text-xs text-muted-foreground">
        © 2026 JobBoard. All rights reserved.
      </p>

      <div className="flex gap-5 text-xs text-muted-foreground">

        <Link
          href="/privacy"
          className="hover:text-cyan-400 transition-colors"
        >
          Privacy
        </Link>

        <Link
          href="/terms"
          className="hover:text-cyan-400 transition-colors"
        >
          Terms
        </Link>

        <Link
          href="/sitemap.xml"
          className="hover:text-cyan-400 transition-colors"
        >
          Sitemap
        </Link>

      </div>

    </div>

  </div>

</footer>
    </div>
  )
}
