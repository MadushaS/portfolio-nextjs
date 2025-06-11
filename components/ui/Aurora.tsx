"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
  variant?: "default" | "subtle" | "vibrant" | "minimal" | "classic" | "navy";
  interactive?: boolean;
  animationSpeed?: "slow" | "medium" | "fast" | "none";
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  variant = "default",
  interactive = false,
  animationSpeed = "medium",
  ...props
}: AuroraBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement if interactive
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Animation classes based on speed setting
  const getAnimationClass = () => {
    switch (animationSpeed) {
      case "slow":
        return "animate-aurora-slow";
      case "fast":
        return "animate-aurora-fast";
      case "none":
        return "";
      default:
        return "animate-aurora";
    }
  };

  // Get gradient variables based on variant
  const getGradientStyles = () => {
    switch (variant) {
      case "subtle":
        return {
          "--aurora":
            "linear-gradient(125deg, rgba(30, 64, 175, 0.4) 15%, rgba(59, 130, 246, 0.3) 30%, rgba(148, 163, 184, 0.3) 40%, rgba(71, 85, 105, 0.4) 50%)",
          "--overlay":
            "linear-gradient(125deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
          "--dark-overlay":
            "linear-gradient(125deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))",
        };
      case "vibrant":
        return {
          "--aurora":
            "linear-gradient(125deg, rgba(30, 64, 175, 0.5) 10%, rgba(59, 130, 246, 0.4) 30%, rgba(71, 85, 105, 0.4) 50%, rgba(15, 23, 42, 0.5) 70%)",
          "--overlay":
            "linear-gradient(125deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
          "--dark-overlay":
            "linear-gradient(125deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.1))",
        };
      case "minimal":
        return {
          "--aurora":
            "linear-gradient(125deg, rgba(59, 130, 246, 0.3) 20%, rgba(71, 85, 105, 0.2) 60%)",
          "--overlay":
            "linear-gradient(125deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))",
          "--dark-overlay":
            "linear-gradient(125deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05))",
        };
      case "classic":
        return {
          "--aurora":
            "linear-gradient(125deg, rgba(15, 23, 42, 0.4) 10%, rgba(30, 41, 59, 0.3) 30%, rgba(51, 65, 85, 0.3) 50%, rgba(71, 85, 105, 0.4) 70%)",
          "--overlay":
            "linear-gradient(125deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))",
          "--dark-overlay":
            "linear-gradient(125deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05))",
        };
      case "navy":
        return {
          "--aurora":
            "linear-gradient(125deg, rgba(30, 58, 138, 0.4) 15%, rgba(59, 130, 246, 0.3) 35%, rgba(30, 64, 175, 0.3) 55%, rgba(15, 23, 42, 0.4) 75%)",
          "--overlay":
            "linear-gradient(125deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))",
          "--dark-overlay":
            "linear-gradient(125deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.08))",
        };
      default:
        return {
          "--aurora":
            "repeating-linear-gradient(100deg, #1e40af 10%, #3b82f6 15%, #64748b 20%, #475569 25%, #334155 30%)",
          "--overlay":
            "repeating-linear-gradient(100deg, rgba(241, 245, 249, 0.6) 0%, rgba(255, 255, 255, 0.4) 7%, transparent 10%, transparent 12%, rgba(248, 250, 252, 0.3) 16%)",
          "--dark-overlay":
            "repeating-linear-gradient(100deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 7%, transparent 10%, transparent 12%, rgba(51, 65, 85, 0.6) 16%)",
        };
    }
  };

  return (
    <section className="relative w-full">
      <div
        className={cn(
          "relative flex min-h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 transition-colors duration-500 dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        {/* Background layers */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              ...getGradientStyles(),
              "--mouse-x": interactive ? mousePosition.x.toString() : "0.5",
              "--mouse-y": interactive ? mousePosition.y.toString() : "0.5",
            } as React.CSSProperties
          }
        >
          {/* Main aurora effect */}
          <div
            className={cn(
              "pointer-events-none absolute -inset-[10px]",
              "opacity-50 blur-[10px]",
              "[background-image:var(--overlay),var(--aurora)]",
              "[background-size:300%,200%]",
              getAnimationClass(),
              "dark:[background-image:var(--dark-overlay),var(--aurora)]",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_calc(50%+calc(var(--mouse-x,0.5)*50%))_calc(50%+calc(var(--mouse-y,0.5)*30%)),black_5%,transparent_70%)]",
            )}
          />

          {/* Floating orbs - only shown in non-minimal variants */}
          {variant !== "minimal" && (
            <>
              <div className="animate-float absolute top-[20%] left-[15%] h-[30vw] w-[30vw] rounded-full bg-blue-400/30 opacity-30 blur-3xl dark:bg-blue-600/20 dark:opacity-20" />
              <div className="animate-float-delayed absolute right-[15%] bottom-[10%] h-[25vw] w-[25vw] rounded-full bg-purple-400/30 opacity-30 blur-3xl dark:bg-purple-600/20 dark:opacity-20" />
            </>
          )}

          {/* Subtle grain texture */}
          <div className="bg-noise absolute inset-0 opacity-[0.02] mix-blend-overlay dark:opacity-[0.04]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </section>
  );
};
