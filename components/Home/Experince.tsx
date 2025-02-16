import React, { HTMLProps, useState } from "react";
import { BriefcaseIcon, ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";

const ExperienceSection = (props: Readonly<HTMLProps<HTMLDivElement>>) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section
      {...props}
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Work Experience
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          A journey through my professional experience and the impact I&apos;ve
          made along the way.
        </p>
      </motion.div>

      <div className="grid gap-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="text-primary h-5 w-5" />
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                </div>
                <button
                  onClick={() =>
                    setExpandedId(expandedId === index ? null : index)
                  }
                  className="hover:bg-accent rounded-full p-1 transition-colors duration-200"
                  aria-label={
                    expandedId === index ? "Collapse details" : "Expand details"
                  }
                >
                  <ChevronDownIcon
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      expandedId === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium">{exp.position}</p>
                <div className="text-muted-foreground mt-1 flex justify-between text-sm">
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
                    <ul className="text-muted-foreground mb-4 space-y-2 text-sm">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-secondary text-secondary-foreground dark:bg-secondary-foreground dark:text-secondary rounded-full px-3 py-1 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 inline-flex items-center text-sm transition-colors"
                    >
                      Visit Company
                      <ExternalLinkIcon className="ml-1 h-4 w-4" />
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
