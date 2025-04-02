'use client'

import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/firebase.config'
import { useEffect, useState, ComponentType } from 'react'
import { User } from 'firebase/auth'

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function ProtectedRoute(props: P) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser)
        setIsLoading(false)
        
        if (!currentUser) {
          router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
        }
      })

      return () => unsubscribe()
    }, [router])

    if (isLoading) {
      return <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-cyan-500 h-2.5 rounded-full animate-progress"></div>
    </div>
    }

    return user ? <Component {...props} /> : null
  }
}