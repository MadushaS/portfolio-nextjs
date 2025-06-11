import { ProjectType } from "@/data/projects";
import { useEffect } from "react";

export default function PreloadProjects({
  projects,
}: Readonly<{ projects: ProjectType[] }>) {
  useEffect(() => {
    projects.forEach(({ demoLink }) => {
      if (demoLink) {
        fetch(demoLink, { mode: "no-cors" }).catch(() => {
          console.error(`Failed to preload project: ${demoLink}`);
        });
      }
    });
  }, [projects]);

  return <></>;
}
