import { Post } from "@/sanity/schema";
import PostThumbnail from "./BlogThumbnail";
import Fallback from "./PostFallBack";

export default function FeaturedBlog({ blogs, loading }: Readonly<{ blogs: Post[], loading: boolean }>) {
    return (
        <div className="p-8 bg-card rounded-3xl">
            <h2 className="mb-4 font-medium text-base uppercase tracking-wider py-8">Featured Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-10">
                {
                    (!loading && blogs.length > 0) ? [blogs[0]].map((blog, i) => (
                        <PostThumbnail type="featured" key={blog.slug.current} post={blog} className="row-span-1 lg:row-span-2 col-span-1 lg:col-span-5 rounded-lg" />

                    )) : (
                        <div className="row-span-1 lg:row-span-2 col-span-1 lg:col-span-5 flex flex-grow justify-center items-center bg-card/70 px-4 py-16 rounded-lg animate-pulse">
                            <Fallback isLoading={loading} />
                        </div>
                    )
                }
                {
                    (!loading && blogs.length > 0) ? blogs.slice(1, 3).map((blog, i) => (
                        <PostThumbnail type="highlighted" key={blog.slug.current} post={blog} className="col-span-1 lg:col-span-4 rounded-lg" />
                    )) : (
                        <div className="col-span-1 lg:col-span-3 flex flex-grow justify-center items-center bg-card/70 px-4 py-16 rounded-lg animate-pulse">
                            <Fallback isLoading={loading} />
                        </div>
                    )
                }
            </div>

        </div>
    )
}