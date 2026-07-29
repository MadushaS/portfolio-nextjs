import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sessionDrivers } from "astro/config";

export default defineConfig({
  site: "https://madusha.dev",
  output: "server",
  session: {
    driver: sessionDrivers.cloudflareKVBinding({ binding: "SESSION" }),
  },
  adapter: cloudflare({
    imageService: "compile",
    sessionKVBindingName: "SESSION",
  }),
  integrations: [svelte(), sitemap()],
  image: {
    domains: ["cdn.sanity.io"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
