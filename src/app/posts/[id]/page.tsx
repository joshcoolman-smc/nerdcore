"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { Post } from "@/features/posts/types/post.schema";
import { postService } from "@/features/posts/services/PostService";
import { AppImage } from "@/components/ui/app-image";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const id = use(params).id;

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await postService.getPost(id);
        setPost(fetchedPost);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found</div>;

  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <article className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {session && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/posts/edit/${post.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="mb-6">
        <AppImage
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded-lg"
        />
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>{post.content}</p>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Posted: {post.createdAt instanceof Date 
          ? post.createdAt.toLocaleDateString() 
          : new Date(post.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
}
