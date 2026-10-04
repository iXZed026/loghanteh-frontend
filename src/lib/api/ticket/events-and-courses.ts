import { fetcher } from "@/lib/api/fetcher"

export type EventAndCourseType =
    | "events"
    | "courses"

export interface EventImage {
    imageUrl: string
    displayOrder: number
}

export interface EventSession {
    sessionId: number
    eventId: number
    name: string
    images: EventImage[]
    startAt: string
    price: number
}

export interface EventAndCourseResponse {
    data: EventSession[]
    message: string
    success: boolean
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getEventsAndCourses(
    type: EventAndCourseType,
    date: string,
    locale: string,
): Promise<EventAndCourseResponse> {

    const response = await fetch(
        `${BASE_URL}/tickets/${type}?date=${encodeURIComponent(date)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
            },
        }
    )

    if (!response.ok) {
        throw new Error(
            "Failed to fetch events and courses"
        )
    }

    return response.json()
}


//Details ([id])
export interface EventAndCourseSessionDetail {
    sessionId: number
    eventId: number
    hallId: number
    name: string
    description: string
    images: EventImage[]
    startAt: string
    duration: number
    price: number
}

export interface EventAndCourseSessionDetailResponse {
    data: EventAndCourseSessionDetail
    message: string
    success: boolean
}

export async function getEventAndCourseSessionDetail(
    type: EventAndCourseType,
    sessionId: string,
    locale: string,
): Promise<EventAndCourseSessionDetailResponse> {

    const endpoint =
        type === "courses"
            ? `/tickets/courses/sessions/${encodeURIComponent(sessionId)}`
            : `/tickets/events/sessions/${encodeURIComponent(sessionId)}`

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
            },
        }
    )

    if (!response.ok) {
        throw new Error(
            "Failed to fetch session details"
        )
    }

    return response.json()
}