import React, { HTMLProps, JSX } from "react";
import { Button, ButtonProps } from "../ui/button";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

import HeroImage from "@/public/images/portrait.webp";
import { SiLinkedin, SiX } from "react-icons/si";

const socialMedia: {
  text: string;
  url: string;
  type: ButtonProps["variant"];
  icon: JSX.Element;
}[] = [
  {
    text: "Connect on",
    url: "https://linkedin.com/in/madushasandaruwan",
    type: "default",
    icon: <SiLinkedin />,
  },
  {
    text: "Follow on",
    url: "https://x.com/_MadushaS",
    type: "secondary",
    icon: <SiX />,
  },
];

export default function Hero(props: Readonly<HTMLProps<HTMLDivElement>>) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -60]);

  return (
    <section
      className="relative z-10 flex h-[100vh] items-center justify-center px-4 text-3xl md:text-4xl lg:text-7xl"
      {...props}
    >
      <motion.div
        style={{ y: y1 }}
        className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6"
      >
        <div className="space-y-6 md:w-1/2">
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold md:text-xl">👋 Hi, I&apos;m</p>
            <h1 className="text-primary text-5xl font-bold tracking-tight md:text-5xl lg:text-7xl 2xl:text-9xl">
              Madusha Sandaruwan
            </h1>
          </motion.div>
          <p className="text-lg">
            A{" "}
            <span className="font-bold">
              GitHub Certified Full-Stack Developer{" "}
            </span>
            with expertise in building modern, responsive, scalable, and
            performant applications. Let&apos;s create something extraordinary!
          </p>
          <div id="social-media" className="flex space-x-4">
            {socialMedia.map((item) => (
              <Button asChild key={item.text} variant={item.type}>
                <Link
                  href={item.url}
                  className={cn("rounded-lg font-semibold")}
                >
                  {item.text}
                  <span className="ml-2">{item.icon}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Image
            src={HeroImage}
            width={400}
            height={400}
            alt="Madusha Sandaruwan"
            className="mt-16 aspect-square max-h-72 max-w-72 md:mt-0 md:max-h-96 md:max-w-96 lg:max-h-[512px] lg:max-w-[512px]"
          />
        </div>
      </motion.div>
    </section>
  );
}
