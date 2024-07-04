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
        <section className="relative bg-white dark:bg-gray-900 py-16 sm:py-24" {...props}>
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                    <motion.div
                        aria-hidden="true"
                        className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
                        style={{ y: y1, x: x1 }}
                    >
                        <div className="absolute inset-y-0 right-1/2 w-full bg-gray-200 dark:bg-gray-800 rounded-r-3xl lg:right-72" />
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
                                        className="text-gray-200 dark:text-gray-700"
                                        fill="currentColor"
                                    />
                                </pattern>
                            </defs>
                            <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                        </motion.svg>
                    </motion.div>
                    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-16">
                        <motion.div
                            className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden"
                            style={{ y: y2, x: x2 }}
                        >
                            <Image
                                className="absolute inset-0 h-full w-full object-cover object-center"
                                src={MyImage}
                                alt="Profile picture"
                                width={400}
                            />
                            <div className="absolute inset-0 bg-secondary mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-600 via-slate-600 opacity-90 dark:from-gray-900 dark:via-gray-900" />
                            <div className="relative px-8">
                                <div className="flex items-center text-white">
                                    <MapPin className="h-8 w-8" />
                                    Colombo, Sri Lanka
                                </div>
                                <blockquote className="mt-8">
                                    <div className="relative text-lg font-medium text-white md:flex-grow">
                                        <svg
                                            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-slate-700 dark:text-slate-300"
                                            fill="currentColor"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                        </svg>
                                        <p className="relative dark:text-gray-300 text-gray-100">
                                            I am a research student based in Colombo, Sri Lanka. I have a strong background in computer science and a deep interest in artificial intelligence and cloud technologies. My career goal spans both academia and industry, where I aim to contribute to the development of cutting-edge technologies and solutions that address real-world problems.
                                        </p>
                                    </div>
                                    <footer className="mt-4">
                                        <p className="text-base text-slate-100"><span className="font-semibold">Madusha Sandaruwan, </span>Computer Science Undergraduate</p>
                                    </footer>
                                </blockquote>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                    <div className="pt-12 sm:pt-16 lg:pt-20">
                        <h2 className="text-3xl text-gray-900 dark:text-gray-100 font-extrabold tracking-tight sm:text-4xl">
                            About Me
                        </h2>
                        <div className="mt-6 text-gray-500 dark:text-gray-300 space-y-6">
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
                                <div key={stat.label} className="border-t-2 border-gray-100 dark:border-gray-800 pt-6">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-300">{stat.label}</dt>
                                    <dd className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
