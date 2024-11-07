"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useState } from "react";

interface AppImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspectRatio?: number;
  width?: number;
  height?: number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  fallbackClassName?: string;
}

export function AppImage({ 
  src, 
  alt, 
  className,
  aspectRatio = 3/2,
  width,
  height,
  rounded = "lg",
  fallbackClassName
}: AppImageProps) {
  const [hasError, setHasError] = useState(false);

  const roundedClass = rounded ? `rounded-${rounded}` : '';
  const fallbackClasses = fallbackClassName || `bg-zinc-900 ${roundedClass}`;

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${roundedClass}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className={`w-full h-full ${fallbackClasses}`} />
      )}
    </AspectRatio>
  );
}
