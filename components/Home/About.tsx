"use client"

import { MapPin } from "lucide-react";
import Image from "next/image";
import MyImage from "@/public/images/me.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import Certificates from '@/components/Home/Certifications'


const stats = [
    { label: 'Coding Since', value: '2013' },
    { label: 'Completed Projects', value: '8+' },
    { label: 'Satisfied Clients', value: '6+' },
    { label: 'Certifications', value: <Certificates />},
];

export default function About(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 200], [0, -50]);
    const y2 = useTransform(scrollY, [0, 200], [0, 50]);
    const x1 = useTransform(scrollY, [0, 200], [0, -50]);
    const x2 = useTransform(scrollY, [0, 200], [0, 50]);

    return (
        <section className="relative py-8" {...props}>
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                    <motion.div
                        aria-hidden="true"
                        className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
                        style={{ y: y1, x: x1 }}
                    >
                        <div className="absolute inset-y-0 right-1/2 w-full bg-slate-200 dark:bg-slate-900 rounded-r-3xl lg:right-72" />
                        <motion.svg
                            className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                            width={404}
                            height={392}
                            fill="none"
                            viewBox="0 0 404 392"
                        >
                            <defs>
                                <pattern
                                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect
                                        x={0}
                                        y={0}
                                        width={4}
                                        height={4}
                                        className="text-slate-200 dark:text-slate-700"
                                        fill="currentColor"
                                    />
                                </pattern>
                            </defs>
                            <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                        </motion.svg>
                    </motion.div>
                    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-16">
                        <div
                            className="relative pt-64 mx-auto md:mx-4 mb-16 rounded-2xl shadow-xl overflow-hidden"
                        >
                            <Image
                                className="absolute inset-0 h-full w-full object-cover object-center"
                                src={MyImage}
                                alt="Profile picture"
                                width={400}
                            />
                            <div className="absolute inset-0 bg-secondary mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-600 via-slate-600 opacity-90 dark:from-slate-900 dark:via-slate-900" />
                            <div className="relative pt-16 md:pt-0 px-8">
                                <div className="flex items-center text-white">
                                    <MapPin className="h-8 w-8" />
                                    Colombo, Sri Lanka
                                </div>
                                <blockquote className="my-8">
                                    <div className="relative text-lg font-medium text-white md:flex-grow">
                                        <p className="relative dark:text-slate-300 text-slate-100">
                                            I am a research student based in Colombo, Sri Lanka. I have a strong background in computer science and a deep interest in artificial intelligence and cloud technologies. My career goal spans both academia and industry, where I aim to contribute to the development of cutting-edge technologies and solutions that address real-world problems.
                                        </p>
                                    </div>
                                    <footer className="mt-4">
                                        <p className="text-base text-slate-100"><span className="font-semibold">Madusha Sandaruwan, </span>Computer Science Undergraduate</p>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mx-auto max-w-md px-4 py-4 sm:max-w-3xl sm:px-6 lg:px-0">
                    <div className="mt-12 md:mt-16 lg:mt-20">
                        <h2 className="text-3xl text-slate-900 dark:text-slate-100 font-extrabold tracking-tight sm:text-4xl">
                            About Me
                        </h2>
                        <div className="mt-6 text-slate-500 dark:text-slate-300 space-y-6">
                            <p className="text-base leading-7">
                                My interests extend beyond the technical realm to include history, philosophy, literature, and personal development. I am dedicated to sustainability and fairness, and I am driven by a commitment to integrity, compassion, and innovation.
                            </p>
                            <p className="text-base leading-7">
                                I am always eager to learn and grow, seeking new challenges that allow me to apply my skills and knowledge to make a positive impact. Whether working on software development projects or exploring the depths of the human mind and environmental issues, I strive to excel in all my endeavors.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="border-t-2 border-slate-600 dark:border-slate-400 pt-6">
                                    <dt className="text-base font-medium text-slate-500 dark:text-slate-300">{stat.label}</dt>
                                    <dd className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
