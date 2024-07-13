"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const AuroraBackground = ({ className, showRadialGradient = true, ...props }: {
  className?: string;
  showRadialGradient?: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center text-slate-950",
        className
      )}
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--slate-200)_0%,var(--slate-200)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--slate-200)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--slate-800)_0%,var(--slate-800)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--slate-800)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--slate-500)_10%,var(--slate-600)_15%,var(--slate-400)_20%,var(--slate-300)_25%,var(--slate-700)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            pointer-events-none
            absolute -inset-[10px] opacity-50`,

            showRadialGradient &&
            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
    </motion.div>
  );
};
