'use client'
// src/app/providers.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { getDocument } from '@/firebase/collections'

interface AuthContextType {
  user: User | null
  userProfile: any | null
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, loading: true, isAdmin: false })

export const useAuth = () => useContext(AuthContext)

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const profile = await getDocument('users', firebaseUser.uid)
        setUserProfile(profile)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAdmin: userProfile?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}
