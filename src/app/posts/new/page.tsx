"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postService } from "@/features/posts/services/PostService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const newPost = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        excerpt: formData.get("excerpt") as string || undefined,
        imageUrl: formData.get("imageUrl") as string || null,
      };

      const post = await postService.createPost(newPost);
      router.push(`/posts/${post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Enter post title"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image URL (optional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            placeholder="Write a brief excerpt (optional)"
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            required
            placeholder="Write your post content here..."
            className="min-h-[200px]"
          />
        </div>

        <div className="flex space-x-4">
          <Button type="submit">Create Post</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
