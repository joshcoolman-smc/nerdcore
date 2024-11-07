import { Post, CreatePostDto } from "../types/post.schema";
import { MockPostRepository } from "../repositories/post.repository";

export class PostServiceImpl {
  constructor(private readonly repository: MockPostRepository) {}

  async getPosts(): Promise<Post[]> {
    return this.repository.getPosts();
  }

  async getPost(id: string): Promise<Post> {
    return this.repository.getPost(id);
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    return this.repository.createPost(data);
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    return this.repository.updatePost(id, data);
  }

  async deletePost(id: string): Promise<void> {
    return this.repository.deletePost(id);
  }
}

export const postService = new PostServiceImpl(new MockPostRepository());
