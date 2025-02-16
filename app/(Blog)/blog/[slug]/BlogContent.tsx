import { SanityImage } from "@/components/shared/SanityImage";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { format } from "date-fns";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";

export const runtime = "edge";

async function getPostFromSanity(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug]{ _id, title, description, publishedAt, author->{name}, slug, categories[]->{title}, mainImage, body }`;
  return (
    await client.fetch(query, {
      slug: slug,
    })
  ).map(
    (post: {
      publishedAt: string;
      mainImage: { _type: string; asset: { _ref: string; _type: string } };
      author: { name: string };
      slug: { current: string; _type: string };
      categories: [{ title: string }];
      title: string;
      description: string;
      body: any;
    }) => {
      return {
        ...post,
        date: new Date(post.publishedAt),
        imageURL: urlForImage(post.mainImage),
        author: post.author.name,
        slug: post.slug.current,
        categories: post.categories,
        content: post.body,
      };
    },
  )[0];
}

const conversions: Partial<PortableTextReactComponents> | undefined = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
  },
};

const dateToString = (date: string) => {
  return format(new Date(date), "MMMM dd, yyyy");
};

export default async function BlogContent({
  slug,
}: Readonly<{ slug: string }>) {
  const post = await getPostFromSanity(slug);
  if (!post) {
    return (
      <section className="flex min-h-[calc(100vh-256px)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-bold">Post not found</h1>
          <p className="text-card-foreground text-lg">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </section>
    );
  }
  const { title, description, author, date, imageURL, content } = post;
  return (
    <article id="main-content">
      <section className="relative">
        <div className="container mx-auto p-6 md:px-12 lg:px-24 xl:px-32">
          <div className="bg-popover absolute top-0 right-0 left-0 z-0 h-full"></div>
          <div className="relative top-8 z-2">
            <div className="col-span-12 mt-5 mb-6 w-full lg:col-span-10 lg:col-start-2 lg:mt-10 lg:mb-8 lg:w-2/3 xl:col-span-8 xl:col-start-2">
              <ul className="mb-3 inline-block list-none">
                <li className="mr-3 inline-block">
                  <Link href="/blog" className="text-popover-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
              <h1 className="mb-3 text-3xl font-semibold text-slate-900 lg:text-5xl dark:text-slate-100">
                {title}
              </h1>
              <p className="text-lg">{description}</p>
            </div>
            <div className="lg:col-span-10 lg:col-start-2">
              <div className="relative top-10 z-10">
                <img
                  src={imageURL}
                  width={1600}
                  height={850}
                  alt="Beginner's guide to GitHub repositories: How to create your first repo"
                  className="aspect-video rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto p-6 md:px-12 lg:px-24 xl:px-32">
        <div className="pt-8">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="flex flex-wrap items-center pb-1">
              <div className="flex flex-wrap">By {author}</div>
              <time
                dateTime={date}
                className="text-mono mb-3 ml-auto block min-h-6 border-1 pl-7 text-slate-800 dark:text-slate-200"
              >
                {dateToString(date)}
              </time>
            </div>
            <div className="border-2 border-t border-slate-200 dark:border-slate-800"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-4 md:px-12 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row">
          <section className="order-2 col-span-12 px-2 md:order-1 md:col-span-8 lg:col-span-7">
            <div className="portableText">
              <PortableText value={content} components={conversions} />
            </div>
          </section>

          <div className="order-1 col-span-12 px-6 md:order-2 md:col-span-4 lg:col-span-3">
            <ul className="mt-4 flex list-none lg:flex-col">
              <li className="mr-4 mb-2 lg:mr-0">
                <Link
                  href={`https://x.com/share?text=${post.title}&amp;url=${"https://madusha.dev/blog/" + post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card hover:bg-secondary flex items-center justify-center rounded-full border p-2"
                  aria-label="Share on X"
                >
                  <SiX />
                </Link>
              </li>
              <li className="mr-4 mb-4 lg:mr-0">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${"https://madusha.dev/blog/" + post.slug}&amp;t=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card hover:bg-secondary flex items-center justify-center rounded-full border p-2"
                  aria-label="Share on LinkedIn"
                >
                  <SiFacebook />
                </Link>
              </li>
              <li className="mr-4 mb-4 lg:mr-0">
                <Link
                  href={encodeURI(
                    `https://www.linkedin.com/shareArticle?url=${"https://madusha.dev/blog/" + post.slug}%2F&amp;title=${post.title}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card hover:bg-secondary flex items-center justify-center rounded-full border p-2"
                  aria-label="Share on LinkedIn"
                >
                  <SiLinkedin />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
