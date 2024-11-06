### Image Configuration and Implementation

#### Next.js Image Configuration
```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
```

#### Image Implementation Guidelines
- Use Next.js Image component for optimization
- Maintain consistent aspect ratios via aspect-ratio CSS or wrapper divs
- Loading and error states should be rendered as gray rectangles matching image dimensions:
  ```tsx
  interface ImageWithFallbackProps {
    src: string
    alt: string
    width: number
    height: number
    className?: string
  }

  export function ImageWithFallback({ 
    src, 
    alt,
    width,
    height,
    className 
  }: ImageWithFallbackProps) {
    return (
      <div 
        className={cn(
          "relative bg-muted", // Using ShadCN's muted color for consistency
          className
        )}
        style={{ width, height }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
    )
  }
  ```
- Use consistent image dimensions within similar contexts (e.g., all post thumbnails same size)
- Follow proper caching strategies

#### Mock Image Guidelines
- Use high-quality Unsplash images for demo content
- Maintain consistent dimensions and aspect ratios
- Categorize images based on content type:
  - Tech posts: computer/code related images
  - Design posts: UI/UX related images
  - General posts: office/workspace images
- Store image URLs in mock repository using consistent Unsplash URL pattern
- Include fallback image URLs for error cases
# Next.js Blog Application Architecture Guide

## Core Requirements

### Application Features
- Public blog post viewing
- Supabase authentication (authenticated users only)
- Post management (create, edit, delete)
- Image upload handling
- Responsive post grid layout

### Success Criteria
A developer should be able to:
1. Clone repo and run:
```bash
pnpm install
pnpm run dev
```
2. Experience full functionality with mock blog content:
   - View public post grid without authentication
   - Log in via Supabase authentication
   - Access dashboard after login
   - View, create, edit, and delete posts
   - Upload images (stored temporarily)
   - Log out and see restricted access

## Feature Module Organization
```
src/
  features/
    posts/
      components/
        post-grid.tsx
        post-card.tsx
        post-form.tsx
        editor.tsx
      services/
        post.service.ts
        post.service.interface.ts
      repositories/
        post.repository.ts
        mock/
          mock-post.repository.ts
          factories/
            post.factory.ts
      types/
        post.schema.ts
      hooks/
        use-posts.ts
        use-post-editor.ts
      utils/
        post-transforms.ts
      index.ts
    auth/
      components/
        auth-nav.tsx
      services/
        auth.service.ts
      hooks/
        use-auth.ts
```

## Data Modeling

### Zod Schemas
```typescript
// features/posts/types/post.schema.ts
import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  imageUrl: z.string().url().optional(),
  excerpt: z.string().max(200).optional(),
  authorId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Post = z.infer<typeof PostSchema>

export const CreatePostDtoSchema = PostSchema.omit({ 
  id: true, 
  authorId: true,
  createdAt: true, 
  updatedAt: true 
})
export type CreatePostDto = z.infer<typeof CreatePostDtoSchema>
```

## Implementation Requirements

### Page Routes
```typescript
// app/posts/page.tsx
import { PostGrid } from '@/features/posts/components/post-grid'

export default function PostsPage() {
  return <PostGrid />
}

// app/dashboard/posts/[id]/edit/page.tsx
import { PostEditor } from '@/features/posts/components/post-editor'

export default function EditPostPage({ params }: { params: { id: string } }) {
  return <PostEditor postId={params.id} />
}
```

### Client Components
```typescript
// features/posts/components/post-editor.tsx
'use client'

import { usePostEditor } from '../hooks/use-post-editor'
import { PostForm } from './post-form'

export function PostEditor({ postId }: { postId: string }) {
  const { post, loading, error, onSave } = usePostEditor(postId)
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorAlert error={error} />
  
  return <PostForm post={post} onSave={onSave} />
}
```

### Mock Repository Implementation
```typescript
// features/posts/repositories/mock/mock-post.repository.ts
import { PostRepository } from '../post.repository'
import { createMockPost } from './factories/post.factory'
import { Post, CreatePostDto, PostSchema } from '../../types/post.schema'

export class MockPostRepository implements PostRepository {
  private posts: Map<string, Post> = new Map()

  constructor() {
    this.seedMockData()
  }

  private async seedMockData(): Promise<void> {
    const mockPosts = Array.from({ length: 10 }, () => createMockPost())
    mockPosts.forEach(post => {
      const validated = PostSchema.parse(post)
      this.posts.set(validated.id, validated)
    })
  }

  async getPosts(): Promise<Post[]> {
    await this.simulateNetworkDelay()
    return Array.from(this.posts.values())
  }

  // Additional repository methods...
}
```

### Factory Pattern for Mock Data
```typescript
// features/posts/repositories/mock/factories/post.factory.ts
import { faker } from '@faker-js/faker'
import { Post } from '../../../types/post.schema'

export function createMockPost(override?: Partial<Post>): Post {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    imageUrl: `https://images.unsplash.com/photo-${faker.string.numeric(10)}`,
    excerpt: faker.lorem.paragraph(),
    authorId: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...override
  }
}
```

### Service Layer
```typescript
// features/posts/services/post.service.interface.ts
import { Post, CreatePostDto } from '../types/post.schema'

export interface PostService {
  getPosts(): Promise<Post[]>
  getPost(id: string): Promise<Post>
  createPost(data: CreatePostDto): Promise<Post>
  updatePost(id: string, data: Partial<Post>): Promise<Post>
  deletePost(id: string): Promise<void>
}

// features/posts/services/post.service.ts
export class PostServiceImpl implements PostService {
  constructor(private readonly repository: PostRepository) {}
  
  async getPosts(): Promise<Post[]> {
    return this.repository.getPosts()
  }
  // Additional service methods...
}
```

### API Routes
```typescript
// app/api/posts/route.ts
import { PostSchema } from '@/features/posts/types/post.schema'
import { mockPostRepository } from '@/features/posts/repositories/mock'
import { PostServiceImpl } from '@/features/posts/services/post.service'

const postService = new PostServiceImpl(mockPostRepository)

export async function GET() {
  try {
    const posts = await postService.getPosts()
    const validatedPosts = z.array(PostSchema).parse(posts)
    return Response.json(validatedPosts)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Data validation error' }, { status: 400 })
    }
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
```

### Custom Hooks
```typescript
// features/posts/hooks/use-posts.ts
import { useQuery } from '@tanstack/react-query'
import { postService } from '../services'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.getPosts()
  })
}
```

## Component Guidelines

### ShadCN Component Usage
- Use ShadCN Card component for post grid items
- Use ShadCN Form components for post creation/editing
- Use ShadCN Dialog for confirmations
- Create custom components following ShadCN patterns when needed

### Theming
- Implement dark/light mode using next-themes
- Use Tailwind dark: modifier for dark mode styles
- Test all components in both modes
- Ensure proper contrast in both themes

### Image Handling
- Use Next.js Image component
- Configure proper image domains in next.config.js
- Implement loading states and fallbacks
- Handle aspect ratio consistency

## Mock Data Guidelines

1. **Content Generation**
   - Use faker.js for realistic post content
   - Generate varied post lengths and formats
   - Include realistic timestamps
   - Maintain referential integrity

2. **Image Placeholders**
   - Use Unsplash images with consistent dimensions
   - Categorize images based on post content
   - Implement fallback images

3. **State Management**
   - Use React Query for server state
   - Use Zustand for complex client state
   - Maintain consistent loading states
   - Handle optimistic updates

## Development Workflow

1. **Feature Implementation**
   - Define Zod schemas
   - Create repository interfaces
   - Implement mock repositories
   - Build service layer
   - Create UI components
   - Add API routes

2. **Testing Flow**
   - Verify Supabase authentication
   - Test post CRUD operations
   - Validate form submissions
   - Check responsive layouts
   - Verify dark/light mode

Remember:
- Keep mock implementations close to real-world scenarios
- Follow TypeScript best practices
- Maintain clean separation of concerns
- Document key architectural decisions