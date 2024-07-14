import { cn } from "@/lib/utils";
import { Post } from "@/sanity/schema";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface PostThumbnailProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    post: Post;
    type: 'featured' | 'highlighted' | 'normal'
}

const AuthorAvatar = ({ name }: { name: string }) => (
    <div className="flex gap-2">
        <div className="text-sm">By {name}</div>
    </div>
);

export default function PostThumbnail({ post, type, ...props }: Readonly<PostThumbnailProps>) {
    return (
        <div {...props} >
            <div className={cn('rounded-lg')}>
                <Link className="block flex-shrink" href={`/blog/${post.slug.current}`}>
                    <div className="flex h-full items-center rounded-lg overflow-hidden">
                        <img
                            alt="Post thumbnail"
                            src={post.imageURL}
                            decoding="async"
                            loading="lazy"
                            className={cn("w-full object-cover transition-transform hover:scale-[1.02] ease-in duration-600 rounded-lg aspect-video", type === 'featured' && 'lg:aspect-square')}
                        />
                    </div>
                </Link>
                <div className="px-6 py-2">
                    <div className="flex flex-wrap gap-3 items-center mt-6">
                        {post.categories.map((category, i) => (
                            <span
                                key={category.title} className="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-primary tracking-wide whitespace-nowrap"
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>
                    <h2 className={cn("font-bold leading-snug mt-3 text-2xl hover:text-primary hover:underline", type === 'featured' && "lg:text-5xl")}>
                        <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                    </h2>
                    <p className={cn("mt-6 text-card-foreground", type === 'highlighted' && 'mt-2 text-sm')}>{post.description}</p>
                </div>
                <div className="flex justify-between px-6 py-2">
                    <AuthorAvatar name={post.author} />
                    <div className="text-sm flex items-center">
                        <span className="whitespace-nowrap font-mono">{post.publishedAt}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}