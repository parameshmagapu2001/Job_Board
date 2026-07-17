// src/app/contact/page.tsx
import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | JobBoard',
  description: 'Get in touch with JobBoard support, sales, or partnerships team. We are here to help startups and candidates.',
}

export default function ContactPage() {
  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h1>
          <p className="text-muted-foreground max-w-md mx-auto">Have questions about listings, pricing, or custom options? Drop us a line and our team will get back within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold mb-4">Contact Info</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0"><Mail className="w-4 h-4" /></div>
                  hello@jobboard.in
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0"><Phone className="w-4 h-4" /></div>
                  +91 (80) 4123-5678
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5"><MapPin className="w-4 h-4" /></div>
                  JobBoard Tech Hub, Indiranagar,<br />Bengaluru, Karnataka 560038
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <h3 className="font-display font-semibold mb-2">Technical Support</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">Encountered an issue with candidate applications, profiles, or job posting tools?</p>
              <a href="mailto:support@jobboard.in" className="text-xs text-cyan-400 font-semibold hover:underline">Email Support →</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
