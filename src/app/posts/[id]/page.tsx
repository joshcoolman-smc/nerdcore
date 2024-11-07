"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { Post } from "@/features/posts/types/post.schema";
import { postService } from "@/features/posts/services/PostService";
import { AppImage } from "@/components/ui/app-image";

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

  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
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
        Posted: {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
}
