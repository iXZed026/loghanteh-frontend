"use client"

import FadeIn from "@/components/animations/FadeIn"
import Button from "@/components/ui/Button"
import { slowTransitionOut } from "@/lib/animations/transitions"
import { cn } from "@/lib/utils/cn"
import {
    EventAndCourseSessionDetail,
} from "@/lib/api/ticket/events-and-courses"
import {
    useLocale,
    useTranslations,
} from "next-intl"
import { useState } from "react"

import {
    FaLocationDot,
    FaRegClock,
} from "react-icons/fa6"

import {
    MdOutlineDateRange,
    MdOutlinePriceChange,
} from "react-icons/md"

import { useRouter } from "next/navigation"

import { useHall } from "@/features/loghante(root)/halls/context/HallProvider"

import { useTicketPayment } from "@/features/loghante(root)/context/TicketPaymentContext" 

interface EventsAndCoursesHeaderFormProps {
    event: EventAndCourseSessionDetail
}

function EventsAndCoursesHeaderForm({
    event,
}: EventsAndCoursesHeaderFormProps) {

    const locale = useLocale()
    const router = useRouter()

    const { setHallData } = useHall()

    const { setPaymentData } =
        useTicketPayment()

    const commonT =
        useTranslations("common")

    const eventsAndCoursesHeaderT =
        useTranslations(
            "eventsAndCoursesDetails.header",
        )

    const [count, setCount] =
        useState<number>(0)

    function increaseCount(): void {
        setCount((prev) =>
            Math.min(prev + 1, 20),
        )
    }

    function decreaseCount(): void {
        setCount((prev) =>
            Math.max(prev - 1, 0),
        )
    }

    function submitForm(
        e: React.FormEvent<HTMLFormElement>,
    ): void {
        e.preventDefault()

        const hasHall =
            typeof event.hallId === "number" &&
            event.hallId > 0

        if (!hasHall) {
            setPaymentData({
                type: "events-and-courses",

                ticket: {
                    sessionId: event.sessionId,
                    eventId: event.eventId,
                    name: event.name,
                    startAt: event.startAt,
                    durationM: event.duration,
                    price: event.price,
                },

                quantity: Math.max(count, 1),
            })

            router.push(`/${locale}/payment`)

            return
        }

        setHallData({
            eventData: {
                sessionId: event.sessionId,
                eventId: event.eventId,
                title: event.name,
                hallId: event.hallId,
                description: event.description,
                duration: event.duration,
                startAt: event.startAt,
                imageURL: "/images/loghanteh-cafe.jpg",
                price: event.price,
            },
        })

        router.push(
            `/${locale}/hall/${event.hallId}`,
        )
    }

    const startAt =
        new Date(event.startAt)

    const date =
        startAt.toLocaleDateString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            },
        )

    const hours =
        startAt.getHours()

    const minutes =
        startAt.getMinutes()

    const formattedHours =
        hours % 12 || 12

    const formattedMinutes =
        String(minutes).padStart(2, "0")

    const period =
        hours >= 12
            ? locale === "fa"
                ? "ب.ظ."
                : "PM"
            : locale === "fa"
                ? "ق.ظ."
                : "AM"

    const time =
        `${formattedHours}:${formattedMinutes} ${period}`

    return (
        <FadeIn
            once
            transition={slowTransitionOut}
            className={cn(
                "lg:col-span-5 col-span-12",
            )}
        >
            <form
                className={cn(
                    "fcol gap-y-9",
                    "rounded-xl",
                    "border border-black-opacity",
                    "py-9.5 px-7.5",
                )}
                onSubmit={submitForm}
            >

                {/* Name */}

                <div>
                    <span className="text-xl font-semibold">
                        {event.name}
                    </span>
                </div>

                {/* Details */}

                <div
                    className={cn(
                        "fcol gap-y-6",
                        "text-black-light-utility",
                        "text-sm",
                    )}
                >

                    {/* Location */}

                    <div className="flex items-center gap-2">
                        <span>
                            <FaLocationDot
                                className="size-4 text-crimson"
                            />
                        </span>

                        <span>
                            {eventsAndCoursesHeaderT(
                                "details.address",
                            )}
                        </span>
                    </div>

                    {/* Date */}

                    <div className="flex items-center gap-2">
                        <span>
                            <MdOutlineDateRange
                                className="size-4 text-crimson"
                            />
                        </span>

                        <span>
                            {date}
                        </span>
                    </div>

                    {/* Time */}

                    <div className="flex items-center gap-2">
                        <span>
                            <FaRegClock
                                className="size-4 text-crimson"
                            />
                        </span>

                        <span>
                            {time}
                        </span>
                    </div>

                    {/* Price */}

                    <div className="flex items-center gap-2">
                        <span>
                            <MdOutlinePriceChange
                                className="size-4 text-crimson"
                            />
                        </span>

                        <div className="fbc w-full">
                            <span>
                                {eventsAndCoursesHeaderT(
                                    "details.amount",
                                )}
                            </span>

                            <span className="text-xl font-bold text-crimson">
                                {event.price.toLocaleString(
                                    locale,
                                )}{" "}
                                {commonT(
                                    "price-type",
                                )}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Book */}

                <div className="w-full">
                    <Button
                        className={cn(
                            "w-full",
                            "py-3 px-3",
                            "bg-crimson",
                            "font-bold",
                        )}
                    >
                        {eventsAndCoursesHeaderT(
                            "details.book-button",
                        )}
                    </Button>
                </div>

            </form>
        </FadeIn>
    )
}

export default EventsAndCoursesHeaderForm