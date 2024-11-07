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
    return data.map(post => ({
      ...post,
      imageUrl: post.image_url,
      authorId: post.author_id,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at)
    })) as Post[];
  }

  async getPost(id: string): Promise<Post> {
    const { data, error } = await this.supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Post not found');
    return {
      ...data,
      imageUrl: data.image_url,
      authorId: data.author_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    } as Post;
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    // Get the current user's ID
    const { data: { user }, error: userError } = await this.supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('User must be logged in to create a post');

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

    // Create the post with the current user as author
    const { data: post, error } = await this.supabase
      .from('posts')
      .insert([{ 
        title: data.title,
        content: data.content,
        image_url: imageUrl,
        author_id: user.id,
        excerpt: data.content.substring(0, 150) + '...' // Generate an excerpt
      }])
      .select()
      .single();

    if (error) throw error;
    return {
      ...post,
      imageUrl: post.image_url,
      authorId: post.author_id,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at)
    } as Post;
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
