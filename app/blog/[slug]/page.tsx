import NavBar from "@/components/Navbar";
import BlogContent from "./BlogContent";

function BlogPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4">
      <NavBar />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-bold mb-8">Blog Page</h1>
        <div className="w-full max-w-3xl rounded-lg shadow-lg p-6">
          <BlogContent slug={params.slug} />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;