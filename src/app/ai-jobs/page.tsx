// src/app/ai-jobs/page.tsx
import { Metadata } from 'next'
import UserLayout from '@/components/layout/UserLayout'
import { Brain, Cpu, Database, Sparkles } from 'lucide-react'
import JobsGrid from '@/components/jobs/JobsGrid'
import { Job } from '@/types'
import { getAiMockJobs } from '@/data/jobsData'

export const metadata: Metadata = {
  title: 'AI & Machine Learning Jobs | JobBoard',
  description: 'Explore active artificial intelligence, deep learning, NLP, and machine learning engineer jobs at premium tech companies.',
}

const AI_JOBS = getAiMockJobs() as Partial<Job>[]

const STATS = [
  { icon: Brain, title: 'Artificial Intelligence', desc: 'Work on Large Language Models, GPTs, agents, and semantic search.' },
  { icon: Cpu, title: 'Deep Learning', desc: 'Train complex models using PyTorch, TensorFlow, and advanced GPUs.' },
  { icon: Database, title: 'Big Data', desc: 'Process and structure huge datasets for training high-quality systems.' },
  { icon: Sparkles, title: 'Generative Tech', desc: 'Create cutting-edge tools with GenAI, LangChain, and vector databases.' },
]

export default function AiJobsPage() {
  return (
    <UserLayout>
      <section className="relative py-20 overflow-hidden grid-pattern">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 text-sm text-indigo-400 mb-6">
            <Brain className="w-4 h-4" /> AI & Machine Learning Roles
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Artificial <span className="gradient-text">Intelligence Jobs</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Step into the future. Discover AI Engineer, Data Scientist, NLP Specialist, and Machine Learning jobs at the forefront of technology.</p>
        </div>
      </section>

      <section className="py-12 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3"><Icon className="w-5 h-5 text-indigo-400" /></div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold mb-8">Latest AI & Machine Learning Jobs</h2>
          <JobsGrid jobs={AI_JOBS} />
        </div>
      </section>
    </UserLayout>
  )
}
