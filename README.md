# AI-Generated NextJS / Supabase Project 

This codebase is AI generated. I'm exploring development with AI assistance and sharing the process publicly. So, because this is just me coding in public and experimenting with AI-generated code, there are a few things you should know: This codebase changes frequently as I learn and try new things. While you're welcome to look around and use anything you find helpful, keep in mind that I might change or break things at any time. I'm not really set up to handle contributions or provide support - it's just a personal learning project that I'm sharing openly.


## Current Features

- Authentication with Supabase
- Next Themes, Dark Light Toggle
- All ShadCN components installed
- Responsive design

## Local Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to your `.env.local`
   - Run the necessary database migrations (if any)

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Status

I'm using this project to explore and learn, working with AI to generate and modify code. The whole thing is essentially a big experiment, which means:

- Things might break or change completely at any time
- Features might be incomplete or experimental
- I'm not able to accept contributions or feature requests
- I can't provide support or help with issues
- Feel free to use anything you find, but do so at your own risk


## License

This project is licensed under the MIT License - see the LICENSE file for details.
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
