import { fetcher } from "@/lib/api/fetcher"

export type CinemaAndTheaterType =
    | "cinema"
    | "theater"

export interface EventImage {
    imageUrl: string
    displayOrder: number
}

export interface CinemaDetails {
    eventId: number
    releaseYear: number | null
    director: string
    country: string
    filmDuration: number
    genre: string
    imdbScore: number | null
}

export interface TheaterDetails {
    eventId: number
    director: string
    writer: string
    duration: number
}

export interface CinemaAndTheaterSession {
    sessionId: number
    eventId: number
    hallId: number
    name: string
    description: string
    images: EventImage[]
    startAt: string
    duration: number
    price: number | null
    cinemaDetails?: CinemaDetails | null
    theaterDetails?: TheaterDetails | null
}

export interface CinemaAndTheaterResponse {
    data: CinemaAndTheaterSession[]
    message: string
    success: boolean
}

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL

export async function getCinemaAndTheaterTickets(
    type: CinemaAndTheaterType,
    date: string,
    locale: string,
): Promise<CinemaAndTheaterResponse> {

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
            "Failed to fetch cinema and theater tickets"
        )
    }

    return response.json()
}


// Details ([id])

export interface CinemaAndTheaterSessionDetail {
    sessionId: number
    eventId: number
    hallId: number
    name: string
    description: string
    images: EventImage[]
    startAt: string
    duration: number
    price: number | null
    cinemaDetails?: CinemaDetails | null
    theaterDetails?: TheaterDetails | null
}

export interface CinemaAndTheaterSessionDetailResponse {
    data: CinemaAndTheaterSessionDetail
    message: string
    success: boolean
}

export async function getCinemaAndTheaterSessionDetail(
    type: CinemaAndTheaterType,
    sessionId: string,
    locale: string,
): Promise<CinemaAndTheaterSessionDetailResponse> {

    const endpoint =
        type === "cinema"
            ? `/tickets/cinema/sessions/${encodeURIComponent(sessionId)}`
            : `/tickets/theater/sessions/${encodeURIComponent(sessionId)}`

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
            "Failed to fetch cinema and theater session details"
        )
    }

    return response.json()
}