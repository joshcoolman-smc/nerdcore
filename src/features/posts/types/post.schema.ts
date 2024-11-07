import { z } from "zod";

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  imageUrl: z.string().url().optional(),
  excerpt: z.string().max(200).optional(),
  authorId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Post = z.infer<typeof PostSchema>;

export const CreatePostDtoSchema = PostSchema.omit({
  id: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreatePostDto = z.infer<typeof CreatePostDtoSchema>;
