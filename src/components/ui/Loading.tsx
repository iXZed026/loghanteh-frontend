"use client";

import { motion } from "framer-motion";
import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color?: string;
}

function Loading({
    size = 48,
    color = "var(--crimson-color)",
    className,
    ...props
}: LoadingProps) {
    const barWidth = Math.max(2, size * 0.065);
    const barHeight = size * 0.7;
    const gap = Math.max(2, size * 0.07);

    const loaderWidth = barWidth * 7 + gap * 6;

    const colors = {
        "--loading-color": color,
    } as CSSProperties;

    const bars = [
        { scale: 0.45, opacity: 0.35 },
        { scale: 0.7, opacity: 0.55 },
        { scale: 0.9, opacity: 0.8 },
        { scale: 1, opacity: 1 },
        { scale: 0.9, opacity: 0.8 },
        { scale: 0.7, opacity: 0.55 },
        { scale: 0.45, opacity: 0.35 },
    ];

    return (
        <div
            role="status"
            aria-label="Loading"
            className={cn("fcc shrink-0", className)}
            {...props}
        >
            <div
                className="fcc relative shrink-0"
                style={{
                    width: loaderWidth,
                    height: size,
                    gap,
                    ...colors,
                }}
            >
                {bars.map((bar, index) => (
                    <motion.span
                        key={index}
                        className="block shrink-0 origin-center rounded-full bg-[var(--loading-color)]"
                        style={{
                            width: barWidth,
                            height: barHeight,
                        }}
                        animate={{
                            scaleY: [
                                bar.scale,
                                1,
                                bar.scale,
                            ],
                            opacity: [
                                bar.opacity,
                                1,
                                bar.opacity,
                            ],
                        }}
                        transition={{
                            duration: 0.9,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: index * 0.08,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Loading;
