import { Transition } from "framer-motion";

// EASE OUT 
export const defaultTransitionOut: Transition = {
    duration: 0.3,
    ease: "easeOut",
};

export const fastTransitionOut: Transition = {
    duration: 0.2,
    ease: "easeOut",
};

export const slowTransitionOut: Transition = {
    duration: 0.5,
    ease: "easeOut",
};

export const verySlowTransitionOut: Transition = {
    duration: 1,
    ease: "easeOut",
};

// EASE IN 
export const defaultTransitionIn: Transition = {
    duration: 0.3,
    ease: "easeIn",
};

export const fastTransitionIn: Transition = {
    duration: 0.2,
    ease: "easeIn",
};

export const slowTransitionIn: Transition = {
    duration: 0.5,
    ease: "easeIn",
};