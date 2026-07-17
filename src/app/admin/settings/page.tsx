'use client'

// src/app/admin/settings/page.tsx

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  Save,
  Globe,
  Search,
  Bell,
  Shield,
  Loader2,
} from 'lucide-react'

export default function AdminSettingsPage() {

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({

    /* Branding */
    siteName: 'JobBoard',

    siteTagline:
      'AI Powered Job & Talent Platform',

    siteUrl:
      'https://jobboard.in',

    siteEmail:
      'hello@jobboard.in',

    /* SEO */
    googleAnalyticsId: '',
    googleAdsenseId: '',

    metaTitle:
      'JobBoard – AI Powered Job & Talent Platform',

    metaDescription:
      'Discover top tech jobs, startups, remote opportunities, and AI-first companies across India.',

    metaKeywords:
      'react jobs, nextjs jobs, ai jobs, frontend developer jobs, startup jobs, remote jobs india',

    /* Platform */
    allowRegistration: true,
    requireEmailVerification: false,
    maintenanceMode: false,

    /* Notifications */
    pushNotificationsEnabled: true,
    vapidKey: '',

    /* Jobs */
    jobsPerPage: '20',
    featuredJobsCount: '6',
  })

  const set = (k: string, v: any) =>
    setSettings((p) => ({ ...p, [k]: v }))

  const handleSave = async () => {
    setSaving(true)

    await new Promise((r) =>
      setTimeout(r, 1200)
    )

    setSaving(false)
    setSaved(true)

    setTimeout(() => setSaved(false), 3000)
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all'

  const Toggle = ({
    value,
    onChange,
  }: {
    value: boolean
    onChange: () => void
  }) => (
    <button
      type="button"
      onClick={onChange}
      className={`
        relative
        w-11
        h-6
        rounded-full
        transition-all
        ${value ? 'bg-cyan-500' : 'bg-muted'}
      `}
    >
      <span
        className={`
          absolute
          top-1
          w-4
          h-4
          rounded-full
          bg-white
          transition-all
          ${value ? 'left-6' : 'left-1'}
        `}
      />
    </button>
  )

  const Section = ({
    title,
    icon: Icon,
    children,
  }: any) => (
    <div className="glass-card rounded-2xl p-6 soft-glow">
      <h2 className="font-semibold mb-5 flex items-center gap-2">
        <Icon className="w-4 h-4 text-cyan-400" />
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  )

  const Field = ({
    label,
    children,
  }: any) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground block mb-1.5">
        {label}
      </label>

      {children}
    </div>
  )

  return (
    <AdminLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-1">
            Platform Settings
          </h1>

          <p className="text-sm text-muted-foreground">
            Configure your platform settings and SEO preferences
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            premium-button
            disabled:opacity-50
          "
        >

          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            '✓ Saved!'
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}

        </button>
      </div>

      {/* Sections */}
      <div className="space-y-6">

        {/* General */}
        <Section title="General Settings" icon={Globe}>

          <div className="grid sm:grid-cols-2 gap-4">

            <Field label="Site Name">
              <input
                value={settings.siteName}
                onChange={(e) =>
                  set('siteName', e.target.value)
                }
                className={inputCls}
              />
            </Field>

            <Field label="Site URL">
              <input
                value={settings.siteUrl}
                onChange={(e) =>
                  set('siteUrl', e.target.value)
                }
                className={inputCls}
              />
            </Field>

            <Field label="Tagline">
              <input
                value={settings.siteTagline}
                onChange={(e) =>
                  set('siteTagline', e.target.value)
                }
                className={inputCls}
              />
            </Field>

            <Field label="Contact Email">
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) =>
                  set('siteEmail', e.target.value)
                }
                className={inputCls}
              />
            </Field>

          </div>

          <div className="grid sm:grid-cols-2 gap-4">

            <Field label="Jobs Per Page">
              <input
                type="number"
                value={settings.jobsPerPage}
                onChange={(e) =>
                  set('jobsPerPage', e.target.value)
                }
                className={inputCls}
              />
            </Field>

            <Field label="Featured Jobs Count">
              <input
                type="number"
                value={settings.featuredJobsCount}
                onChange={(e) =>
                  set(
                    'featuredJobsCount',
                    e.target.value
                  )
                }
                className={inputCls}
              />
            </Field>

          </div>
        </Section>

        {/* SEO */}
        <Section title="SEO Settings" icon={Search}>

          <Field label="Meta Title">
            <input
              value={settings.metaTitle}
              onChange={(e) =>
                set('metaTitle', e.target.value)
              }
              className={inputCls}
            />
          </Field>

          <Field label="Meta Description">
            <textarea
              value={settings.metaDescription}
              onChange={(e) =>
                set(
                  'metaDescription',
                  e.target.value
                )
              }
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Meta Keywords">
            <input
              value={settings.metaKeywords}
              onChange={(e) =>
                set('metaKeywords', e.target.value)
              }
              className={inputCls}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">

            <Field label="Google Analytics ID">
              <input
                value={settings.googleAnalyticsId}
                onChange={(e) =>
                  set(
                    'googleAnalyticsId',
                    e.target.value
                  )
                }
                className={inputCls}
                placeholder="G-XXXXXXXXXX"
              />
            </Field>

            <Field label="Google AdSense Publisher ID">
              <input
                value={settings.googleAdsenseId}
                onChange={(e) =>
                  set(
                    'googleAdsenseId',
                    e.target.value
                  )
                }
                className={inputCls}
                placeholder="ca-pub-XXXXXXXX"
              />
            </Field>

          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={Bell}>

          <div className="flex items-center justify-between">

            <div>
              <div className="text-sm font-medium">
                Enable Push Notifications
              </div>

              <div className="text-xs text-muted-foreground mt-0.5">
                Firebase Cloud Messaging
              </div>
            </div>

            <Toggle
              value={settings.pushNotificationsEnabled}
              onChange={() =>
                set(
                  'pushNotificationsEnabled',
                  !settings.pushNotificationsEnabled
                )
              }
            />
          </div>

          {settings.pushNotificationsEnabled && (
            <Field label="VAPID Public Key">
              <input
                value={settings.vapidKey}
                onChange={(e) =>
                  set('vapidKey', e.target.value)
                }
                className={inputCls}
                placeholder="BNt..."
              />
            </Field>
          )}
        </Section>

        {/* Access */}
        <Section title="Access Control" icon={Shield}>

          {[
            {
              label: 'Allow New Registrations',
              desc: 'Allow users to create accounts',
              key: 'allowRegistration',
            },
            {
              label: 'Require Email Verification',
              desc: 'Verify email before access',
              key: 'requireEmailVerification',
            },
            {
              label: 'Maintenance Mode',
              desc: 'Temporarily disable platform access',
              key: 'maintenanceMode',
            },
          ].map(({ label, desc, key }) => (

            <div
              key={key}
              className="flex items-center justify-between"
            >

              <div>
                <div className="text-sm font-medium">
                  {label}
                </div>

                <div className="text-xs text-muted-foreground mt-0.5">
                  {desc}
                </div>
              </div>

              <Toggle
                value={(settings as any)[key]}
                onChange={() =>
                  set(
                    key,
                    !(settings as any)[key]
                  )
                }
              />

            </div>
          ))}

        </Section>

      </div>

    </AdminLayout>
  )
}