// @ts-check
// This config is for LOCAL BUILD TESTING ONLY
// Use: astro build --config astro.config.local.mjs

import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
	site: "https://madusha.dev",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [svelte(), sitemap()],
	image: {
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
	},
	env: {
		schema: {
			PUBLIC_POSTHOG_KEY: envField.string({ context: "client", access: "public", optional: true }),
			PUBLIC_POSTHOG_HOST: envField.string({
				context: "client",
				access: "public",
				optional: true,
				default: "https://eu.i.posthog.com",
			}),
			PUBLIC_SANITY_PROJECT_ID: envField.string({ context: "client", access: "public", optional: true }),
			PUBLIC_SANITY_DATASET: envField.string({
				context: "client",
				access: "public",
				optional: true,
				default: "production",
			}),
			RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
			CONTACT_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
			TELEGRAM_BOT_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
			TELEGRAM_CHAT_ID: envField.string({ context: "server", access: "secret", optional: true }),
		},
	},
	vite: {
		// Remove `cloudflare:*` externalization to avoid Node ESM trying to resolve the
		// `cloudflare:` protocol during local builds. If you need to externalize
		// Node built-ins, add them explicitly (e.g. ['node:crypto']).
		ssr: {},
		build: {
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							return "vendor";
						}
					},
				},
			},
		},

		plugins: [tailwindcss()],
	},
});
