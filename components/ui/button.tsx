import { cn } from "@/lib/utils";
import React from "react";

const baseClasses = "flex text-base items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-all duration-300 focus:outline-none";
const primaryClasses = "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 shadow-md hover:bg-slate-700 dark:hover:bg-slate-300";
const secondaryClasses = "border border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-300";

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  className?: string;
  asChild?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariants = (props: ButtonProps | undefined = undefined) => {
  if (!props?.variant) {
    return baseClasses;
  }
  return cn(baseClasses, props.variant === 'primary' ? primaryClasses : secondaryClasses);
}

const Button = ({ variant, children, className, onClick, asChild , ...props}: ButtonProps) => {
  const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses}`;

  if (asChild) {
    return (
      <span className={cn(classes, className)} {...props}>
        {children}
      </span>
    );
  }

  return (
    <button className={cn(classes, className)} type="button" onClick={onClick} {...props}>
      {children}
    </button>
  );
}


export type { ButtonProps }
export { Button, buttonVariants }
export default Button;