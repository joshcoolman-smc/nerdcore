"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/features/posts/types/post.schema";
import { postService } from "@/features/posts/services/PostService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SupabaseUploadService } from "@/features/upload/services/supabase-upload.service";
import { ImageUpload } from "@/features/upload/components/image-upload";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!post) return;

    const formData = new FormData(e.currentTarget);
    const updatedPost = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      excerpt: (formData.get("excerpt") as string) || undefined,
      imageUrl: formData.get("imageUrl") as string,
    };

    try {
      await postService.updatePost(post.id, updatedPost);
      router.push(`/posts/${post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post.title} required />
        </div>

        <div className="space-y-2">
          <Label>Post Image</Label>
          <ImageUpload
            uploadService={new SupabaseUploadService()}
            defaultImageUrl={post.imageUrl}
            onUploadComplete={(url) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = "imageUrl";
              input.value = url;
              document.querySelector("form")?.appendChild(input);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={post.excerpt || ""}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={post.content}
            required
            className="min-h-[200px]"
          />
        </div>

        <div className="flex space-x-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
