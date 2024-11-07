import { IUploadService, UploadResponse, UploadOptions } from "../types/upload.types";

export class MockUploadService implements IUploadService {
  async uploadFile(file: File, options?: UploadOptions): Promise<UploadResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    
    return {
      url,
      path: `mock-uploads/${file.name}`
    };
  }
}
