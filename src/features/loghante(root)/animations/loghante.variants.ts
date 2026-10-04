import { once } from "events";
import { Variants } from "framer-motion";

export const MuseumsCardContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        }
    },
}

export const MuseumCardVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },

}
////

export const cafesAndFoodsContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        }
    },
}

export const cafesAndFoodsVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },

}

////
export const dayOfTheWeeksContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        }
    },
}

export const dayOfTheWeeksVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 4,
    },

}

/////
export const cafeMenusContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        }
    },
}

export const cafeMenusVariant: Variants = {
    hidden: {
        opacity: 0,
        y: -40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },

}

////
export const conferenceHallContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        }
    },
}

export const conferenceHallVariant: Variants = {
    hidden: {
        opacity: 0,
        y: -40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },

}

////
export const eventsAndCoursesContainerVariant: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        }
    },
}

export const eventsAndCoursesVariant: Variants = {
    hidden: {
        opacity: 0,
        y: -40,
    },
    visible: {
        opacity: 1,
        y: 0,
    },

}

