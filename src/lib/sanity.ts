import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id",
	dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2025-02-19",
	useCdn: true, // Use CDN for better performance in production
});

const builder = createImageUrlBuilder({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id",
	dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
});

export function urlFor(source: any) {
	return builder.image(source);
}
