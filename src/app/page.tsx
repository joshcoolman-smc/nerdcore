import PostGrid from "@/features/posts/components/post-grid";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Nerdcore</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore the latest posts in our dashboard.
      </p>
      <PostGrid />
    </div>
  );
}
