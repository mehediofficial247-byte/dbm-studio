# DBM Studio

Personal brand / portfolio site for Mehedi Hasan — Web Designer & Frontend Developer.

## What's built so far
- **Foundation**: Next.js App Router + TypeScript + Tailwind, configured to the DBM Studio design tokens
- **Home**: hero, trusted-by strip, featured projects, stats, skills, services preview, testimonials, blog preview, newsletter, contact CTA
- **Projects**: filterable/searchable grid + case study detail pages
- **Shop**: filterable/sortable product grid + product detail pages with FAQ
- **Blog**: MDX-powered — real `.mdx` files in `content/blog/`, compiled with `next-mdx-remote`, syntax highlighting via `rehype-prism-plus`, GFM tables via `remark-gfm`, auto-generated table of contents with scroll-spy, copy-to-clipboard code blocks, reading time
- **Videos**: filterable grid with a modal YouTube player
- **Services**: 8 offering cards + process timeline
- **About**: bio, timeline, FAQ
- **Contact**: validated form, business hours, embedded map, FAQ
- **SEO**: dynamic sitemap.xml, robots.txt, RSS feed, JSON-LD structured data (Person/Organization, Article, Product, BreadcrumbList) on every relevant page, breadcrumb navigation

## Run locally
```bash
npm install
npm run dev
```

## Connecting a database

The contact form and newsletter signup are wired to Prisma + Postgres. To make them actually save data:

1. **Get a free Postgres database.** Any of these work — pick one:
   - [Supabase](https://supabase.com) → New Project → Settings → Database → copy the "Connection string" (URI, use the "Transaction" pooler for serverless)
   - [Neon](https://neon.tech) → New Project → copy the connection string shown on the dashboard
   - [Vercel Postgres](https://vercel.com/storage/postgres) → Create → copy `DATABASE_URL` from the `.env.local` tab it generates
2. **Set the connection string locally.** Copy `.env.example` to `.env` and paste your connection string into `DATABASE_URL`.
3. **Create the tables:**
   ```bash
   npm run db:migrate
   ```
   This reads `prisma/schema.prisma` (currently `ContactMessage` and `NewsletterSubscriber`) and creates matching tables in your database.
4. **Verify it works:**
   ```bash
   npm run dev
   ```
   Submit the contact form or newsletter signup, then run `npm run db:studio` to open Prisma Studio and see the row land in the database.

To add more data (projects, products, blog metadata) to the database later — e.g. once the admin panel is built — add a model to `prisma/schema.prisma` and run `npm run db:migrate` again.

## Deploying

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new) (or your host of choice).
3. Add the `DATABASE_URL` environment variable in the project's settings — same value as your local `.env`.
4. Deploy. Vercel runs `npm run build`, which runs `prisma generate` automatically (see the `build` script), so no extra config is needed.
5. If your database provider requires allow-listing IPs (Neon and Vercel Postgres don't; some Supabase configurations do), allow Vercel's outbound ranges or use the provider's pooled/serverless connection string.


Add a `.mdx` file to `content/blog/` with frontmatter matching the shape in `lib/mdx.ts` (`title`, `excerpt`, `category`, `tags`, `date`, `image`, `author`). It's picked up automatically — no code changes needed.

## Not yet built
- Admin panel (Dashboard, CRUD, Users, Messages, SEO Manager, Media Library) — the `ContactMessage` and `NewsletterSubscriber` tables above are ready for it to read from
- Dark/light mode toggle (currently dark-only), command menu, keyboard shortcuts
- PWA / offline support
- Outbound email (submissions save to the database but don't yet trigger a notification email — add Resend or similar in `app/api/contact/route.ts` if you want that)
