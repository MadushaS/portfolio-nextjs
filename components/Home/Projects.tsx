'use client'

import PreloadProjects from "../PreloadProjects";
import { ProjectsList } from "@/data/projects";
import ProjectCard from "./Project-card";
import SectionContainer from "../shared/SectionContainer";

export default function Projects(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
    return (
        <SectionContainer id="projects" title="My Latest Projects" subtitle="Check out some of my recent work and see what I've been up to." >
            <PreloadProjects projects={ProjectsList} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
                {ProjectsList.map((feature, index) => (
                    <ProjectCard key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </SectionContainer>
    );
}

