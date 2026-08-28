import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  site: "https://madusha.dev",
  output: "server",
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [svelte(), sitemap()],
  image: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  env: {
    schema: {
      // Client (public)
      PUBLIC_POSTHOG_KEY: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_POSTHOG_HOST: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "https://us.i.posthog.com",
      }),
      PUBLIC_SANITY_PROJECT_ID: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "production",
      }),
      // Server (secret, never bundled to client)
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
      TELEGRAM_BOT_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      TELEGRAM_CHAT_ID: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
