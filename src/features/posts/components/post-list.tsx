"use client";

import { useEffect, useState } from "react";
import { Post } from "../types/post.schema";
import { postService } from "../services/PostService";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(postId: string) {
    try {
      await postService.deletePost(postId);
      await fetchPosts(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  }

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => router.push('/posts/new')}
          className="mb-4"
        >
          New Post
        </Button>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center space-x-4 p-4 border rounded-lg"
        >
          <AppImage
            src={post.imageUrl}
            alt={post.title}
            width={64}
            height={64}
            aspectRatio={1}
            rounded="md"
            className="flex-shrink-0"
          />
          <div className="flex-grow">
            <Link
              href={`/posts/${post.id}`}
              className="text-lg font-semibold hover:underline"
            >
              {post.title}
            </Link>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/posts/edit/${post.id}`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(post.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
