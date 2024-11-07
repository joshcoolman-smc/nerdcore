"use client";

import { usePostEditor } from "../hooks/use-post-editor";
import { PostForm } from "./post-form";

export function PostEditor({ postId }: { postId: string }) {
  const { post, loading, error, onSave } = usePostEditor(postId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>No post found</div>; // Handle null post case

  return <PostForm post={post} onSave={onSave} />;
}
