import { ThemeToggle } from "@/components/theme-toggle"
import { AuthStatus } from "@/components/auth-status"
import { createClient } from '@/utils/supabase/server'
import { Squirrel, Cat } from 'lucide-react'

export async function GlobalNav() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-zinc-300 dark:bg-black">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Nerdcore</div>
        {session ? (
          <div className="text-sm text-lime-500 flex items-center gap-1">
            <Cat className="h-4 w-4" />
            <span>{session.user.email}</span>
          </div>
        ) : (
          <div className="text-sm text-sky-300 flex items-center gap-1">
            <Squirrel className="h-4 w-4" />
            <span>coding is for the birds</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <AuthStatus />
        <ThemeToggle />
      </div>
    </nav>
  )
}
