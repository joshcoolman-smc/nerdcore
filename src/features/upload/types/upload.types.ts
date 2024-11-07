export interface UploadResponse {
  url: string;
  path?: string;
}

export interface UploadOptions {
  maxSize?: number;
  acceptedFileTypes?: string[];
}

export interface IUploadService {
  uploadFile(file: File, options?: UploadOptions): Promise<UploadResponse>;
}
