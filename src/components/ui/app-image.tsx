"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface AppImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export function AppImage({ src, alt, className }: AppImageProps) {
  return (
    <AspectRatio ratio={3 / 2} className={className}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-zinc-900 rounded-t-lg" />
      )}
    </AspectRatio>
  );
}
