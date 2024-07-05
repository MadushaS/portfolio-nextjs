// ProjectCard.js

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../ui/button';
import { BadgeCheckIcon, CalendarIcon, CodeIcon, GithubIcon, RocketIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { ProjectType } from '@/data/projects';

const ProjectCard = ({ project }: { project: ProjectType }) => {

    return (

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-700">
            <CardHeader className="p-4 relative object-contain">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={350}
                    height={700}
                    className="aspect-video w-full rounded-lg object-cover mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <span key={tag} className="inline-block rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-2">
                    {project.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-400 mb-4">
                    {project.description}
                </p>
            </CardHeader>
            <CardContent className="p-4 space-y-4 flex flex-col flex-grow border-slate-200 dark:border-slate-700">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span><strong>Date:</strong> {project.year}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
                    <BadgeCheckIcon className="h-5 w-5" />
                    <span><strong>License:</strong> {project.license}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
                    <CodeIcon className="h-5 w-5" />
                    <span><strong>Technologies:</strong> {project.technologies.join(', ')}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800">
                {project.githubRepo ? (
                    <Button variant="primary" asChild>
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
        </Card>
    );
};

export default ProjectCard;
