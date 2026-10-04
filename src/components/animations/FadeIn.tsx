"use client";
import { slowTransitionOut } from "@/lib/animations/transitions";
import { Children } from "@/types/children";
import { motion, Transition, Variants } from "framer-motion";

interface IFadeIn {
  children: Children;
  transition?: Transition;
  variants?: Variants;
  className?: string
  once?: boolean
}

function FadeIn({
  children,
  transition = slowTransitionOut,
  className,
  variants,
  once = false,
}: IFadeIn) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        amount: 0.2,
        once,
      }}
      transition={transition}
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;