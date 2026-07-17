'use client'
import UserLayout from '@/components/layout/UserLayout'
import { CheckCircle, XCircle, Download } from 'lucide-react'

const TIPS = [
  { title: '1. Use ATS-Friendly Formatting', content: 'Most companies use Applicant Tracking Systems (ATS) to filter resumes. Use standard fonts (Arial, Calibri), avoid tables/columns, use standard section headings, and save as PDF or .docx.', do: ['Use bullet points', 'Standard section headers (Experience, Education, Skills)', 'Simple one-column layout', 'Include keywords from job description'], dont: ['Tables or multi-column layouts', 'Headers/footers with important info', 'Images or graphics', 'Fancy fonts or colors'] },
  { title: '2. Quantify Achievements', content: 'Numbers make your accomplishments concrete and credible. Every bullet point should ideally answer: what did you do, how did you do it, and what was the measurable impact?', do: ['Increased API performance by 40%', 'Led team of 5 engineers', 'Reduced CI/CD pipeline time from 45 to 12 minutes', 'Built feature used by 2M+ users'], dont: ['Responsible for backend', 'Worked on various projects', 'Improved performance', 'Helped with team tasks'] },
  { title: '3. Tailor for Each Job', content: 'A generic resume rarely wins. Spend 15 minutes per application customizing your resume to mirror the job description language and prioritize the most relevant experience.', do: ['Mirror keywords from job description', 'Reorder bullets by relevance', 'Customize your summary/objective', 'Highlight matching tech stack'], dont: ['Use one resume for all jobs', 'Include irrelevant experience', 'Keep outdated skills prominent', 'Use generic objective statements'] },
]

export default function ResumeTipsPage() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Resume <span className="gradient-text">Tips</span></h1>
          <p className="text-muted-foreground">Write a resume that gets past ATS, impresses recruiters, and lands interviews.</p>
        </div>
        <div className="space-y-8">
          {TIPS.map((tip, i) => (
            <div key={i} className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-3">{tip.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tip.content}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-semibold text-sm mb-3"><CheckCircle className="w-4 h-4" /> Do This</div>
                  <ul className="space-y-2">
                    {tip.do.map((d, j) => <li key={j} className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-3"><XCircle className="w-4 h-4" /> Avoid This</div>
                  <ul className="space-y-2">
                    {tip.dont.map((d, j) => <li key={j} className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span>{d}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-8 mt-8 text-center gradient-border">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="font-display text-2xl font-bold mb-2">Download Free Resume Template</h3>
          <p className="text-muted-foreground text-sm mb-6">ATS-optimized, recruiter-approved resume template used by 10,000+ job seekers.</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
            <Download className="w-4 h-4" /> Download Template (Free)
          </button>
        </div>
      </div>
    </UserLayout>
  )
}
