"use client";

import { useEffect, useState } from "react";
import { postService } from "../services/post.service";
import { Post } from "../types/post.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="aspect-square">
            <CardHeader>
              <CardTitle>Title Here</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Content Here</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
