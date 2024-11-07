import { createClient } from '@/utils/supabase/client';
import { IPostRepository } from './IPostRepository';
import { Post, CreatePostDto } from '../types/post.schema';

export class SupabasePostRepository implements IPostRepository {
  private supabase = createClient();

  async getPosts(): Promise<Post[]> {
    const { data, error } = await this.supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Post[];
  }

  async getPost(id: string): Promise<Post> {
    const { data, error } = await this.supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Post not found');
    return data as Post;
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    // Handle image upload if imageUrl is a File/Blob
    let imageUrl = data.imageUrl;
    if (data.imageUrl && data.imageUrl instanceof File) {
      const { data: uploadData, error: uploadError } = await this.supabase
        .storage
        .from('post-images')
        .upload(`${Date.now()}-${data.imageUrl.name}`, data.imageUrl);

      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = this.supabase
        .storage
        .from('post-images')
        .getPublicUrl(uploadData.path);
      
      imageUrl = publicUrl;
    }

    const { data: post, error } = await this.supabase
      .from('posts')
      .insert([{ ...data, image_url: imageUrl }])
      .select()
      .single();

    if (error) throw error;
    return post as Post;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    // Handle image upload if imageUrl is a File/Blob
    let imageUrl = data.imageUrl;
    if (data.imageUrl && data.imageUrl instanceof File) {
      const { data: uploadData, error: uploadError } = await this.supabase
        .storage
        .from('post-images')
        .upload(`${Date.now()}-${data.imageUrl.name}`, data.imageUrl);

      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = this.supabase
        .storage
        .from('post-images')
        .getPublicUrl(uploadData.path);
      
      imageUrl = publicUrl;
    }

    const { data: post, error } = await this.supabase
      .from('posts')
      .update({ ...data, image_url: imageUrl })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return post as Post;
  }

  async deletePost(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
