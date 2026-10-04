import { Variants } from "framer-motion";
import { defaultTransitionOut, fastTransitionIn } from "./transitions";

export const dropdownVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -10
    },
    visible: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -10
    }
}

export const openSlideMenu: Variants = {
    hidden: {
        x: -500,
    },

    visible: {
        x: 0,
        transition: defaultTransitionOut,
    },

    exit: {
        x: -500,
        transition: fastTransitionIn,
    },
};

export const openSlideMenuFa: Variants = {
    hidden: {
        x: 500,
    },

    visible: {
        x: 0,
        transition: defaultTransitionOut,
    },

    exit: {
        x: 500,
        transition: fastTransitionIn,
    },
};