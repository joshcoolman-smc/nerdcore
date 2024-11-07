import { Post, CreatePostDto } from "../types/post.schema";
import { IPostRepository } from "../repositories/IPostRepository";
import { IPostService } from "./IPostService";
import { MockPostRepository } from "../repositories/MockPostRepository";
import { SupabasePostRepository } from "../repositories/SupabasePostRepository";

export class PostService implements IPostService {
  constructor(private readonly repository: IPostRepository) {}

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

export const postService = new PostService(new SupabasePostRepository());
