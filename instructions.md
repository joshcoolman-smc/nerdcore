# Next.js Blog Application Architecture Guide

## Core Requirements

### Application Features
- Public blog post viewing
- User authentication (mock accepts any email/password)
- Post management (create, edit, delete)
- Image upload handling
- Responsive post grid layout

### Success Criteria
A developer should be able to:
1. Clone repo and run:
```bash
npm install
npm run dev
```
2. Experience full functionality immediately with mock data:
   - View public post grid without authentication
   - Log in with any email/password
   - See dashboard link appear after login
   - View, create, edit, and delete posts
   - Upload images (stored temporarily)
   - Log out and see restricted access

### Data Schema
[Previous schema SQL remains the same]

## Implementation Requirements

### Page Routes
- Must be pure server components (no "use client" directives)
- All client-side logic must be in imported components
- Page routes should only handle layout and component composition
- Client components should be colocated in feature directories

### Feature Requirements

#### Authentication
- Mock auth accepts any email/password
- Login/logout functionality
- Conditional navigation items based on auth state
- Protected routes for post management

#### Posts
Public Features:
- Grid view of posts (title, image, description)
- Individual post detail pages
- Responsive card layout

Authenticated Features:
- Create new posts
- Edit existing posts
- Delete posts
- Image upload per post

### Form Handling
- Use Zod schemas derived from database schema
- All validation through Zod
- Required fields matching schema constraints
- Client-side validation before submission
- Clear error messaging

### Components Structure
```
src/
  components/
    auth/
      LoginForm.client.tsx
      AuthNav.client.tsx
    posts/
      PostGrid.tsx
      PostCard.tsx
      PostForm.client.tsx
      Editor.client.tsx
```

### Mock Implementation Details
- Posts reset on page refresh
- Temporary image storage
- Simulated network delays
- No persistence required
- Maintain auth state during session

### User Experience Flow
1. Initial Load
   - See grid of 3 mock posts
   - Public navigation only

2. Authentication
   - Login with any credentials
   - Dashboard link appears
   - Access to post management

3. Post Management
   - Create/edit/delete posts
   - Upload images from desktop
   - Rich text editing with Tiptap
   - Immediate UI updates

4. Logout
   - Dashboard link disappears
   - Return to public view
   - Lose management access

## Technical Requirements

### Component Organization
- Page routes must be server components without 'use client' directives
- Interactive features should be contained in separate client components
- Page routes should only compose layout and client components
- Example structure:

```tsx
// app/posts/[id]/edit/page.tsx
// No 'use client' here
export default function EditPostPage({ params }) {
  return (
    <EditPostContainer postId={params.id} />
  )
}

// features/posts/components/EditPostContainer.tsx
'use client'
export function EditPostContainer({ postId }) {
  // Hooks and state management here
  return (
    <div>
      <PostForm />
      <TipTapEditor />
    </div>
  )
}
```

### Server Components (Page Routes)
- Must not contain 'use client' directive
- Should only handle layout and composition
- Can pass server-side props to client components
- Focus on component organization and data flow

### Client Components (Feature Components)
- Include 'use client' directive when needed
- Handle all interactive features
- Contain hooks and state management
- Manage form handling and user input
- Located in feature directories

### Form Validation
- Zod schemas match database constraints
- Client-side validation
- Server-side validation in API routes
- Clear error messaging

### Image Requirements

#### External Images Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // For mock avatar generation
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      }
    ],
  },
}
```

#### Mock Data Images
- Use Unsplash images for demo content
- Example URL pattern: `https://images.unsplash.com/photo-{id}?w=800`
- Ensure consistent image sizes
- Include placeholder images for new posts
- Use DiceBear for user avatars

#### Image Implementation
- Use Next.js Image component for optimization
- Maintain consistent aspect ratios
- Handle loading states
- Provide fallback images
- Enable proper caching

Mock posts should use high-quality placeholder images from Unsplash that represent the content theme. For example:
- Tech posts: computer/code related images
- Design posts: UI/UX related images
- General posts: office/workspace images

### API Routes
- Handle all data operations
- Validate requests
- Return appropriate status codes
- Simulate network behavior

This architecture ensures:
1. Clean separation of client/server code
2. Consistent form handling
3. Type-safe data validation
4. Smooth user experience
5. Easy testing and development

The focus is on providing a complete working experience with mock data, allowing for easy testing and development before implementing a permanent backend.