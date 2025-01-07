import React, { HTMLProps, JSX } from "react";
import { Button, ButtonProps } from "../ui/button";
import Image from "next/image";
import { useScroll, useTransform, motion } from 'framer-motion'
import Link from "next/link";
import { cn } from "@/lib/utils";

import HeroImage from "@/public/images/portrait.webp";
import { SiLinkedin, SiX } from "react-icons/si";

const socialMedia: {
    text: string;
    url: string;
    type: ButtonProps["variant"],
    icon: JSX.Element;
}[]
    = [
        {
            text: "Connect on",
            url: "https://linkedin.com/in/madushasandaruwan",
            type: "default",
            icon: <SiLinkedin />
        },
        {
            text: "Follow on",
            url: "https://x.com/_MadushaS",
            type: "secondary",
            icon: <SiX />
        }
    ]

export default function Hero(props: Readonly<HTMLProps<HTMLDivElement>>) {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 300], [0, 100])
    const y2 = useTransform(scrollY, [0, 300], [0, -60])

    return (
        <section className="flex relative h-[100vh] items-center justify-center px-4 text-3xl md:text-4xl lg:text-7xl z-10" {...props}>
            <motion.div
                style={{ y: y1 }}
                className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between"
            >
                <div className="md:w-1/2 space-y-6">
                    <motion.div style={{ y: y2 }}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        <p className="text-lg md:text-xl font-semibold ">👋 Hi, I&apos;m</p>
                        <h1 className="text-5xl md:text-5xl lg:text-7xl 2xl:text-9xl font-bold tracking-tight text-primary" >
                            Madusha Sandaruwan
                        </h1>
                    </motion.div>
                    <p className="text-lg">
                        A <span className="font-bold">GitHub Certified Full-Stack Developer</span> who loves to build modern, responsive, scalable, and performant applications. Let&apos;s build something amazing together!
                    </p>
                    <div id="social-media" className="flex space-x-4">
                        {socialMedia.map((item) => (
                            <Button
                                asChild
                                key={item.text}
                                variant={item.type}
                            >
                                <Link href={item.url} className={cn("font-semibold rounded-lg")}>
                                    {item.text}
                                    <span className="ml-2">{item.icon}</span>
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div >
                    <Image src={HeroImage} width={400} height={400} alt="Madusha Sandaruwan" className="mt-16 md:mt-0 max-w-72 max-h-72 md:max-w-96 md:max-h-96 lg:max-w-[512px] lg:max-h-[512px] aspect-square" />
                </div>
            </motion.div>
        </section>
    );
}
