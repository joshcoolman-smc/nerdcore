"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { IUploadService } from "../types/upload.types";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  uploadService: IUploadService;
  defaultImageUrl?: string | null;
  className?: string;
}

export function ImageUpload({ 
  onUploadComplete, 
  uploadService,
  defaultImageUrl,
  className 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl || null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      const { url } = await uploadService.uploadFile(file);
      setPreviewUrl(url);
      onUploadComplete(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }, [uploadService, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
          "hover:bg-muted/50 transition-colors",
          isDragActive && "border-primary bg-muted/50",
          "relative min-h-[200px] flex items-center justify-center"
        )}
      >
        <input {...getInputProps()} />
        
        {previewUrl ? (
          <div className="relative w-full h-[200px]">
            <Image
              src={previewUrl}
              alt="Upload preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop an image here, or click to select
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
      </div>

      {previewUrl && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => {
            setPreviewUrl(null);
            onUploadComplete('');
          }}
        >
          Remove Image
        </Button>
      )}
    </div>
  );
}
