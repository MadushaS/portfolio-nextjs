"use client"

import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

const articles = [
  {
    id: 1,
    title: "Understanding React Hooks",
    description: "A deep dive into the world of React Hooks and how they can be used to manage state and side effects in functional components.",
    link: "#",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    title: "Mastering Next.js",
    description: "Explore the powerful features of Next.js and learn how to build scalable and high-performance web applications.",
    link: "#",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    description: "Learn the fundamentals of CSS Grid Layout and how it can be used to create complex web layouts with ease.",
    link: "#",
    image: "https://via.placeholder.com/400",
  },
];

const BounceCard = ({ article, className }:{
  article: {
    id: number,
    title: string,
    description: string,
    link: string,
    image: string
  },
  className: string
}) => {
  const controls = useAnimation();
    const ref = useRef<HTMLAnchorElement>(null);


  return (
    <motion.a
      href={article.link}
      ref={ref}
      initial={{ y: 50 }}
      animate={controls}
      whileHover={{ scale: 1.05, rotate: "1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      <img
        src={article.image}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70"></div>
      <div className="relative z-10 flex flex-col justify-end h-full">
        <h3 className="text-3xl font-semibold text-white">{article.title}</h3>
        <p className="mt-2 text-lg text-gray-300">{article.description}</p>
        <span className="mt-4 inline-block text-indigo-400 font-medium">
          Read more &rarr;
        </span>
      </div>
    </motion.a>
  );
};

export default function TopArticles(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800 dark:text-slate-200" {...props}>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Discover Our<span className="text-slate-400"> Latest Articles</span>
        </h2>
        <button
          className="whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 font-medium text-white shadow-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300"
        >
          View All Articles
        </button>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {articles.map((article, index) => (
          <BounceCard
            key={article.id}
            article={article}
            className={`col-span-12 ${
              index % 2 === 0 ? "md:col-span-4" : "md:col-span-8"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
