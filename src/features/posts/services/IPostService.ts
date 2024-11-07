import { Post, CreatePostDto } from "../types/post.schema";

export interface IPostService {
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post>;
  createPost(data: CreatePostDto): Promise<Post>;
  updatePost(id: string, data: Partial<Post>): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
