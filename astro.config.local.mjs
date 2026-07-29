// @ts-check
// This config is for LOCAL BUILD TESTING ONLY
// Use: astro build --config astro.config.local.mjs

import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://madusha.dev",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [svelte(), sitemap()],
	image: {
		domains: ["cdn.sanity.io"],
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
