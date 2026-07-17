'use client'
import UserLayout from '@/components/layout/UserLayout'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

const QUESTIONS = [
  { id: 1, category: 'React', q: 'What is the difference between useState and useReducer?', a: 'useState is best for simple, independent state values. useReducer is preferred when the next state depends on the previous one or when you have complex state logic with multiple sub-values. useReducer also makes it easier to test state transitions in isolation.' },
  { id: 2, category: 'React', q: 'Explain React\'s reconciliation algorithm.', a: 'React uses a diffing algorithm to compare the new virtual DOM with the previous one. It compares elements of the same type, recurses on children, and uses keys to identify which items have changed, been added, or been removed. The key insight is that it operates in O(n) time instead of O(n³) by making heuristic assumptions.' },
  { id: 3, category: 'JavaScript', q: 'What is the event loop in JavaScript?', a: 'The event loop is a mechanism that allows JavaScript to perform non-blocking operations. It continuously checks if the call stack is empty, then takes the first task from the task queue (macrotasks) or microtask queue and pushes it to the call stack. Microtasks (Promises) are always processed before macrotasks (setTimeout, setInterval).' },
  { id: 4, category: 'JavaScript', q: 'Difference between == and ===?', a: '== performs type coercion before comparison (loose equality), while === compares both value and type without coercion (strict equality). For example, 0 == false is true but 0 === false is false. Always prefer === to avoid unexpected type coercion bugs.' },
  { id: 5, category: 'System Design', q: 'How would you design a URL shortener like bit.ly?', a: 'Key components: 1) API service to accept long URLs and return short codes, 2) Hash function (base62 encoding of an auto-incremented ID) to generate unique short codes, 3) NoSQL database (DynamoDB or Cassandra) to store URL mappings, 4) Redis cache for frequently accessed URLs, 5) CDN for geographic distribution, 6) Analytics service for click tracking.' },
  { id: 6, category: 'HR', q: 'Tell me about yourself.', a: 'Structure: Present (current role/skills), Past (relevant experience that led here), Future (what you want to achieve and how this role fits). Keep it under 2 minutes. Focus on professional achievements and connect them to the role you\'re applying for. Avoid reciting your resume — add context and passion.' },
  { id: 7, category: 'HR', q: 'Why do you want to leave your current job?', a: 'Focus on what you\'re moving toward, not away from. Good answers: seeking new challenges, want to work with specific technologies, want to grow in a particular direction, excited about the company\'s mission. Avoid: criticizing your current employer, mentioning salary as the only reason, or badmouthing colleagues.' },
  { id: 8, category: 'Node.js', q: 'What is the difference between process.nextTick() and setImmediate()?', a: 'process.nextTick() fires before any I/O events or timers in the same iteration of the event loop. setImmediate() fires in the check phase of the event loop, after I/O events. Use process.nextTick() for callbacks that need to execute before I/O and setImmediate() when you want to execute after I/O. Recursive process.nextTick() calls can starve the event loop.' },
]

const CATEGORIES = ['All', 'React', 'JavaScript', 'Node.js', 'System Design', 'HR']

export default function InterviewQuestionsPage() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)
  const filtered = QUESTIONS.filter(q => (cat === 'All' || q.category === cat) && (q.q.toLowerCase().includes(search.toLowerCase())))
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Interview <span className="gradient-text">Questions</span></h1>
          <p className="text-muted-foreground">Practice with real questions asked at top Indian and global tech companies.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 glass-card rounded-xl">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-sm transition-all ${cat === c ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'glass-card text-muted-foreground hover:text-foreground'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="glass-card rounded-2xl overflow-hidden">
              <button onClick={() => setOpenId(openId === item.id ? null : item.id)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/3 transition-all">
                <span className="px-2 py-1 text-xs rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">{item.category}</span>
                <span className="flex-1 text-sm font-medium">{item.q}</span>
                {openId === item.id ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              </button>
              {openId === item.id && (
                <div className="px-5 pb-5 border-t border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed pt-4">{item.a}</p>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground"><div className="text-4xl mb-4">🤔</div><p>No questions found</p></div>}
        </div>
      </div>
    </UserLayout>
  )
}
