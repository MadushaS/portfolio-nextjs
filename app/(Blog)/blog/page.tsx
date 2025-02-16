"use client";

import PostThumbnail from "@/components/Blog/BlogThumbnail";
import FeaturedBlog from "@/components/Blog/FeaturedBlog";
import Fallback from "@/components/Blog/PostFallBack";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Post, SanityPost } from "@/sanity/schema";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const GetAllPostsSortByDate = `*[_type == "post"]{_id, title, description , publishedAt, author -> { name }, slug, categories[]->{title}, mainImage}| order(publishedAt desc)`;
      return (await client.fetch(GetAllPostsSortByDate)).map(
        (post: SanityPost) => {
          return {
            ...post,
            publishedAt: format(new Date(post.publishedAt), "MMMM dd, yyyy"),
            imageURL: urlForImage(post.mainImage),
            author: post.author.name,
            slug: post.slug,
            categories: post.categories,
          };
        },
      );
    };
    fetchData()
      .then((data) => setBlogs(data))
      .catch((error) => setBlogs([]));
    setLoading(false);
  }, []);
  return (
    <main className="container mx-auto px-6 py-2">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">
        <h1 className="py-8 text-3xl font-normal sm:text-6xl sm:leading-tight md:py-8 lg:py-16">
          Blog Posts
        </h1>
        <FeaturedBlog blogs={blogs.slice(0, 3)} loading={loading} />
        <h2 className="mt-20 mb-4 text-base font-medium tracking-wider uppercase">
          Recent Posts
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-2 xl:grid-cols-3">
          {blogs.length > 0 ? (
            blogs
              .slice(3)
              .map((blog, i) => (
                <PostThumbnail
                  type="normal"
                  key={blog.slug.current}
                  post={blog}
                  className="aspect-video rounded-lg"
                />
              ))
          ) : (
            <div className="bg-card/70 flex grow animate-pulse items-center justify-center rounded-lg px-4 py-16">
              <Fallback isLoading={loading} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
