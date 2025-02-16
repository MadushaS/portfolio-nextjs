import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

interface Props {
  asset: SanityImageSource;
  alt: string;
  caption?: string;
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption } = props;
  const imageProps = useNextSanityImage(client, asset);

  if (!imageProps) return null;

  return (
    <figure>
      <Image
        width={imageProps.width}
        height={imageProps.height}
        src={imageProps.src}
        alt={alt}
        sizes="(max-width: 800px) 100vw, 800px"
        className="rounded-lg p-6"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-pretty text-gray-500 italic dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
