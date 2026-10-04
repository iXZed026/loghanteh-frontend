import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-xl bg-white/10",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]",
        "before:bg-gradient-to-r",
        "before:from-transparent before:via-white/[0.08] before:to-transparent",
        // "border border-[var(--white-light-color)]",
        className,
      )}
      {...props}
    />
  );
}

export default Skeleton;