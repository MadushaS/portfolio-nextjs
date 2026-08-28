import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from "astro:env/client";

export const apiVersion = "2024-06-17";

// Fallbacks keep build-time rendering alive when env vars are unset.
// In production, set these via your hosting platform (Cloudflare dashboard).
export const dataset = PUBLIC_SANITY_DATASET || "production";
export const projectId = PUBLIC_SANITY_PROJECT_ID || "";

export const useCdn = false;

// Helper to check if Sanity is configured
export const isSanityConfigured = () => Boolean(projectId);
