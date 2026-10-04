"use client"

import { slowTransitionOut } from "@/lib/animations/transitions"

import { Children } from "@/types/children"

import { motion, Variants } from "framer-motion"

import { Transition } from "framer-motion";

interface IFadeUp {

    children: Children;

    transition?: Transition;

    y?: number;

    amount?: number;

    once?: boolean;

    variants?: Variants;

    className?: string;

    onClick?: () => void;

}

function FadeUp({

    children,

    transition = slowTransitionOut,

    y = 50,

    amount = 0,

    once = false,

    variants,

    className,

    onClick,

}: IFadeUp) {

    return (

        <motion.div

            variants={variants}

            initial={{
                opacity: 0,
                y: y,
            }}

            whileInView={{
                opacity: 1,
                y: 0,
            }}

            transition={transition}

            viewport={{
                amount: amount,
                once: once,
            }}

            className={className}

            onClick={onClick}

        >

            {children}

        </motion.div>

    )

}

export default FadeUp