import { Post, CreatePostDto, PostSchema } from "../types/post.schema";

export interface PostRepository {
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post>;
  createPost(data: CreatePostDto): Promise<Post>;
  updatePost(id: string, data: Partial<Post>): Promise<Post>;
  deletePost(id: string): Promise<void>;
}

export class MockPostRepository implements PostRepository {
  private posts: Map<string, Post> = new Map();

  constructor() {
    this.seedMockData();
  }

  private seedMockData() {
    const mockPosts: Post[] = [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Exploring the Future of AI",
        content: "Artificial Intelligence is transforming industries...",
        imageUrl:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        excerpt: "AI is transforming industries...",
        authorId: "550e8400-e29b-41d4-a716-446655440001",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "The Rise of Electric Vehicles",
        content: "Electric vehicles are becoming more popular...",
        imageUrl:
          "https://images.unsplash.com/photo-1511391409280-894f3f3f8a5c",
        excerpt: "Electric vehicles are on the rise...",
        authorId: "550e8400-e29b-41d4-a716-446655440003",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        title: "Sustainable Living: Tips and Tricks",
        content: "Sustainable living is essential for our planet...",
        imageUrl:
          "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
        excerpt: "Sustainable living is essential...",
        authorId: "550e8400-e29b-41d4-a716-446655440005",
        createdAt: new Date("2023-03-01"),
        updatedAt: new Date("2023-03-02"),
      },
    ];

    mockPosts.forEach((post) => {
      const validated = PostSchema.parse(post);
      this.posts.set(validated.id, validated);
    });
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getPost(id: string): Promise<Post> {
    const post = this.posts.get(id);
    if (!post) throw new Error("Post not found");
    return post;
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      ...data,
      id: "550e8400-e29b-41d4-a716-446655440006",
      authorId: "550e8400-e29b-41d4-a716-446655440007",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.set(newPost.id, newPost);
    return newPost;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const post = this.posts.get(id);
    if (!post) throw new Error("Post not found");
    const updatedPost = { ...post, ...data, updatedAt: new Date() };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<void> {
    this.posts.delete(id);
  }
}
