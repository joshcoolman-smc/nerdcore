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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full p-12">
      {posts.map((post) => (
        <div key={post.id} className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full aspect-[3/2] object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevents looping
                    e.currentTarget.src = "";
                    e.currentTarget.style.backgroundColor = "#e2e8f0"; // Tailwind gray-200
                    e.currentTarget.style.display = "flex";
                    e.currentTarget.style.alignItems = "center";
                    e.currentTarget.style.justifyContent = "center";
                    e.currentTarget.style.height = "48px";
                    e.currentTarget.innerText = "No image";
                  }}
                />
              ) : (
                <div className="w-full aspect-[3/2] bg-gray-200 flex items-center justify-center">
                  No image
                </div>
              )}
              <p>{post.excerpt}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
