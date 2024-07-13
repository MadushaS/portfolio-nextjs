// ProjectCard.js

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { BadgeCheckIcon, CalendarIcon, CodeIcon, GithubIcon, RocketIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { ProjectType } from '@/data/projects';

const ProjectCard = ({ project }: { project: ProjectType }) => {
    return (
        < Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-popover border-border" >
            <CardHeader className="relative p-2 object-contain">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={350}
                    height={700}
                    className="aspect-video w-full rounded-lg object-cover p-2"
                />
                <div className="flex flex-wrap gap-2 m-4">
                    {project.tags.map((tag) => (
                        <span key={tag} className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-sm ">
                            {tag}
                        </span>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="mx-4 mt-4 space-y-4 flex flex-col flex-grow border-border">
                <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
                    {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                    {project.description}
                </p>
                <div className="flex items-center text-sm text-accent-foreground space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span><strong>Year:</strong> {project.year}</span>
                </div>
                <div className="flex items-center text-sm text-accent-foreground space-x-2">
                    <BadgeCheckIcon className="h-5 w-5" />
                    <span><strong>License:</strong> {project.license}</span>
                </div>
                <div className="flex items-center text-sm text-accent-foreground space-x-2">
                    <CodeIcon className="h-5 w-5" />
                    <span><strong>Technologies:</strong> {project.technologies.join(', ')}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center border-t border-border bg-accent">
                {project.githubRepo ? (
                    <Button variant="default" asChild>
                        <Link href={project.githubRepo} prefetch={false} className="flex items-center">
                            <GithubIcon className="h-5 w-5 mr-2" />
                            View Project
                        </Link>
                    </Button>
                ) : <span />}
                {project.demoLink ? (
                    <Button variant="secondary" asChild>
                        <Link href={project.demoLink} prefetch={true} className="flex items-center">
                            <RocketIcon className="h-5 w-5 mr-2" />
                            Live Demo
                        </Link>
                    </Button>
                ) : <span />}
            </CardFooter>
        </Card >
    );
};

export default ProjectCard;
