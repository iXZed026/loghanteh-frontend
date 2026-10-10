"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"

import AppLink from "@/components/ui/AppLink"
import Button from "@/components/ui/Button"
import Skeleton from "@/components/ui/Skeleton"
import ArrowIcon from "@/components/shared/ArrowIcon"

import { cn } from "@/lib/utils/cn"
import type { TranslationFunction } from "@/types/translations"
import {
    getNextBooking,
    type NextBookingResponseData,
} from "@/lib/api/ticket/booking"

import { CiLocationOn } from "react-icons/ci"
import { FaRegCalendarAlt } from "react-icons/fa"
import { IoTimeOutline } from "react-icons/io5"
import { LuTicket, LuTicketCheck } from "react-icons/lu"

interface IProfileNextVisitBox {
    dashboardPageT: TranslationFunction
}

function ProfileNextVisitBox({
    dashboardPageT,
}: IProfileNextVisitBox) {
    const locale = useLocale()

    const [booking, setBooking] =
        useState<NextBookingResponseData | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        async function fetchNextBooking() {
            try {
                setIsLoading(true)

                const response = await getNextBooking(locale)

                if (!isMounted) return

                setBooking(
                    response.success && response.data?.ticketToken
                        ? response.data
                        : null,
                )
            } catch (error) {
                if (isMounted) {
                    setBooking(null)
                }

                console.error("Failed to fetch next booking:", error)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchNextBooking()

        return () => {
            isMounted = false
        }
    }, [locale])

    const date = booking?.startAt
        ? new Date(booking.startAt)
        : null

    const isValidDate =
        date !== null && !Number.isNaN(date.getTime())

    const dateLocale =
        locale === "fa"
            ? "fa-IR-u-ca-persian"
            : locale

    const day = isValidDate
        ? new Intl.DateTimeFormat(dateLocale, {
            day: "numeric",
        }).format(date!)
        : ""

    const monthYear = isValidDate
        ? new Intl.DateTimeFormat(dateLocale, {
            month: "long",
            year: "numeric",
        }).format(date!)
        : ""

    const formattedTime = isValidDate
        ? new Intl.DateTimeFormat(dateLocale, {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
        }).format(date!)
        : ""

    const reservationCode = booking?.ticketToken
        ? booking.ticketToken.slice(0, 8).toUpperCase()
        : "—"

    return (
        <section
            aria-label={dashboardPageT(
                "upcoming-ticket.ticket-details.reservation-code",
            )}
            className={cn(
                "relative isolate overflow-hidden rounded-2xl",
                "border border-[var(--crimson-opacity-color)]",
                "bg-white shadow-sm",
            )}
        >
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute -right-16 -top-20 -z-10",
                    "size-56 rounded-full",
                    "bg-[var(--crimson-opacity-color)] opacity-40 blur-3xl",
                )}
            />

            <div className="flex flex-col md:flex-row">
                {/* Main booking information */}
                <div className="min-w-0 flex-1 p-5 sm:p-7">
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--crimson-opacity-color)]">
                                <LuTicket className="size-6 text-[var(--crimson-color)]" />
                            </div>

                            <div className="fcol gap-1">
                                <span className="text-xs text-[var(--black-light-color)]">
                                    {dashboardPageT(
                                        "upcoming-ticket.ticket-details.reservation-code",
                                    )}
                                </span>

                                <span className="text-sm font-semibold text-[var(--crimson-color)]">
                                    {isLoading ? "..." : reservationCode}
                                </span>
                            </div>
                        </div>

                        {!isLoading && booking && (
                            <span
                                className={cn(
                                    "inline-flex shrink-0 items-center gap-1.5",
                                    "rounded-full border border-emerald-700/15",
                                    "bg-emerald-50 px-3 py-1.5",
                                    "text-xs font-medium text-emerald-800",
                                )}
                            >
                                <LuTicketCheck className="size-4" />

                                {dashboardPageT(
                                    "upcoming-ticket.ticket-details.reserved-status",
                                )}
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="fcol gap-4">
                            <Skeleton
                                backgroundClassName="bg-[var(--crimson-opacity-color)]"
                                className="h-7 w-3/4 max-w-64 rounded-md"
                            />

                            <Skeleton
                                backgroundClassName="bg-[var(--crimson-opacity-color)]"
                                className="h-4 w-40 rounded-md"
                            />

                            <Skeleton
                                backgroundClassName="bg-[var(--crimson-opacity-color)]"
                                className="h-4 w-32 rounded-md"
                            />
                        </div>
                    ) : booking ? (
                        <div className="fcol gap-5">
                            <div className="fcol gap-2">
                                <h3 className="break-words text-xl font-bold leading-relaxed text-[var(--black-color)] sm:text-2xl">
                                    {booking.name}
                                </h3>

                                <p className="text-sm leading-6 text-[var(--black-light-color)]">
                                    {dashboardPageT(
                                        "upcoming-ticket.ticket-details.visit-details",
                                    )}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--black-light-color)]">
                                <div className="flex items-center gap-2">
                                    <CiLocationOn className="size-5 shrink-0 text-[var(--gold-color)]" />

                                    <span>
                                        {dashboardPageT(
                                            "upcoming-ticket.date-and-views.location",
                                        )}
                                    </span>
                                </div>

                                {isValidDate && (
                                    <div className="flex items-center gap-2">
                                        <IoTimeOutline className="size-5 shrink-0 text-[var(--gold-color)]" />

                                        <time dateTime={booking.startAt}>
                                            {formattedTime}
                                        </time>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="fcol items-start gap-3 py-2">
                            <h3 className="text-lg font-bold text-[var(--black-color)]">
                                {dashboardPageT(
                                    "upcoming-ticket.date-and-views.no-upcoming-visits",
                                )}
                            </h3>

                            <p className="text-sm leading-6 text-[var(--black-light-color)]">
                                {dashboardPageT(
                                    "upcoming-ticket.date-and-views.no-upcoming-visits-description",
                                )}
                            </p>
                        </div>
                    )}
                </div>

                {/* Date and ticket action */}
                <div
                    className={cn(
                        "relative flex shrink-0 flex-col items-center justify-center",
                        "border-t border-dashed border-[var(--crimson-opacity-color)]",
                        "bg-[var(--crimson-opacity-color)]/20",
                        "p-5 sm:p-7",
                        "md:w-48 md:border-l md:border-t-0",
                    )}
                >
                    {/* Ticket perforation decoration */}
                    <div
                        aria-hidden="true"
                        className={cn(
                            "absolute -top-2.5 left-1/2 size-5 -translate-x-1/2",
                            "rounded-full border border-[var(--crimson-opacity-color)]",
                            "bg-white",
                            "md:-left-2.5 md:top-1/2 md:translate-x-0 md:-translate-y-1/2",
                        )}
                    />

                    {isLoading ? (
                        <div className="fcol w-full items-center gap-3">
                            <Skeleton
                                backgroundClassName="bg-[var(--crimson-opacity-color)]"
                                className="h-14 w-16 rounded-lg"
                            />

                            <Skeleton
                                backgroundClassName="bg-[var(--crimson-opacity-color)]"
                                className="h-5 w-24 rounded-md"
                            />

                            <Skeleton
                                backgroundClassName="bg-[var(--crimson-opacity-color)]"
                                className="mt-3 h-10 w-full rounded-lg"
                            />
                        </div>
                    ) : booking && isValidDate ? (
                        <>
                            <div className="mb-4 flex flex-row items-center gap-4 md:flex-col md:gap-1">
                                <FaRegCalendarAlt className="size-5 text-[var(--gold-color)] md:mb-2 md:size-6" />

                                <div className="flex items-baseline gap-2 md:flex-col md:items-center md:gap-0">
                                    <span className="text-4xl font-bold tracking-tight text-[var(--crimson-color)] sm:text-5xl">
                                        {day}
                                    </span>

                                    <span className="text-sm font-medium text-[var(--black-light-color)] md:mt-1 md:text-center">
                                        {monthYear}
                                    </span>
                                </div>
                            </div>

                            <AppLink
                                href={`/profile/ticket-purchased/${booking.bookingId}`}
                                className="w-full"
                            >
                                <Button
                                    className={cn(
                                        "fcc w-full gap-2 rounded-xl",
                                        "border border-[var(--crimson-color)]",
                                        "bg-[var(--crimson-color)] px-3 py-3",
                                        "text-sm font-medium text-white",
                                        "transition-opacity hover:opacity-90",
                                        "click-scale",
                                    )}
                                >
                                    <span>
                                        {dashboardPageT(
                                            "upcoming-ticket.date-and-views.view-ticket-button",
                                        )}
                                    </span>

                                    <ArrowIcon />
                                </Button>
                            </AppLink>
                        </>
                    ) : (
                        <div className="fcol items-center gap-3 py-3 text-center">
                            <FaRegCalendarAlt className="size-8 text-[var(--gold-color)]" />

                            <span className="text-sm text-[var(--black-light-color)]">
                                {dashboardPageT(
                                    "upcoming-ticket.date-and-views.no-upcoming-booking",
                                )}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProfileNextVisitBox
