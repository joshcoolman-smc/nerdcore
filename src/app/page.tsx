import PostList from "@/features/posts/components/post-list";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <PostList />
    </div>
  );
}
