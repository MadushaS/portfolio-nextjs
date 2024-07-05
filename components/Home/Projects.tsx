import PreloadProjects from "../PreloadProjects";
import ProjectCard from "./Project-card"

import { ProjectsList } from "@/data/projects";

export default function Projects(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
    return (
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <PreloadProjects projects={ProjectsList} />
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Latest Projects</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Check out some of my recent work and see what I&apos;ve been up to.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

                    {ProjectsList.map((project, index) => {
                        return (
                            <ProjectCard key={index} project={project} />
                        )
                    })}
                </div>
            </div>
        </section>
    );
}