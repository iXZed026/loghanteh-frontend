"use client"

import FadeUp from "@/components/animations/FadeUp"
import Loading from "@/components/ui/Loading"
import TicketBox from "@/features/loghante(root)/profile/componenets/ticket-purchased/TicketBox"
import {
    getUserBookings,
    UserBookingResponse,
} from "@/lib/api/ticket/booking"

import {
    useLocale,
    useTranslations,
} from "next-intl"

import {
    useEffect,
    useState,
} from "react"

function TicketPurchased() {

    const locale =
        useLocale()

    const ticketPurchasedT =
        useTranslations(
            "profileTicketPurchased",
        )

    const [
        bookings,
        setBookings,
    ] = useState<UserBookingResponse[]>([])

    const [
        isLoading,
        setIsLoading,
    ] = useState(true)

    const [
        error,
        setError,
    ] = useState<string | null>(null)

    useEffect(() => {

        async function fetchBookings() {

            try {

                setIsLoading(true)
                setError(null)

                const response =
                    await getUserBookings(
                        locale,
                    )

                console.log(
                    "[TicketPurchased] bookings:",
                    response.data,
                )

                setBookings(
                    response.data ?? [],
                )

            } catch (error) {

                console.error(
                    "Failed to fetch user bookings:",
                    error,
                )

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch tickets.",
                )

            } finally {

                setIsLoading(false)

            }
        }

        fetchBookings()

    }, [locale])

    if (isLoading) {

        return (
            <Loading
                className="w-full h-screen"
                size={60}
            />
        )
    }

    if (error) {

        return (
            <div className="text-center text-red-600">
                {error}
            </div>
        )
    }

    return (
        <FadeUp
            amount={0}
        >

            <div>

                <div className="mb-18">

                    <h2
                        className="
                            font-medium
                            md:text-4xl
                            text-2xl
                        "
                    >
                        {ticketPurchasedT("title")}
                    </h2>

                </div>

                <div
                    className="
                        fcol
                        gap-5
                        xl:px-20
                    "
                >

                    {bookings.length > 0 ? (

                        bookings.map(
                            (ticket) => (

                                <TicketBox

                                    sessionId={
                                        ticket.sessionId
                                    }
                                    key={
                                        ticket.bookingId
                                    }
                                    bookingId={
                                        ticket.bookingId
                                    }
                                    eventTypeName={
                                        ticket.eventTypeName
                                    }
                                    name={
                                        ticket.name
                                    }
                                    startAt={
                                        ticket.startAt
                                    }
                                    duration={
                                        ticket.duration
                                    }
                                    quantity={
                                        ticket.quantity
                                    }
                                />

                            ),
                        )

                    ) : (

                        <p className="text-center">
                            You don't have any tickets
                            at the moment.
                        </p>

                    )}

                </div>

            </div>

        </FadeUp>
    )
}

export default TicketPurchased