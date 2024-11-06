'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import SignOutButton from './SignOutButton'
import { Button } from './ui/button'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <SignOutButton />
        </>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  )
}
