
"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ChevronDown } from "lucide-react"

import FadeUp from "@/components/animations/FadeUp"
import Loading from "@/components/ui/Loading"
import Button from "@/components/ui/Button"
import TicketBox from "@/features/loghante(root)/profile/componenets/ticket-purchased/TicketBox"
import {
    getUserBookings,
    type UserBookingResponse,
} from "@/lib/api/ticket/booking"

const INITIAL_BOOKINGS_COUNT = 3
const BOOKINGS_PER_LOAD = 3

function TicketPurchased() {
    const locale = useLocale()

    const ticketPurchasedT = useTranslations(
        "profileTicketPurchased",
    )

    const [bookings, setBookings] = useState<UserBookingResponse[]>([])
    const [visibleCount, setVisibleCount] = useState(INITIAL_BOOKINGS_COUNT)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function fetchBookings() {
            try {
                setIsLoading(true)
                setError(null)
                setVisibleCount(INITIAL_BOOKINGS_COUNT)

                const response = await getUserBookings(locale)

                if (!isMounted) return

                setBookings(response.data ?? [])
            } catch (error) {
                if (!isMounted) return

                console.error("Failed to fetch user bookings:", error)

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch tickets.",
                )
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchBookings()

        return () => {
            isMounted = false
        }
    }, [locale])

    function handleShowMore() {
        setVisibleCount((currentCount) =>
            Math.min(
                currentCount + BOOKINGS_PER_LOAD,
                bookings.length,
            ),
        )
    }

    const visibleBookings = bookings.slice(0, visibleCount)
    const hasMoreBookings = visibleCount < bookings.length

    if (isLoading) {
        return (
            <Loading
                className="h-screen w-full"
                size={60}
            />
        )
    }

    if (error) {
        return (
            <div
                className="text-center text-red-600"
                role="alert"
            >
                {error}
            </div>
        )
    }

    return (
        <FadeUp amount={0}>
            <section>
                <div className="mb-10 md:mb-18">
                    <h2 className="text-2xl font-medium md:text-4xl">
                        {ticketPurchasedT("title")}
                    </h2>
                </div>

                {bookings.length > 0 ? (
                    <>
                        <div className="fcol gap-5 xl:px-20">
                            {visibleBookings.map((ticket) => (
                                <TicketBox
                                    key={ticket.bookingId}
                                    sessionId={ticket.sessionId}
                                    bookingId={ticket.bookingId}
                                    eventTypeName={ticket.eventTypeName}
                                    name={ticket.name}
                                    startAt={ticket.startAt}
                                    duration={ticket.duration}
                                    quantity={ticket.quantity}
                                />
                            ))}
                        </div>

                        {hasMoreBookings && (
                            <div className="mt-8 flex justify-center xl:px-20">
                                <Button
                                    type="button"
                                    onClick={handleShowMore}
                                    className="
                                        group fcc min-h-12 gap-1
                                        rounded-xl border border-[var(--crimson-color)]
                                        bg-transparent px-3 py-1
                                        text-sm font-semibold text-crimson
                                        transition-colors duration-200
                                        hover:bg-[var(--crimson-color)] hover:text-[var(--white-color)]
                                        focus-visible:outline-2
                                        focus-visible:outline-offset-4
                                        focus-visible:outline-[var(--crimson-color)]
                                    "
                                    aria-label={ticketPurchasedT("show-more")}
                                >
                                    <span>
                                        {ticketPurchasedT("show-more")}
                                    </span>

                                    <ChevronDown
                                        size={15}
                                        aria-hidden="true"
                                        className="transition-transform duration-200 group-hover:translate-y-0.5"
                                    />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="py-10 text-center text-black-light-utility">
                        {ticketPurchasedT("empty")}
                    </p>
                )}
            </section>
        </FadeUp>
    )
}

export default TicketPurchased
