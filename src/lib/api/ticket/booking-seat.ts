import { fetcher } from "@/lib/api/fetcher"

export interface BookingSeat {
    seatId: number
    rowLabel: string
    seatNumber: number
    status: "reserved" | "available"
}

interface BookingSeatResponse {
    data: BookingSeat[]
    message: string
    success: boolean
}

export interface CreateSeatBookingPayload {
    sessionId: number
    seatIds: number[]
    discountCodeId?: number
}

export interface CreateSeatBookingResponse {
    data?: unknown
    message: string
    success: boolean
}

export async function getBookingSeats(
    sessionId: number,
): Promise<BookingSeat[]> {
    const response =
        await fetcher<BookingSeatResponse>(
            `/tickets/booking-seat/${sessionId}`,
        )

    return response.data
}

export async function createSeatBooking(
    data: CreateSeatBookingPayload,
    locale: string,
): Promise<CreateSeatBookingResponse> {
    return fetcher<CreateSeatBookingResponse>(
        "/tickets/booking-seat",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    )
}