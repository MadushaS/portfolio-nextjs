"use client";

import { motion } from "framer-motion";
import { act, useEffect, useState } from "react";
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
  { name: "Blog", path: "/blog", active: true},
];

export default function NavBar() {
  const [activePath, setActivePath] = useState('home');

  const scrollToView = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const element = document.querySelector(href);
    if (element instanceof HTMLElement) { // Type assertion here
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

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
    <div className="border-b border-border flex p-2 rounded-none mb-8 sticky top-0 z-[100] bg-card text-accent-foreground backdrop-blur-md w-full mx-auto max-w-full">
      <nav className="flex justify-between gap-2 relative z-[100] w-full rounded-lg">
        <h3 className="block justify-start px-4 py-2 rounded-full text-xl text-primary font-black font-mono not-sr-only">
          <Link href="/">
            ://madusha
          </Link>
        </h3>
        <div className="flex justify-between gap-2">
          {navItems.map((item) => {
            const isActive = item.path === activePath;
            return (
              <Link
                key={item.path}
                className={`hidden md:block px-4 py-2 rounded-full text-sm lg:text-base font-semibold relative no-underline duration-300 ease-in ${isActive ? "text-primary font-bold" : "hover:text-accent-foreground"
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
                    className="absolute bottom-0 left-0 h-1 bg-primary rounded-full -z-10"
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
          })
          }
        </div>
        <ThemeToggle className="flex-end justify-end justify-items-end" />
      </nav>
    </div>
  );
}

export function BlogNavBar() {
  return (
    <div className="border-b border-border flex p-2 rounded-none mb-8 sticky top-0 z-[100] bg-card text-accent-foreground backdrop-blur-md w-full mx-auto max-w-full">
      <nav className="flex justify-between gap-2 relative z-[100] w-full rounded-lg">
        <h3 className="block justify-start px-4 py-2 rounded-full text-xl text-primary font-black font-mono not-sr-only">
          <Link href="/blog">
            ://madusha
          </Link>
        </h3>
        <div className="flex justify-between gap-2">
          {pages.map((item) => {
            return (
              <Link
                key={item.path}
                className={`hidden md:block px-4 py-2 rounded-full text-sm lg:text-base font-semibold relative no-underline duration-300 ease-in ${item.active ? "text-primary font-bold" : "hover:text-accent-foreground"
                  }`}
                href={item.path}
              >
                <span>{item.name}</span>
                {item.active && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-primary rounded-full -z-10"
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
          })
          }
        </div>
        <ThemeToggle className="flex-end justify-end justify-items-end" />
      </nav>
    </div>
  )
}