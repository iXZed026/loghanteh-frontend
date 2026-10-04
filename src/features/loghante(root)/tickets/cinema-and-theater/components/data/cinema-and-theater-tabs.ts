export type CinemaAndTheaterType =
    | "cinema"
    | "theater"

export interface CinemaAndTheaterTabItem {
    id: number
    type: CinemaAndTheaterType
    name: {
        fa: string
        en: string
    }
}

export const CinemaAndTheaterTabs:
    CinemaAndTheaterTabItem[] = [

    {
        id: 1,
        type: "cinema",
        name: {
            fa: "سینما",
            en: "Cinema",
        },
    },

    {
        id: 2,
        type: "theater",
        name: {
            fa: "تئاتر",
            en: "Theater",
        },
    },

]