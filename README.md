# Portfolio — madusha.dev

Brutalist-themed portfolio + engineering blog. Astro 7 SSR on Cloudflare Workers, Svelte 5 islands, Sanity CMS.

## Tech Stack

- **Framework:** Astro 7 (`output: "server"`)
- **Islands:** Svelte 5 (Navbar, Contact form, ThemeToggle)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`)
- **CMS:** Sanity.io (blog posts, prerendered at build)
- **Analytics:** PostHog (cookieless until consent via cookie banner)
- **Contact:** `/api/contact` endpoint → Resend (email) + Telegram bot (instant ping)
- **Animations:** Motion + Lenis smooth scroll
- **Deployment:** Cloudflare Workers (`@astrojs/cloudflare`)

## Quickstart

```bash
pnpm install
cp .env.example .env   # fill in values
pnpm dev
```

## Scripts

```bash
pnpm dev           # dev server
pnpm build         # production build (Cloudflare)
pnpm build:local   # build with Node adapter (local testing, no CF runtime)
pnpm preview       # preview build
pnpm check         # astro check (types)
pnpm lint          # biome check
pnpm lint:fix      # biome auto-fix
```

## Environment Variables

Type-safe via `astro:env` schema (see `astro.config.mjs`). Copy `.env.example` → `.env`.

**Client (public — safe to expose)**

| Variable | Purpose |
|---|---|
| `PUBLIC_POSTHOG_KEY` | PostHog project key |
| `PUBLIC_POSTHOG_HOST` | PostHog host (default `https://us.i.posthog.com`) |
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project |
| `PUBLIC_SANITY_DATASET` | Sanity dataset (default `production`) |

**Server (secret — never shipped to browser)**

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact emails |
| `CONTACT_EMAIL` | Inbox receiving contact form mail |
| `TELEGRAM_BOT_TOKEN` | Optional — bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Optional — chat ID from `/getUpdates` |

In production, set secrets in the Cloudflare dashboard (Workers → Settings → Variables), **not** as `PUBLIC_` vars.

## Project Structure

```
├── public/                  # Static assets
│   ├── _headers             # Cloudflare security headers + CSP
│   ├── llms.txt             # AI-crawler site summary (GEO)
│   └── robots.txt           # sitemap reference
├── src/
│   ├── components/
│   │   ├── Home/            # Homepage sections (Hero, TechStack, Contact…)
│   │   ├── blog/            # PortableText image renderer
│   │   ├── shared/          # Navbar, Footer, SEO, SectionContainer
│   │   ├── ui/              # Primitives (Button, Chip, Spotlight)
│   │   ├── PostHog.astro    # Analytics snippet (cookieless until consent)
│   │   └── CookieConsent.astro  # GDPR banner → posthog opt-in/out
│   ├── layouts/Layout.astro # Base layout (fonts, theme, Lenis, analytics)
│   ├── pages/
│   │   ├── api/contact.ts   # POST endpoint: Resend email + Telegram notify
│   │   ├── blog/[slug].astro    # Prerendered post (reading time, progress, JSON-LD)
│   │   └── blog/index.astro     # Blog index
│   ├── styles/global.css    # Tailwind theme tokens + blog prose
│   └── lib/                 # Sanity client, utils
├── astro.config.mjs         # Cloudflare adapter + env schema
├── astro.config.local.mjs   # Node adapter for local build testing
└── wrangler.jsonc           # Workers config
```

## Features

- Dark/light mode (system-aware, persisted)
- SEO: canonical normalization, OG/Twitter cards, JSON-LD graph (`Person`/`WebSite`/`BlogPosting`/`BreadcrumbList`), `llms.txt`
- Security: CSP, HSTS, nosniff, frame-deny via `public/_headers`
- Privacy-first analytics: cookieless PostHog until cookie-consent decision
- Contact form: spam honeypot, server validation, Resend + Telegram, no third-party form service
- Blog: computed reading time, reading-progress bar, author card, Sanity Portable Text
- Mobile: tabbed tech stack, responsive brutalist grid
- Accessible: skip link, focus styles, `user-invalid` form states, reduced-motion support

## Deployment

Cloudflare Workers via Wrangler:

```bash
pnpm build
pnpm wrangler deploy
```

Blog posts are prerendered at build time from Sanity; everything else renders on-demand.

## License

MIT — use as template for your own portfolio.

## Author

**Madusha Sandaruwan**

- GitHub: [@madushaS](https://github.com/madushaS)
- LinkedIn: [madushasandaruwan](https://linkedin.com/in/madushasandaruwan)
- X: [@_MadushaS](https://x.com/_MadushaS)
