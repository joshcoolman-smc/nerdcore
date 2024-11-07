import { Post, CreatePostDto, PostSchema } from "../types/post.schema";
import { IPostRepository } from "./IPostRepository";

export class MockPostRepository implements IPostRepository {
  private posts: Map<string, Post> = new Map();

  constructor() {
    this.seedMockData();
  }

  private seedMockData() {
    const mockPosts: Post[] = [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Exploring the Future of AI",
        content: "Artificial Intelligence is transforming industries across the globe, from healthcare to transportation. Learn about the latest developments.",
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        excerpt: "AI is transforming industries...",
        authorId: "550e8400-e29b-41d4-a716-446655440001",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "The Rise of Electric Vehicles",
        content: "Electric vehicles are becoming more popular as technology advances and infrastructure improves. Discover the latest trends.",
        imageUrl: "https://images.unsplash.com/photo-1511391409280-894f3f3f8a5c",
        excerpt: "Electric vehicles are on the rise...",
        authorId: "550e8400-e29b-41d4-a716-446655440003",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        title: "Sustainable Living: Tips and Tricks",
        content: "Sustainable living is essential for our planet. Learn practical ways to reduce your carbon footprint and live more sustainably.",
        imageUrl: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
        excerpt: "Sustainable living is essential...",
        authorId: "550e8400-e29b-41d4-a716-446655440005",
        createdAt: new Date("2023-03-01"),
        updatedAt: new Date("2023-03-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440007",
        title: "The Future of Web Development",
        content: "Explore the latest trends in web development, from serverless architectures to edge computing and everything in between.",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        excerpt: "Web development is evolving...",
        authorId: "550e8400-e29b-41d4-a716-446655440008",
        createdAt: new Date("2023-04-01"),
        updatedAt: new Date("2023-04-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440009",
        title: "Cybersecurity Best Practices",
        content: "Stay safe online with these essential cybersecurity tips and best practices for individuals and organizations.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        excerpt: "Protect yourself online...",
        authorId: "550e8400-e29b-41d4-a716-446655440010",
        createdAt: new Date("2023-05-01"),
        updatedAt: new Date("2023-05-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440011",
        title: "Machine Learning Applications",
        content: "Discover real-world applications of machine learning and how it's revolutionizing different industries.",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        excerpt: "ML in the real world...",
        authorId: "550e8400-e29b-41d4-a716-446655440012",
        createdAt: new Date("2023-06-01"),
        updatedAt: new Date("2023-06-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440013",
        title: "The Rise of Remote Work",
        content: "How remote work is changing the workplace landscape and tips for successful remote collaboration.",
        imageUrl: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51",
        excerpt: "Remote work revolution...",
        authorId: "550e8400-e29b-41d4-a716-446655440014",
        createdAt: new Date("2023-07-01"),
        updatedAt: new Date("2023-07-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440015",
        title: "Blockchain Technology Explained",
        content: "Understanding blockchain technology and its potential impact on various industries beyond cryptocurrency.",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
        excerpt: "Blockchain beyond crypto...",
        authorId: "550e8400-e29b-41d4-a716-446655440016",
        createdAt: new Date("2023-08-01"),
        updatedAt: new Date("2023-08-02"),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440017",
        title: "Green Energy Solutions",
        content: "Exploring renewable energy solutions and their role in creating a sustainable future for our planet.",
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
        excerpt: "Renewable energy future...",
        authorId: "550e8400-e29b-41d4-a716-446655440018",
        createdAt: new Date("2023-09-01"),
        updatedAt: new Date("2023-09-02"),
      }
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
