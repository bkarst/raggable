'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthUser, getCurrentUser, signIn, signInWithGoogle, signOut, signUp } from '@/lib/auth'

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getCurrentUser()
        setUser(user)
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  async function handleSignUp(email: string, password: string, name?: string) {
    try {
      setIsLoading(true)
      const { user } = await signUp(email, password, name)
      if (user) {
        setUser({
          id: user.id,
          email: user.email!,
          name: name || null
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignIn(email: string, password: string) {
    try {
      setIsLoading(true)
      await signIn(email, password)
      const user = await getCurrentUser()
      setUser(user)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignInWithGoogle() {
    try {
      const { url } = await signInWithGoogle()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  async function handleSignOut() {
    try {
      setIsLoading(true)
      await signOut()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
