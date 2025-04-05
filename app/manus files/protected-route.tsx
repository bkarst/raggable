'use client'

import { useAuth } from '@/components/auth-provider'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user && !pathname.startsWith('/auth')) {
      router.push('/auth/login')
    }
  }, [isLoading, user, router, pathname])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="mt-4 text-gray-600">Please wait while we verify your authentication.</p>
      </div>
    )
  }

  // If on auth page or authenticated, show content
  if (pathname.startsWith('/auth') || user) {
    return <>{children}</>
  }

  // This should not be visible due to the redirect in useEffect
  return null
}
