"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const AuroraBackground = ({
  className,
  showRadialGradient = true,
  ...props
}: {
  className?: string;
  showRadialGradient?: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "relative flex h-[100vh] flex-col items-center justify-center text-slate-950",
        className,
      )}
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter [--aurora:repeating-linear-gradient(100deg,var(--slate-500)_10%,var(--slate-600)_15%,var(--slate-400)_20%,var(--slate-300)_25%,var(--slate-700)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--slate-800)_0%,var(--slate-800)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--slate-800)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--slate-200)_0%,var(--slate-200)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--slate-200)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 dark:after:[background-image:var(--dark-gradient),var(--aurora)]`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        ></div>
      </div>
    </motion.div>
  );
};
