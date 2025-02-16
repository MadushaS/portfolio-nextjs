import { cn } from "@/lib/utils";
import { Post } from "@/sanity/schema";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface PostThumbnailProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: Post;
  type: "featured" | "highlighted" | "normal";
}

const AuthorAvatar = ({ name }: { name: string }) => (
  <div className="flex gap-2">
    <div className="text-sm">By {name}</div>
  </div>
);

export default function PostThumbnail({
  post,
  type,
  ...props
}: Readonly<PostThumbnailProps>) {
  return (
    <div {...props}>
      <div className={cn("rounded-lg")}>
        <Link className="block shrink" href={`/blog/${post.slug.current}`}>
          <div className="flex h-full items-center overflow-hidden rounded-lg">
            <img
              alt="Post thumbnail"
              src={post.imageURL}
              decoding="async"
              loading="lazy"
              className={cn(
                "aspect-video w-full rounded-lg object-cover transition-transform duration-600 ease-in hover:scale-[1.02]",
                type === "featured" && "lg:aspect-square",
              )}
            />
          </div>
        </Link>
        <div className="px-6 py-2">
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {post.categories.map((category, i) => (
              <span
                key={category.title}
                className="border-primary rounded-full border px-2.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap uppercase"
              >
                {category.title}
              </span>
            ))}
          </div>
          <h2
            className={cn(
              "hover:text-primary mt-3 text-2xl leading-snug font-bold hover:underline",
              type === "featured" && "lg:text-5xl",
            )}
          >
            <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
          </h2>
          <p
            className={cn(
              "text-card-foreground mt-6",
              type === "highlighted" && "mt-2 text-sm",
            )}
          >
            {post.description}
          </p>
        </div>
        <div className="flex justify-between px-6 py-2">
          <AuthorAvatar name={post.author} />
          <div className="flex items-center text-sm">
            <span className="font-mono whitespace-nowrap">
              {post.publishedAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
