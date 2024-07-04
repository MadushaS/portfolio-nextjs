"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export const AuroraBackground = ({ className, showRadialGradient = true, ...props }: {
  className?: string;
  showRadialGradient?: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center text-slate-950 transition-colors duration-500",
        className
      )}
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--slate-100)_0%,var(--slate-100)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--slate-100)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--slate-900)_0%,var(--slate-900)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--slate-900)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--slate-500)_10%,var(--slate-600)_15%,var(--slate-400)_20%,var(--slate-300)_25%,var(--slate-700)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

            showRadialGradient &&
            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
          initial={{ backgroundPosition: "50% 50%" }}
          animate={{ backgroundPosition: "0% 0%" }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
};
