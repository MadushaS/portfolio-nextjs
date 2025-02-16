import BlogContent from "./BlogContent";
export const runtime = "edge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <div className="">
      <BlogContent slug={resolvedParams.slug} />
    </div>
  );
}

export default BlogPage;
