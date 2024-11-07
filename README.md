# Nerdcore

A modern Next.js blog platform with built-in Supabase integration.

## Features

- Next.js 14 with App Router
- Built-in Supabase Authentication
- Blog post management with image support
- Dark mode support with next-themes
- Responsive design with Tailwind CSS
- Complete ShadCN/UI component library

## Quick Start

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Create a Supabase project at https://supabase.com
4. Copy your project URL and anon key from the Supabase dashboard
5. Create a `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Minimal Configuration

This project works out of the box with minimal Supabase setup:

1. Authentication is pre-configured - just enable Email provider in Supabase Auth settings
2. The blog implementation uses Row Level Security (RLS) policies for secure data access
3. File storage is configured for post images with appropriate security policies

## Database Setup

To implement the full blog functionality:

1. Navigate to the SQL editor in your Supabase dashboard
2. Copy and paste the contents of `src/features/posts/repositories/supabase-post-schema.sql`
3. Execute the SQL to create:
   - Posts table with proper schema
   - Storage bucket for post images
   - Row Level Security policies
   - Automatic timestamp management

The schema provides:
- Secure post management (create/read/update/delete)
- Image upload handling
- User-based access control
- Automatic timestamps

## Development

```bash
pnpm dev
```

## Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

See `conventions.md` for detailed information about:
- Project organization
- Coding conventions
- Component guidelines
- Theme configuration

## License

MIT License - See LICENSE file for details
# Nerdcore

A Next.js blog platform with Supabase integration.

## Features

- Next.js 14 with App Router
- Supabase Authentication
- Blog post management with image support
- Dark mode support
- Responsive design with Tailwind CSS
- ShadCN/UI components

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project at https://supabase.com
4. Copy your project URL and anon key from the Supabase dashboard
5. Create a `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Setup

1. Navigate to the SQL editor in your Supabase dashboard
2. Copy and paste the contents of `src/features/posts/repositories/supabase-post-schema.sql`
3. Execute the SQL to create the posts table and related policies

## Implementing Supabase Posts Repository

To switch from the mock repository to the Supabase implementation:

1. Update `src/features/posts/services/PostService.ts`:
```typescript
import { SupabasePostRepository } from "../repositories/SupabasePostRepository";
// ...
export const postService = new PostService(new SupabasePostRepository());
```

2. The `SupabasePostRepository` implements:
- Full CRUD operations for posts
- Image upload handling
- Row Level Security (RLS) policies
- Automatic timestamp management

## Development

```bash
npm run dev
```

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

See `conventions.md` for detailed information about the project structure and coding conventions.
