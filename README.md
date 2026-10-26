# OAK website

Next.js 14 (App Router) + TypeScript + Tailwind + Supabase. Built for Vercel.

## Pages
`/` home · `/shop` · `/shop/[slug]` product · `/cart` · `/checkout` · `/order/[id]` confirmation ·
`/story` · `/delivery` (delivery + FAQ) · `/contact` · `/admin` (orders + messages dashboard)

## Setup
1. `npm install`
2. Create a Supabase project, open SQL Editor, paste and run `supabase/schema.sql`
3. Copy `.env.example` to `.env.local` and fill it in (Supabase keys, ADMIN_PASSWORD, Telegram username)
4. `npm run dev` then open http://localhost:3000

## Deploy
Push to GitHub, import the repo in Vercel, add the same env vars from `.env.example`, deploy.
Use a strong ADMIN_PASSWORD. Open `/admin` to see orders and change their status.

## Editing
- Products, prices and photos: edit the `products` table in Supabase (set `image_url` for a real photo). Until Supabase is connected, the site uses the fallback list in `src/lib/products.ts`.
- Delivery fee and provinces: `src/lib/config.ts`
- Colors: `tailwind.config.ts`
