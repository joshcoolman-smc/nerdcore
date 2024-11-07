import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Protected Page</h1>
        <p>You are logged in as: {session.user.email}</p>
      </div>
    </div>
  )
}
import PostList from "@/features/posts/components/post-list";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <PostList />
    </div>
  );
}
