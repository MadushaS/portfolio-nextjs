import React from "react";
import { Button, ButtonProps } from "../ui/button";
import Image from "next/image";
import { FlipWords } from "../ui/flip-text";
import { useScroll, useTransform, motion } from 'framer-motion'
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import HeroImage from "@/public/images/portrait.webp";

const wordList = ["Computer Science Undergraduate", "Developer who loves coding", "Cloud-Native Enthusiast", "Life-long Learner"];

const socialMedia: {
    text: string;
    url: string;
    type: ButtonProps["variant"],
    class: string;
}[]
    = [
        {
            text: "Connect on LinkedIn",
            url: "https://linkedin.com/in/madushasandaruwan",
            type: "primary",
            class: "text-primay dark:text-secondary"
        },
        {
            text: "Follow on X",
            url: "https://x.com/_MadushaS",
            type: "secondary",
            class: "text-primay dark:text-secondary"
        }
    ]

export default function Hero(props: React.HTMLProps<HTMLDivElement>) {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 300], [0, 100])
    const y2 = useTransform(scrollY, [0, 300], [0, -60])
    const y3 = useTransform(scrollY, [0, 300], [0, -200])

    return (
        <section className="flex relative -top-24 h-[100vh] items-center justify-center px-4 text-3xl md:text-4xl lg:text-7xl z-10" {...props}>
            <motion.div
                style={{ y: y1 }}
                className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between"
            >
                <div className="md:w-1/2 space-y-6">
                    <motion.div style={{ y: y2 }}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        <span className="text-base md:text-lg">Hi, I&apos;m</span>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-primary dark:text-secondary" >
                            Madusha Sandaruwan
                        </h1>
                    </motion.div>
                    <div className="text-lg">
                        &#123; <FlipWords words={wordList} /> &#125;
                    </div>
                    <p className=" text-lg hidden md:flex">
                        I am a passionate developer who thrives on innovating solutions to real-world problems. With a strong foundation in computer science, I am honing my skills in software development, DevOps, and cloud native technologies with love for open source.
                    </p>
                    <div id="social-media" className="flex space-x-4">
                        {socialMedia.map((item, index) => (
                            <Button
                                asChild
                                key={index}
                                variant={item.type}
                            >
                                <Link href={item.url} className={cn("font-semibold rounded-lg", item.class)}>
                                    {item.text}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <motion.div style={{ y: y3 }}>
                    <Image src= {HeroImage} width={400} height={400} alt="Madusha Sandaruwan" className="mt-4 md:mt-0 max-w-72 max-h-72 md:max-w-96 md:max-h-96 lg:max-w-[512px] lg:max-h-[512px] aspect-square" />
                </motion.div>
            </motion.div>
            <motion.div style={{ y: y3 }} className="absolute animate-bounce bottom-8">
                <span className="rounded-full p-2">
                    <ChevronDown className="text-slate-700 dark:text-slate-200" />
                </span>
            </motion.div>
        </section>
    );
}
