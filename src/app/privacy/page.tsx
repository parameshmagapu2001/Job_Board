import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | JobBoard',
  description: 'Understand how JobBoard collects, protects, and uses personal candidate and employer information securely.',
}

export default function PrivacyPage() {
  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6">Privacy <span className="gradient-text">Policy</span></h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: July 17, 2026</p>
        
        <div className="glass-card rounded-2xl p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p>We collect information directly from you when you register an account, upload a resume, create a company profile, post a job, or apply for jobs. This may include your name, email address, password, phone number, employment history, and payment details.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use your information to facilitate matches between recruiters and job seekers, process transactions, send job alerts, provide user support, and optimize page performance. We also utilize anonymous user metrics for analytics.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">3. Data Sharing & Third Parties</h2>
            <p>When you apply for a job, your profile details, resume, and contact information are shared with the respective employer. We do not sell your personal details to advertising networks or third-party marketing services.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">4. Security of Your Data</h2>
            <p>We use industry-standard measures to secure your data in Firestore Database and Firebase Authentication. However, no transmission over the Internet is 100% secure, and we cannot guarantee complete security.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">5. Contact Us</h2>
            <p>If you have any questions about our privacy policies, you can contact us at privacy@jobboard.in.</p>
          </section>
        </div>
      </div>
    </UserLayout>
  )
}
