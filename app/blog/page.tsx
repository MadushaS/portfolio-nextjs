"use client";

import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { format } from "date-fns";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { Image as SanityImage } from "sanity"

type SanityPostType = {
    author: { name: string, },
    slug: { current: string, _type: string },
    categories: [{ title: string }],
    mainImage: { _type: string, asset: { _ref: string, _type: string } },
    _id: string,
    title: string,
    description: string,
    publishedAt: string
}

interface Post {
    title: string,
    description: string,
    publishedAt: string,
    imageURL: string,
    author: string,
    slug: { current: string, _type: string }
    categories: [{ title: string }],
    _id: string,
    mainImage: SanityImage,
}

interface PostThumbnailProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    post: Post;
    type: 'featured' | 'highlighted' | 'normal'
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ post, type, ...props }) => (
    <div {...props}>
        <Link className="block" href={`/blog/${post.slug.current}`}>
            <div className="flex bg-black/5 dark:bg-white/5">
                <img
                    alt="Post thumbnail"
                    src={post.imageURL}
                    decoding="async"
                    loading="lazy"
                    className={cn("w-full object-cover transition-opacity hover:opacity-90", type === 'featured' && 'aspect-square', type === 'highlighted' && 'aspect-video', type === 'normal' && 'aspect-video')}
                />
            </div>
        </Link>
        <div className="p-6">
            <div className="flex flex-wrap gap-3 items-center mt-6">
                {post.categories.map((category, i) => (
                    <span
                        key={category.title} className="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-primary tracking-wide whitespace-nowrap"
                    >
                        {category.title}
                    </span>
                ))}
                <div className="text-sm flex items-center">
                    <span className="whitespace-nowrap">{post.publishedAt}</span>
                </div>
            </div>
            <h2 className="font-bold leading-snug mt-3 text-2xl">
                <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
            </h2>
            <p className="mt-3">{post.description}</p>
            <p className="mt-3 text-primary">{post.description}</p>
            <AuthorAvatar name={post.author} />
        </div>
    </div>
);

const AuthorAvatar = ({ name }: { name: string }) => (
    <div className="flex gap-2 items-center mt-6">
        <div className="text-sm">By {name}</div>
    </div>
);

const Loading = () => (
    <div className="flex flex-grow justify-center items-center bg-slate-300/70 dark:bg-slate-700/70 px-4 py-16 rounded-lg animate-pulse">
        <h2 className="text-xl font-semibold">Loading...</h2>
    </div>
);

const BlogPage = () => {
    const [blogs, setBlogs] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const query = `*[_type == "post"]{_id, title, publishedAt, author -> { name }, slug, categories[]->{title}, mainImage}`;
            return (await client.fetch(query)).map((post: SanityPostType) => {
                return {
                    ...post,
                    publishedAt: format(new Date(post.publishedAt), 'MMMM dd, yyyy'),
                    imageURL: urlForImage(post.mainImage),
                    author: post.author.name,
                    slug: post.slug,
                    categories: post.categories,
                };
            });
        };
        fetchData()
            .then((data) => setBlogs(data))
            .catch((error) => setBlogs([]));
        setLoading(false);
    }, []);
    return (
        <main className="container mx-auto px-6 py-8">
            <div className="max-w-[1480px] mx-auto px-5 sm:px-8">
                <h1 className="text-3xl sm:text-6xl sm:leading-tight font-normal pt-16">
                    Blog Posts
                </h1>
                <div className="p-4 rounded-lg">
                    <h2 className="mb-4 font-medium text-base uppercase tracking-wider mt-20">Featured Posts</h2>
                    <div className="flex flex-wrap xl:flex-nowrap gap-10">
                        {loading && <Loading />}
                        {
                            blogs.length > 0 ? [blogs[0]].map((blog, i) => (
                                <PostThumbnail type="featured" key={blog.slug.current} post={blog} className="bg-slate-200 dark:bg-slate-800 rounded-lg" />

                            )) : (
                                <div className="flex flex-grow justify-center items-center bg-slate-300/70 dark:bg-slate-700/70 px-4 py-16 rounded-lg animate-pulse">
                                    <h2 className="text-xl font-semibold">Containt Retrieval Failed</h2>
                                </div>
                            )
                        }
                        <div className="flex flex-col md:flex-row xl:flex-col gap-10">
                            {loading && <Loading />}
                            {
                                blogs.length > 0 ? blogs.slice(1, 3).map((blog, i) => (
                                    <PostThumbnail type="highlighted" key={blog.slug.current} post={blog} className="bg-slate-200 dark:bg-slate-800 rounded-lg" />
                                )) : (
                                    <div className="flex flex-grow justify-center items-center bg-slate-300/70 dark:bg-slate-700/70 px-4 py-16 rounded-lg animate-pulse">
                                        <h2 className="text-xl font-semibold">Containt Retrieval Failed</h2>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
                <h2 className="mb-4 font-medium text-base uppercase tracking-wider mt-20">Recent Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16 mt-16">
                    {loading && <Loading />}
                    {
                        blogs.length > 0 ? blogs.slice(3).map((blog, i) => (
                            <PostThumbnail type="normal" key={blog.slug.current} post={blog} className="bg-slate-200 dark:bg-slate-800 rounded-lg aspect-video" />
                        )) : (
                            <div className="flex flex-grow justify-center items-center bg-slate-300/70 dark:bg-slate-700/70 px-4 py-16 rounded-lg animate-pulse">
                                <h2 className="text-xl font-semibold">Containt Retrieval Failed</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </main>
    );
};

export default BlogPage;
