import React, { HTMLProps, useState } from 'react';
import { BriefcaseIcon, ChevronDownIcon, ExternalLinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '@/data/experiences';

const ExperienceSection = (props: Readonly<HTMLProps<HTMLDivElement>>) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section {...props} className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                    Work Experience
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A journey through my professional experience and the impact I&apos;ve made along the way.
                </p>
            </motion.div>

            <div className="grid gap-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <BriefcaseIcon className="w-5 h-5 text-primary" />
                                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                                </div>
                                <button
                                    onClick={() => setExpandedId(expandedId === index ? null : index)}
                                    className="p-1 hover:bg-accent rounded-full transition-colors duration-200"
                                    aria-label={expandedId === index ? "Collapse details" : "Expand details"}
                                >
                                    <ChevronDownIcon
                                        className={`w-5 h-5 transform transition-transform duration-200 ${expandedId === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="mb-4">
                                <p className="text-lg font-medium">{exp.position}</p>
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                    <span>{exp.duration}</span>
                                    <span>{exp.location}</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedId === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="mr-2 text-primary">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground dark:bg-secondary-foreground dark:text-secondary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={exp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Visit Company
                                            <ExternalLinkIcon className="w-4 h-4 ml-1" />
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;