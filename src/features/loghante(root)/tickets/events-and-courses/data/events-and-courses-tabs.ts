interface IEventsAndCoursesTab {
    id: number
    type: "events" | "courses"
    name: {
        en: string
        fa: string
    }
}

export const EventsAndCoursesTabs: IEventsAndCoursesTab[] = [
    {
        id: 1,
        type: "events",
        name: {
            en: "Events",
            fa: "رویداد ها",
        },
    },
    {
        id: 2,
        type: "courses",
        name: {
            en: "Courses",
            fa: "دوره ها",
        },
    },
]