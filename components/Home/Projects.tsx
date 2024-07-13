'use client'

import PreloadProjects from "../PreloadProjects";
import { ProjectsList } from "@/data/projects";
import ProjectCard from "./Project-card";

export default function Projects(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
    return (
        <section id="projects" className="w-full" {...props}>
            <PreloadProjects projects={ProjectsList} />
            <div className="container px-4 md:px-6 rounded-lg py-12 md:py-16 lg:py-24 p-2 md:p-16">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Latest Projects</h2>
                        <p className="max-w-[900px] text-card-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Check out some of my recent work and see what I&apos;ve been up to.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
                    {ProjectsList.map((feature, index) => (
                        <ProjectCard key={feature.title} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

