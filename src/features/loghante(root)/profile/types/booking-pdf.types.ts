
export interface BookingPDFSeat {
  seatId: number
  rowLabel: string
  seatNumber: number
  status: string
}

export interface BookingPDFData {
  bookingId: number
  name: string
  description?: string
  duration?: number
  eventId?: number
  eventTypeId?: number
  eventTypeName?: string
  hallId?: number
  hallName?: string
  price: number | string
  quantity: number
  seats?: BookingPDFSeat[]
  sessionId?: number
  startAt?: string
  totalPrice: number | string
}