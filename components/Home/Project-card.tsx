import { ProjectType } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BadgeCheckIcon, CalendarIcon, CodeIcon, RocketIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export default function ProjectCard({
    title,
    description,
    license,
    image,
    year,
    technologies,
    tags,
    githubRepo,
    demoLink,
    index,
}: ProjectType & { index: number }
) {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r pt-10 relative group/project border-border bg-card hover:bg-accent/30 transition-colors duration-200",
                (index === 0 || index === 3) && "lg:border-l border-border",
                index < 3 && "lg:border-b border-border"
            )}
        >
            <div className="p-4">
                <Image
                    src={image}
                    alt={title}
                    width={350}
                    height={700}
                    className="aspect-video w-full rounded-lg object-cover"
                />
                <div className="flex flex-wrap gap-2 m-4">
                    {tags.map((tag) => (
                        <span key={tag} className="inline-block rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-xl font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/project:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/project:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/project:translate-x-2 transition duration-200 inline-block text-card-foreground">
                    {title}
                </span>
            </div>
            <div className="mx-4 mt-4 space-y-4 flex flex-col flex-grow border-border">
                <p className="text-muted-foreground mb-4">
                    {description}
                </p>
                <div className="flex items-center text-sm text-accent-foreground space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span><strong>Year:</strong> {year}</span>
                </div>
                <div className="flex items-center text-sm text-accent-foreground space-x-2">
                    <BadgeCheckIcon className="h-5 w-5" />
                    <span><strong>License:</strong> {license}</span>
                </div>
                <div className="flex items-center text-sm text-accent-foreground space-x-2">
                    <CodeIcon className="h-5 w-5" />
                    <span><strong>Technologies:</strong> {technologies.join(', ')}</span>
                </div>
            </div>
            <div className="p-4 flex justify-between items-center">
                {githubRepo ? (
                    <Button variant="default" asChild>
                        <Link href={githubRepo} prefetch={false} className="flex items-center">
                            <SiGithub className="h-5 w-5 mr-2" />
                            View Project
                        </Link>
                    </Button>
                ) : <span />}
                {demoLink ? (
                    <Button variant="secondary" asChild>
                        <Link href={demoLink} prefetch={true} className="flex items-center">
                            <RocketIcon className="h-5 w-5 mr-2" />
                            Live Demo
                        </Link>
                    </Button>
                ) : <span />}
            </div>
        </div>
    );
};
