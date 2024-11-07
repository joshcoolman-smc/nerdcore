import { useState, useEffect } from "react";
import { Post } from "../types/post.schema";
import { postService } from "../services/post.service";

export function usePostEditor(postId: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await postService.getPost(postId);
        setPost(fetchedPost);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  const onSave = async (updatedPost: Partial<Post>) => {
    try {
      const savedPost = await postService.updatePost(postId, updatedPost);
      setPost(savedPost);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { post, loading, error, onSave };
}
