"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface EditPostButtonProps {
  postId: string;
}

export function EditPostButton({ postId }: EditPostButtonProps) {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (!session) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push(`/posts/edit/${postId}`)}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
