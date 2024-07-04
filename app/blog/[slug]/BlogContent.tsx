import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { format } from 'date-fns';
import { PortableText, PortableTextReactComponents } from "next-sanity";

export const runtime = 'edge';

async function getPostFromSanity(slug: string) {
    const query = `*[_type == "post"]{ _id, title, publishedAt, author->{name}, slug, categories, mainImage, body }`;
    return (await client.fetch(query, {
        slug: {
            current: slug
        }
    })).map((post: {
        publishedAt: string,
        mainImage: { _type: string, asset: { _ref: string, _type: string } },
        author: { name: string },
        slug: { current: string, _type: string },
        categories: [{ _ref: string, _type: string, _key: string }],
        title: string,
        body: any
    }) => {
        return {
            ...post,
            date: format(new Date(post.publishedAt), 'MMMM dd, yyyy'),
            imageURL: urlForImage(post.mainImage),
            author: post.author.name,
            slug: post.slug.current,
            categories: post.categories,
            content: post.body
        }
    })[0];
}

const conversions:
    | Partial<PortableTextReactComponents> | undefined
    = {
    block: {
        h1: ({ children }) => <h1 className={cn('text-2xl font-bold mt-4 mb-2')}>{children}</h1>,
        h2: ({ children }) => <h2 className={cn('text-xl font-bold mt-4 mb-2')}>{children}</h2>,
        h3: ({ children }) => <h3 className={cn('text-lg font-bold mt-4 mb-2')}>{children}</h3>,
        h4: ({ children }) => <h4 className={cn('text-base font-bold mt-4 mb-2')}>{children}</h4>,
        h5: ({ children }) => <h5 className={cn('text-sm font-bold mt-4 mb-2')}>{children}</h5>,
        h6: ({ children }) => <h6 className={cn('text-xs font-bold mt-4 mb-2')}>{children}</h6>,
        p: ({ children }) => <p className={cn('text-base mt-4 mb-2')}>{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className={cn('list-disc list-inside')}>{children}</ul>,
        number: ({ children }) => <ol className={cn('list-decimal list-inside')}>{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className={cn('list-disc')}>{children}</li>,
        number: ({ children }) => <li className={cn('list-decimal')}>{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className={cn('font-bold')}>{children}</strong>,
        em: ({ children }) => <em className={cn('italic')}>{children}</em>,
        code: ({ children }) => <code className={cn('bg-gray-200 p-1')}>{children}</code>,
        link: ({ children, value }) => <a href={value.href} className={cn('text-blue-500 underline')}>{children}</a>,
    },
}

export default async function BlogContent({ slug }: Readonly<{ slug: string }>) {
    const post = await getPostFromSanity(slug);
    const { title, author, date, imageURL, content } = post;
    return (
        <div className={cn('max-w-2xl mx-auto')}>
            <h1 className={cn('text-4xl font-bold mb-4')}>{title}</h1>
            <p className={cn('text-sm')}>By {author} on {date}</p>
            <img src={imageURL} alt={title} className={cn('w-full h-64 object-cover rounded-lg mt-4')} />
            <div className={cn('mt-4')} >
                <PortableText
                    value={content}
                    components={conversions}
                />
            </div>
        </div >
    )
}