import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | JobBoard',
  description: 'Review the terms and conditions for candidates and employers using the JobBoard hiring platform.',
}

export default function TermsPage() {
  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6">Terms <span className="gradient-text">of Service</span></h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: July 17, 2026</p>
        
        <div className="glass-card rounded-2xl p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">1. Agreement to Terms</h2>
            <p>By accessing and using JobBoard (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree, you must immediately cease using our services.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">2. User Account Security</h2>
            <p>You are responsible for keeping your password secure and maintaining the accuracy of your account information. You must immediately notify us of any unauthorized use of your credentials.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">3. Listing and Posting Rules</h2>
            <p>Employers agree that all job postings represent real, active hiring needs, include accurate description details, and do not violate local labor laws. Spam, fake offers, or listings demanding payment from candidates will be deleted immediately without refund.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">4. Limitation of Liability</h2>
            <p>JobBoard is a matching platform. We do not employ job seekers, nor are we responsible for any decisions made during the hiring, interviewing, or subsequent contract phases.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">5. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be posted here with an updated revision date.</p>
          </section>
        </div>
      </div>
    </UserLayout>
  )
}
