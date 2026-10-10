import { fetcher } from "../fetcher"

export interface ICreateBookingData {
  sessionId: number
  quantity: number
  discountCodeId?: number
}

export interface CreateBookingResponseData {
  bookingId: number
  sessionId: number
  quantity: number
  totalPrice: string
  purchasedAt: string
}

export interface CreateBookingResponse {
  data: CreateBookingResponseData
  message: string
  success: boolean
}

export async function createBooking(
  data: ICreateBookingData,
  locale: string,
): Promise<CreateBookingResponse> {
  return fetcher<CreateBookingResponse>(
    "/tickets/bookings",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    locale,
  )
}

export interface UserBookingResponse {
  bookingId: number
  eventTypeId: number
  eventTypeName: string
  eventId: number
  sessionId: number
  name: string
  description: string
  startAt: string
  duration: number
  quantity: number
  totalPrice: string
  purchasedAt: string
}

export interface UserBookingsResponse {
  data: UserBookingResponse[]
  message: string
  success: boolean
}

export async function getUserBookings(
  locale: string,
): Promise<UserBookingsResponse> {
  return fetcher<UserBookingsResponse>(
    "/tickets/bookings",
    {
      method: "GET",
    },
    locale,
  )
}

// Get Booking Count

export interface BookingCountResponse {
  data: number
  message: string
  success: boolean
}

export async function getBookingCount(
  bookingId: number,
  locale: string,
): Promise<BookingCountResponse> {
  return fetcher<BookingCountResponse>(
    `/tickets/bookings/${bookingId}/count`,
    {
      method: "GET",
    },
    locale,
  )
}

// Get Booking By Booking ID

export interface ReservedSessionSeat {
  seatId: number
  rowLabel: string
  seatNumber: number
  status: "reserved" | "available"
}

export interface CinemaDetails {
  releaseYear?: number
  director?: string
  country?: string
  filmDuration?: number
  genre?: string
  imdbScore?: number
}

export interface TheaterDetails {
  director?: string
  writer?: string
  duration?: number
}

export interface UserReservedSession {
  bookingId: number
  sessionId: number
  eventId: number
  eventTypeId: number
  hallId: number
  quantity: number
  totalPrice: number
  purchasedAt: string
  discountCodeId: number | null
  discountAmount: number
  ticketToken: string
  ticketIsValid: boolean
  name: string
  description: string
  eventTypeName: string
  hallName: string
  startAt: string
  duration: number
  price: number
  seats: ReservedSessionSeat[]
  cinemaDetails: CinemaDetails | null
  theaterDetails: TheaterDetails | null
}

export interface GetUserReservedSessionResponse {
  data: UserReservedSession
  message: string
  success: boolean
}

export async function getUserReservedSession(
  bookingId: number,
  locale: string,
): Promise<GetUserReservedSessionResponse> {
  return fetcher<GetUserReservedSessionResponse>(
    `/tickets/bookings/${bookingId}`,
    {
      method: "GET",
    },
    locale,
  )
}

// Get Next Booking

export interface NextBookingResponseData {
  name: string
  ticketToken: string
  startAt: string
  bookingId:number | string
}

export interface NextBookingResponse {
  data: NextBookingResponseData | null
  message: string
  success: boolean
}

export async function getNextBooking(
  locale: string,
): Promise<NextBookingResponse> {
  return fetcher<NextBookingResponse>(
    "/tickets/bookings/next",
    {
      method: "GET",
    },
    locale,
  )
}
