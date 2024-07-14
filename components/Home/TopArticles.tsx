'use client'

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Post, SanityPost } from "@/sanity/schema";
import { format } from "date-fns";
import { HTMLProps, useEffect, useState } from "react";
import FeaturedBlog from "../Blog/FeaturedBlog";
import SectionContainer from "../shared/SectionContainer";

export default function TopArticles(props: Readonly<HTMLProps<HTMLDivElement>>) {

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const posts = await getTopArticles();
    setPosts(posts);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) return null;
  return (
    <SectionContainer id="toparticles" title="Top Articles" subtitle="Check out some of my top articles">
      <div className="container">
        <FeaturedBlog blogs={posts} loading={loading} />
      </div>
    </SectionContainer>
  );
}

async function getTopArticles() {
  const GetTopPostsSortByDate = `*[_type == "post"]{_id, title, description, publishedAt, author -> { name }, slug, categories[] -> { title }, mainImage}| order(publishedAt desc)`;
  const posts = await client.fetch(GetTopPostsSortByDate);
  if (!posts) return [];
  return posts
    .slice(0, 3)
    .map((post: SanityPost) => {
      return {
        ...post,
        publishedAt: format(new Date(post.publishedAt), 'MMMM dd, yyyy'),
        imageURL: urlForImage(post.mainImage),
        author: post.author.name,
        slug: post.slug,
        categories: post.categories,
      };
    });
}