import { Post } from "@/sanity/schema";
import PostThumbnail from "./BlogThumbnail";
import Fallback from "./PostFallBack";

export default function FeaturedBlog({
  blogs,
  loading,
}: Readonly<{ blogs: Post[]; loading: boolean }>) {
  return (
    <div className="bg-card rounded-3xl p-8">
      <h2 className="mb-4 py-8 text-base font-medium tracking-wider uppercase">
        Featured Posts
      </h2>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-9">
        {!loading && blogs.length > 0 ? (
          [blogs[0]].map((blog, i) => (
            <PostThumbnail
              type="featured"
              key={blog.slug.current}
              post={blog}
              className="col-span-1 row-span-1 rounded-lg lg:col-span-5 lg:row-span-2"
            />
          ))
        ) : (
          <div className="bg-card/70 col-span-1 row-span-1 flex grow animate-pulse items-center justify-center rounded-lg px-4 py-16 lg:col-span-5 lg:row-span-2">
            <Fallback isLoading={loading} />
          </div>
        )}
        {!loading && blogs.length > 0 ? (
          blogs
            .slice(1, 3)
            .map((blog, i) => (
              <PostThumbnail
                type="highlighted"
                key={blog.slug.current}
                post={blog}
                className="col-span-1 rounded-lg lg:col-span-4"
              />
            ))
        ) : (
          <div className="bg-card/70 col-span-1 flex grow animate-pulse items-center justify-center rounded-lg px-4 py-16 lg:col-span-3">
            <Fallback isLoading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}
