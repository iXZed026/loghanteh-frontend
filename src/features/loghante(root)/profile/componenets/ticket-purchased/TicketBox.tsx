import { AppLinks } from "next/dist/lib/metadata/types/extra-types"
import TicketStatus from "../ui/TicketStatus"

import { cn } from "@/lib/utils/cn"

import {
    FaRegCalendarAlt,
} from "react-icons/fa"

import {
    FaRegClock,
} from "react-icons/fa6"

import {
    IoTicketOutline,
} from "react-icons/io5"

import {
    useLocale,
    useTranslations,
} from "next-intl"

import {
    formatMonthDay,
    formatTime,
} from "@/lib/utils/date"
import AppLink from "@/components/ui/AppLink"

interface ITicketBox {
    sessionId: number | string
    bookingId: number
    eventTypeName: string
    name: string
    startAt: string
    duration: number
    quantity: number
}

function TicketBox({
    sessionId,
    bookingId,
    eventTypeName,
    name,
    startAt,
    duration,
    quantity,
}: ITicketBox) {

    const locale =
        useLocale()

    const ticketBoxT =
        useTranslations(
            "profileTicketPurchased.ticket-box",
        )

    const common =
        useTranslations("common")

    function getTicketStatus(
        startAt: string,
        duration: number,
    ): "upcoming" | "progress" | "past" {

        const now =
            new Date()

        const start =
            new Date(startAt)

        const end =
            new Date(
                start.getTime() +
                duration * 60 * 1000,
            )

        if (now < start) {
            return "upcoming"
        }

        if (
            now >= start &&
            now < end
        ) {
            return "progress"
        }

        return "past"
    }

    const status =
        getTicketStatus(
            startAt,
            duration,
        )

    const startDate =
        new Date(startAt)

    const date =
        formatMonthDay(
            startDate,
            locale,
        )

    const time =
        formatTime(
            startDate,
            locale,
        )

    return (
        <div
            className={cn(
                "relative",
                "w-full",
                "min-h-70",
                "grid grid-cols-12",
                "overflow-hidden",
                "rounded-2xl",
                "border border-black-opacity",
                "bg-white",
                "shadow-lg",
                "transition-all duration-300",
                "hover:-translate-y-1",
                "hover:shadow-xl",
            )}
        >

            {/* Left Crimson Section */}

            <div
                className={cn(
                    "relative",
                    "lg:col-span-4 md:col-span-5 col-span-12",
                    "min-h-55 md:min-h-full",
                    "p-7 md:p-8",
                    "flex flex-col justify-between",
                    "bg-crimson",
                    "text-white",
                    "overflow-hidden",
                )}
            >

                <div
                    className={cn(
                        "absolute",
                        "-top-15",
                        "-right-15",
                        "size-35",
                        "rounded-full",
                        "border-20",
                        "border-white/10",
                    )}
                />

                <div
                    className={cn(
                        "absolute",
                        "-bottom-20",
                        "-left-15",
                        "size-40",
                        "rounded-full",
                        "border-25",
                        "border-white/5",
                    )}
                />

                <div className="relative z-10">

                    <div
                        className={cn(
                            "fcc",
                            "size-12",
                            "rounded-xl",
                            "bg-white/10",
                            "border border-white/15",
                        )}
                    >
                        <IoTicketOutline className="size-6" />
                    </div>

                </div>

                <div className="relative z-10 mt-8">

                    <span
                        className={cn(
                            "block",
                            "mb-2",
                            "text-xs",
                            "uppercase",
                            "tracking-[0.2em]",
                            "text-white/60",
                        )}
                    >
                        {eventTypeName}
                    </span>

                    <h3
                        className={cn(
                            "font-semibold",
                            "text-xl md:text-2xl",
                            "leading-8",
                            "line-clamp-2",
                        )}
                    >
                        {name}
                    </h3>

                </div>

            </div>

            {/* Right Content */}

            <div
                className={cn(
                    "lg:col-span-8 md:col-span-7 col-span-12",
                    "p-6 md:p-8",
                    "flex flex-col justify-between",
                )}
            >

                {/* Header */}

                <div className="fbc gap-5">

                    <div>

                        <span
                            className={cn(
                                "block",
                                "text-xs",
                                "text-black-light-utility",
                                "mb-2",
                            )}
                        >
                            {ticketBoxT("status")}
                        </span>

                        <TicketStatus
                            status={status}
                        />

                    </div>

                    <div
                        className={cn(
                            "fcc",
                            "gap-2",
                            "shrink-0",
                            "rounded-lg",
                            "px-3 py-2",
                            "bg-[var(--crimson-opacity-color)]",
                            "text-crimson",
                        )}
                    >
                        <IoTicketOutline className="size-4" />

                        <span className="text-sm font-semibold">
                            {quantity}
                        </span>

                    </div>

                </div>

                {/* Date & Time */}

                <div
                    className={cn(
                        "grid",
                        "grid-cols-1 sm:grid-cols-2",
                        "gap-4",
                        "my-8",
                    )}
                >

                    <div
                        className={cn(
                            "flex items-center gap-4",
                            "rounded-xl",
                            "border border-black-opacity",
                            "p-4",
                        )}
                    >

                        <div
                            className={cn(
                                "fcc",
                                "size-10",
                                "shrink-0",
                                "rounded-lg",
                                "bg-[var(--crimson-opacity-color)]",
                                "text-crimson",
                            )}
                        >
                            <FaRegCalendarAlt />
                        </div>

                        <div>

                            <span
                                className={cn(
                                    "block",
                                    "text-xs",
                                    "text-black-light-utility",
                                    "mb-1",
                                )}
                            >
                                {ticketBoxT("date")}
                            </span>

                            <span className="text-sm font-semibold">
                                {date}
                            </span>

                        </div>

                    </div>

                    <div
                        className={cn(
                            "flex items-center gap-4",
                            "rounded-xl",
                            "border border-black-opacity",
                            "p-4",
                        )}
                    >

                        <div
                            className={cn(
                                "fcc",
                                "size-10",
                                "shrink-0",
                                "rounded-lg",
                                "bg-[var(--crimson-opacity-color)]",
                                "text-crimson",
                            )}
                        >
                            <FaRegClock />
                        </div>

                        <div>

                            <span
                                className={cn(
                                    "block",
                                    "text-xs",
                                    "text-black-light-utility",
                                    "mb-1",
                                )}
                            >
                                {ticketBoxT("time")}
                            </span>

                            <span className="text-sm font-semibold">
                                {time}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div
                    className={cn(
                        "flex",
                        "items-center",
                        "justify-between",
                        "gap-5",
                        "pt-5",
                        "border-t border-black-opacity",
                    )}
                >

                    <div>

                        <span
                            className={cn(
                                "block",
                                "text-xs",
                                "text-black-light-utility",
                                "mb-1",
                            )}
                        >
                            {ticketBoxT("duration")}
                        </span>

                        <span className="font-semibold">
                            {duration} {common("minutes")}
                        </span>

                    </div>

                    <div className="text-right">

                        <span
                            className={cn(
                                "block",
                                "text-xs",
                                "text-black-light-utility",
                                "mb-1",
                            )}
                        >
                            {ticketBoxT("Tickets")}
                        </span>

                        <span
                            className={cn(
                                "text-lg",
                                "font-bold",
                                "text-crimson",
                            )}
                        >
                            × {quantity}
                        </span>

                    </div>

                    <AppLink
                        href={`/profile/ticket-purchased/${bookingId}`}
                        className={cn(
                            "text-sm",
                            "font-semibold",
                            "text-crimson",
                            "underline",
                            "underline-offset-4",
                            "hover:opacity-70",
                            "transition-opacity",
                        )}
                    >
                        View Details
                    </AppLink>

                </div>

            </div>

        </div>
    )
}

export default TicketBox