import { createClient } from "@/utils/supabase/client";
import { IUploadService, UploadResponse, UploadOptions } from "../types/upload.types";

export class SupabaseUploadService implements IUploadService {
  private supabase = createClient();
  private BUCKET_NAME = 'post-images';

  async uploadFile(file: File, options?: UploadOptions): Promise<UploadResponse> {
    const path = `${Date.now()}-${file.name}`;
    
    const { data, error } = await this.supabase
      .storage
      .from(this.BUCKET_NAME)
      .upload(path, file);

    if (error) throw error;

    const { data: { publicUrl } } = this.supabase
      .storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(data.path);

    return {
      url: publicUrl,
      path: data.path
    };
  }
}
