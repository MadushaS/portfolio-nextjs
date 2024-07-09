import BlogContent from "../../../components/Blog/BlogContent";

export const runtime = 'edge';

function BlogPage({ params }: { params: { slug: string } }) {
  return (
    <div className="dark:bg-slate-900 bg-slate-100">
      <BlogContent slug={params.slug} />
    </div>
  );
}

export default BlogPage;