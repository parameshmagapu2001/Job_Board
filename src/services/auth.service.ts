import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { createDocument, updateDocument } from '@/firebase/collections'

export const authService = {
  loginWithEmail: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
  registerWithEmail: async (email: string, password: string, name: string, role: 'user' | 'employer' = 'user') => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    await createDocument('users', { uid: cred.user.uid, email, displayName: name, role, photoURL: '' })
    return cred
  },
  loginWithGoogle: async (role: 'user' | 'employer' = 'user') => {
    const cred = await signInWithPopup(auth, new GoogleAuthProvider())
    await createDocument('users', { uid: cred.user.uid, email: cred.user.email, displayName: cred.user.displayName, role, photoURL: cred.user.photoURL })
    return cred
  },
  logout: () => signOut(auth),
  resetPassword: (email: string) => sendPasswordResetEmail(auth, email),
}
