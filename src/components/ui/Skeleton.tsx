import { cn } from "@/lib/utils/cn"
import type { HTMLAttributes } from "react"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundClassName?: string
}

function Skeleton({
  className,
  backgroundClassName = "bg-white/10",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-xl",
        backgroundClassName,
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]",
        "before:bg-gradient-to-r",
        "before:from-transparent before:via-white/[0.08] before:to-transparent",
        className,
      )}
      {...props}
    />
  )
}

export default Skeleton
