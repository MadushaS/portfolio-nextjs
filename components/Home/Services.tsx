import { Anvil, Cloud, Laptop, SquareTerminal } from "lucide-react";

/* This example requires Tailwind CSS v2.0+ */
const specialties = [
    {
        name: 'Open Source',
        icon: <SquareTerminal size={32} className="flex mx-auto" />,
        description: 'Contributing to open source projects and sharing knowledge with the community.',
        delay: 0.3,
    },
    {
        name: 'Web Development',
        icon: <Laptop size={32} className="flex mx-auto" />,
        description: 'from static sites to full-stack applications, I build web experiences that delight users.',
        delay: 0.4,
    },
    {
        name: 'Cloud Native',
        icon: <Cloud size={32} className="flex mx-auto" />,
        description: 'Building scalable and resilient applications using cloud-native technologies.',
        delay: 0.5,
    },
    {
        name: 'Community Builder',
        icon: <Anvil size={32} className="flex mx-auto" />,
        description: 'Engaging with the developer community and organizing events to foster collaboration.',
        delay: 0.6,
    },
];

import { delay, motion } from 'framer-motion';
import React from "react";

export default function Services(props: React.HTMLProps<HTMLDivElement>) {
    const animationVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },

    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8" {...props}>
            <div
                className="w-full bg-slate-200 dark:bg-slate-800 rounded-2xl px-6 py-16 sm:p-16"
            >
                <div className="mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            What I do
                        </h2>
                    </div>
                    <div className="mt-12 max-w-sm mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-4">
                        {specialties.map((specialty) => (
                            <motion.div
                                key={specialty.name}
                                className="text-center space-y-4 flex-col justify-center"
                                variants={{...animationVariants,
                                    visible: {
                                        ...animationVariants.visible,
                                        transition: {
                                            delay: specialty.delay,
                                        },
                                    },
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                            >
                                {specialty.icon}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold">{specialty.name}</h3>
                                    <p className="">{specialty.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
