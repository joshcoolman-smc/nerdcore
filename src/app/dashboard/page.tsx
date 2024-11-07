import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PostList from "@/features/posts/components/post-list";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4">
      <PostList />
    </div>
  );
}
