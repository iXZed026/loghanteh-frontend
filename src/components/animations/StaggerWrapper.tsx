"use client"
import { Children } from "@/types/children"
import { motion, Variants } from "framer-motion"

interface StaggerWrapper {
    children: Children
    variants: Variants
    className?: string
    once?: boolean
    amount?: number
}

function StaggerWrapper({
    children,
    variants,
    className,
    once = false,
    amount = 0.2,
}: StaggerWrapper) {
    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: once,
                amount: amount,
            }}
        >
            {children}
        </motion.div>
    )
}

export default StaggerWrapper