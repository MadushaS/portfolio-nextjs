import BlogContent from "./BlogContent";

export const runtime = 'edge';

function BlogPage({ params }: { params: { slug: string } }) {
  return (
    <div className="">
      <BlogContent slug={params.slug} />
    </div>
  );
}

export default BlogPage;