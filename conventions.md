# Folder Structure:
root
├── public
│   └── images
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx
│       └── components
│           ├── ui
│           ├── hooks
│           └── lib
├── .env
├── .env.local
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Conventions:
- Assume next-themes is being used and is already implemented
- Assume all ShadCN components are installed and available to use
- Use ShadCN components and lucide-react icons wherever possible
- All components should look good in dark or light mode using Tailwind's 'dark' modifier
- Add "use client" to the top of files which rely on React to maintain state or have interactivity or use hooks.
