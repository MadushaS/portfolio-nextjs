"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            "--aurora": "repeating-linear-gradient(100deg,#3b82f6 10%,#a5b4fc 15%,#93c5fd 20%,#ddd6fe 25%,#60a5fa 30%)",
            "--dark-gradient": "repeating-linear-gradient(100deg,#000 0%,#000 7%,transparent 10%,transparent 12%,#000 16%)",
            "--white-gradient": "repeating-linear-gradient(100deg,#f1f1f1 0%,#fff 7%,transparent 10%,transparent 12%,#fff 16%)",
          } as React.CSSProperties}
        >
          <div
            className={cn(
              "pointer-events-none absolute -inset-[10px]",
              "opacity-50 blur-[10px]",
              "[background-image:var(--white-gradient),var(--aurora)]",
              "[background-size:300%,200%]",
              "animate-aurora",
              "dark:[background-image:var(--dark-gradient),var(--aurora)]",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
            )}
          />
        </div>
        {children}
      </div>
    </main>
  );
};