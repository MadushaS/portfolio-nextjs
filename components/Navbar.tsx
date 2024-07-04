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
    <div className="border border-slate-300 dark:border-slate-700 p-2 rounded-none md:rounded-full mb-8 sticky top-0 md:top-1 z-[100] bg-slate-200 dark:bg-slate-800 backdrop-blur-md w-full md:w-fit mx-auto">
      <nav className="flex gap-2 relative justify-start z-[100] w-fit rounded-lg">
        {navItems.map((item) => {
          const isActive = item.path === activePath;
          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-full text-sm lg:text-base relative no-underline duration-300 ease-in ${isActive ? "text-slate-300 dark:text-slate-800 font-bold" : "text-slate-700 dark:text-slate-400 hover:text-slate-100 dark:hover:text-slate-200"
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
                  className="absolute bottom-0 left-0 h-full bg-primary dark:bg-secondary rounded-full -z-10"
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
        <ThemeToggle />
      </nav>
    </div>
  );
}
