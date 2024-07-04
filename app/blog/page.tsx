import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import { Image } from 'sanity';

type SanityPostType = {
    author: { name: string, },
    slug: { current: string, _type: string },
    categories: [{ _ref: string, _type: string, _key: string }],
    mainImage: { _type: string, asset: { _ref: string, _type: string } },
    _id: string,
    title: string,
    publishedAt: string
}

type ReturnData = {
    title: string,
    publishedAt: string,
    imageURL: string,
    author: string,
    slug: { current: string, _type: string }
    categories: [{ _ref: string, _type: string, _key: string }],
    _id: string,
    mainImage: Image,
}

async function getBlogList() {
    const query = `*[_type == "post"]{ _id, title, publishedAt, author->{name}, slug, categories, mainImage }`;
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
}

const Home = async () => {
    const posts = await getBlogList();
    console.log(
        {
            title: posts[0].title,
            publishedAt: posts[0].publishedAt,
            image: posts[0].imageURL,
            author: posts[0].author,
            slug: posts[0].slug.current,
        }
    );
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-5xl font-extrabold text-center my-12">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: ReturnData) => (
                    <div key={post._id} className=" shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {post.mainImage && (
                            <Link href={`/blog/${post.slug.current}`}>
                                <img
                                    src={post.imageURL}
                                    alt={post.title}
                                    width={800}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                        )}
                        <div className="p-4">
                            <Link href={`/blog/${post.slug.current}`} className="text-2xl font-bold hover:underline">
                                {post.title}
                            </Link>
                            <p className=" mt-2">
                                By {post.author} on {post.publishedAt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
