"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", path: "#home" },
  { name: "Services", path: "#services" },
  { name: "About", path: "#about" },
  { name: "Projects", path: "#projects" },
  { name: "Blog", path: "#toparticles" },
  { name: "Contact", path: "#contact" },
];

const pages = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog", active: true },
];

export default function NavBar() {
  const [activePath, setActivePath] = useState("home");

  const scrollToView = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const element = document.querySelector(href);
    if (element instanceof HTMLElement) {
      // Type assertion here
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection: string | null = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    setActivePath(`#${currentSection}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="border-border bg-card text-accent-foreground sticky top-0 z-100 mx-auto mb-8 flex w-full max-w-full rounded-none border-b p-2 backdrop-blur-md">
      <nav className="relative z-100 flex w-full justify-between gap-2 rounded-lg">
        <h3 className="text-primary not-sr-only block justify-start rounded-full px-4 py-2 font-mono text-xl font-black">
          <Link href="/">://madusha</Link>
        </h3>
        <div className="flex justify-between gap-2">
          {navItems.map((item) => {
            const isActive = item.path === activePath;
            return (
              <Link
                key={item.path}
                className={`relative hidden rounded-full px-4 py-2 text-sm font-semibold no-underline duration-300 ease-in md:block lg:text-base ${
                  isActive
                    ? "text-primary font-bold"
                    : "hover:text-accent-foreground"
                }`}
                href={item.path}
                onClick={scrollToView}
                onMouseOver={() => {
                  setActivePath(item.path);
                }}
                onMouseLeave={handleScroll}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    className="bg-primary absolute bottom-0 left-0 -z-10 h-1 rounded-full"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      stiffness: 80,
                      damping: 12,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <ThemeToggle className="flex-end justify-end justify-items-end" />
      </nav>
    </div>
  );
}

export function BlogNavBar() {
  return (
    <div className="border-border bg-card text-accent-foreground sticky top-0 z-100 mx-auto mb-8 flex w-full max-w-full rounded-none border-b p-2 backdrop-blur-md">
      <nav className="relative z-100 flex w-full justify-between gap-2 rounded-lg">
        <h3 className="text-primary not-sr-only block justify-start rounded-full px-4 py-2 font-mono text-xl font-black">
          <Link href="/blog">://madusha</Link>
        </h3>
        <div className="flex justify-between gap-2">
          {pages.map((item) => {
            return (
              <Link
                key={item.path}
                className={`relative hidden rounded-full px-4 py-2 text-sm font-semibold no-underline duration-300 ease-in md:block lg:text-base ${
                  item.active
                    ? "text-primary font-bold"
                    : "hover:text-accent-foreground"
                }`}
                href={item.path}
              >
                <span>{item.name}</span>
                {item.active && (
                  <motion.div
                    className="bg-primary absolute bottom-0 left-0 -z-10 h-1 rounded-full"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      stiffness: 80,
                      damping: 12,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <ThemeToggle className="flex-end justify-end justify-items-end" />
      </nav>
    </div>
  );
}
