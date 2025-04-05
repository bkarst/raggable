// src/lib/auth.ts
import { supabase } from './supabase'
import { prisma } from './prisma'

export type AuthUser = {
  id: string
  email: string
  name?: string | null
  avatarUrl?: string | null
}

export async function signUp(email: string, password: string, name?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })

    if (error) {
      throw error
    }

    if (data.user) {
      // Create user in our database
      await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email!,
          name: name || null
        }
      })

      return { user: data.user, session: data.session }
    }

    return { user: null, session: null }
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      throw error
    }

    return { url: data.url }
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data.user) {
      return null
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata.name,
      avatarUrl: data.user.user_metadata.avatar_url
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      throw error
    }
    
    return data.session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}
