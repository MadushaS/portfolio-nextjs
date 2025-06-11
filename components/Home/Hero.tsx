import React, { HTMLProps, JSX } from "react";
import { Button, ButtonProps } from "../ui/button";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Download, Mail } from "lucide-react";

import HeroImage from "@/public/images/profile.jpg";
import { SiLinkedin, SiX, SiGithub } from "react-icons/si";

const socialMedia: {
  text: string;
  url: string;
  type: ButtonProps["variant"];
  icon: JSX.Element;
}[] = [
  {
    text: "LinkedIn",
    url: "https://linkedin.com/in/madushasandaruwan",
    type: "outline",
    icon: <SiLinkedin />,
  },
  {
    text: "GitHub",
    url: "https://github.com/madushaS/",
    type: "outline",
    icon: <SiGithub />,
  },
  {
    text: "Twitter",
    url: "https://x.com/_MadushaS",
    type: "outline",
    icon: <SiX />,
  },
];

const stats = [
  { value: "Community", label: "Advocate" },
  { value: "GitHub", label: "Certified Developer" },
];

export default function Hero(props: Readonly<HTMLProps<HTMLDivElement>>) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -60]);

  return (
    <section
      className="relative z-10 flex min-h-screen items-center justify-center px-4"
      {...props}
    >
      <motion.div
        style={{ y: y1 }}
        className="container mx-auto flex flex-col items-center justify-between gap-12 px-4 md:flex-row md:px-6"
      >
        {/* Content Section */}
        <div className="flex flex-col space-y-8 md:w-1/2">
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Available for work
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg font-medium md:text-xl">
                👋 Hello, I&apos;m
              </p>
              <h1 className="text-gradient text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
                Madusha Sandaruwan
              </h1>
              <div className="text-foreground/80 text-2xl font-semibold md:text-3xl lg:text-4xl">
                Full-Stack Developer
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            I craft modern, scalable web applications with cutting-edge
            technologies. From concept to deployment, I bring ideas to life with
            clean code and exceptional user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="group">
              <Link href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume.pdf" target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="mailto:work@madusha.dev">
                <Mail className="mr-2 h-4 w-4" />
                Let&apos;s Talk
              </Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex gap-4"
          >
            {socialMedia.map((item, index) => (
              <Button
                key={item.text}
                asChild
                variant={item.type}
                size="icon"
                className="transition-transform hover:scale-110"
              >
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                  <span className="sr-only">{item.text}</span>
                </Link>
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative md:w-1/2"
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="from-primary/20 absolute -inset-4 aspect-square rounded-full bg-gradient-to-r to-purple-500/20 blur-2xl" />
            <div className="border-background  w-fit h-fit relative overflow-hidden aspect-square rounded-full border-4 shadow-2xl">
              {/* add image overlay to add modern look */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-50 transition-opacity duration-500 hover:opacity-70" />
              <Image
                src={HeroImage}
                width={500}
                height={500}
                alt="Madusha Sandaruwan - Full-Stack Developer"
                className="aspect-square object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-background/80 absolute top-8 -right-4 rounded-lg border px-3 py-2 shadow-lg backdrop-blur-sm"
            >
              <div className="text-sm font-semibold">🤖 AI Specialist</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="bg-background/80 absolute bottom-8 -left-4 rounded-lg border px-3 py-2 shadow-lg backdrop-blur-sm"
            >
              <div className="text-sm font-semibold">⚡ .NET Expert</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
