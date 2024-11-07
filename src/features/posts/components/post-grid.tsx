"use client";

import { useEffect, useState } from "react";
import { postService } from "../services/PostService";
import { Post } from "../types/post.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppImage } from "@/components/ui/app-image";

export default function PostGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {posts.map((post) => (
          <Card key={post.id}>
            <AppImage src={post.imageUrl} alt={post.title} />
            <CardHeader>
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
