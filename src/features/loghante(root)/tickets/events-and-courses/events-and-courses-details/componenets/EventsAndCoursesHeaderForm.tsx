"use client"

import { useState, type FormEvent } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import FadeIn from "@/components/animations/FadeIn"
import Button from "@/components/ui/Button"

import { useHall } from "@/features/loghante(root)/halls/context/HallProvider"
import { useTicketPayment } from "@/features/loghante(root)/context/TicketPaymentContext"

import type {
    EventAndCourseSessionDetail,
} from "@/lib/api/ticket/events-and-courses"

import { slowTransitionOut } from "@/lib/animations/transitions"
import { cn } from "@/lib/utils/cn"

import {
    FaLocationDot,
    FaRegClock,
    FaMinus,
    FaPlus,
} from "react-icons/fa6"

import {
    MdOutlineDateRange,
    MdOutlinePriceChange,
} from "react-icons/md"

interface EventsAndCoursesHeaderFormProps {
    event: EventAndCourseSessionDetail
}

const FALLBACK_IMAGE = "/images/loghanteh-cafe.jpg"

function EventsAndCoursesHeaderForm({
    event,
}: EventsAndCoursesHeaderFormProps) {
    const locale = useLocale()
    const router = useRouter()

    const { setHallData } = useHall()
    const { setPaymentData } = useTicketPayment()

    const commonT = useTranslations("common")
    const t = useTranslations("eventsAndCoursesDetails.header")

    const [quantity, setQuantity] = useState(1)

    const hasHall =
        typeof event.hallId === "number" &&
        event.hallId > 0

    const startAt = new Date(event.startAt)

    const date = new Intl.DateTimeFormat(
        locale === "fa" ? "fa-IR" : "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        },
    ).format(startAt)

    const time = new Intl.DateTimeFormat(
        locale === "fa" ? "fa-IR" : "en-US",
        {
            hour: "numeric",
            minute: "2-digit",
        },
    ).format(startAt)

    const formattedPrice = event.price.toLocaleString(locale)

    const eventImage =
        event.images?.find(
            (image) =>
                typeof image.imageUrl === "string" &&
                image.imageUrl.trim().length > 0,
        )?.imageUrl ?? FALLBACK_IMAGE

    function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

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
                quantity,
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
                imageURL: eventImage,
                price: event.price,
            },
        })

        router.push(`/${locale}/hall/${event.hallId}`)
    }

    return (
        <FadeIn
            once
            transition={slowTransitionOut}
            className="h-full"
        >
            <form
                onSubmit={submitForm}
                className={cn(
                    "relative flex h-full flex-col",
                    "overflow-hidden rounded-3xl",
                    "border border-black/10 bg-white",
                    "shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
                )}
            >
                <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-crimson via-crimson to-gold-utility" />

                <div className="flex flex-1 flex-col justify-between gap-8 p-5 sm:p-7 xl:p-8">
                    <div className="flex flex-col gap-7">
                        {/* Title */}

                        <div>
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-crimson/5 px-3 py-1.5 text-xs font-semibold text-crimson">
                                <span className="size-1.5 rounded-full bg-gold-utility" />

                                {hasHall
                                    ? locale === "fa"
                                        ? "رزرو با انتخاب صندلی"
                                        : "Choose your seat"
                                    : locale === "fa"
                                        ? "ثبت سفارش"
                                        : "Ticket booking"}
                            </span>

                            <h1 className="break-words text-2xl font-bold leading-relaxed text-black-utility sm:text-3xl">
                                {event.name}
                            </h1>
                        </div>

                        {/* Event details */}

                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-crimson/5 text-crimson">
                                    <FaLocationDot className="size-4" />
                                </div>

                                <div className="min-w-0 pt-0.5">
                                    <p className="mb-1 text-xs text-black-light-utility">
                                        {t("details.address")}
                                    </p>

                                    <p className="text-sm font-medium leading-6 text-black-utility">
                                        {locale === "fa"
                                            ? "لوگنته"
                                            : "Loghanteh"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-crimson/5 text-crimson">
                                    <MdOutlineDateRange className="size-5" />
                                </div>

                                <div className="min-w-0 pt-0.5">
                                    <p className="mb-1 text-xs text-black-light-utility">
                                        {locale === "fa"
                                            ? "تاریخ برگزاری"
                                            : "Date"}
                                    </p>

                                    <p className="text-sm font-medium leading-6 text-black-utility">
                                        {date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-crimson/5 text-crimson">
                                    <FaRegClock className="size-4" />
                                </div>

                                <div className="min-w-0 pt-0.5">
                                    <p className="mb-1 text-xs text-black-light-utility">
                                        {locale === "fa"
                                            ? "ساعت شروع"
                                            : "Start time"}
                                    </p>

                                    <p className="text-sm font-medium leading-6 text-black-utility">
                                        {time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ticket quantity */}

                        {!hasHall && (
                            <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8f6f3] p-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-black-utility">
                                        {locale === "fa"
                                            ? "تعداد بلیت"
                                            : "Tickets"}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-black-light-utility">
                                        {locale === "fa"
                                            ? "تعداد موردنظر را انتخاب کنید"
                                            : "Select the number of tickets"}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <button
                                        type="button"
                                        aria-label={
                                            locale === "fa"
                                                ? "کاهش تعداد"
                                                : "Decrease quantity"
                                        }
                                        disabled={quantity <= 1}
                                        onClick={() =>
                                            setQuantity((current) =>
                                                Math.max(1, current - 1),
                                            )
                                        }
                                        className="flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black-utility transition hover:border-crimson hover:text-crimson disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <FaMinus className="size-3" />
                                    </button>

                                    <span className="min-w-5 text-center font-bold tabular-nums text-black-utility">
                                        {quantity.toLocaleString(locale)}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label={
                                            locale === "fa"
                                                ? "افزایش تعداد"
                                                : "Increase quantity"
                                        }
                                        disabled={quantity >= 20}
                                        onClick={() =>
                                            setQuantity((current) =>
                                                Math.min(20, current + 1),
                                            )
                                        }
                                        className="flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black-utility transition hover:border-crimson hover:text-crimson disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <FaPlus className="size-3" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price and booking action */}

                    <div>
                        <div className="mb-6 border-t border-dashed border-black/15" />

                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-utility/15 text-gold-hover">
                                    <MdOutlinePriceChange className="size-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-black-light-utility">
                                        {t("details.amount")}
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-black-utility">
                                        {locale === "fa"
                                            ? "قیمت هر بلیت"
                                            : "Price per ticket"}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 text-end">
                                <p className="text-2xl font-extrabold tracking-tight text-crimson sm:text-3xl">
                                    {formattedPrice}
                                </p>

                                <p className="mt-1 text-xs text-black-light-utility">
                                    {commonT("price-type")}
                                </p>
                            </div>
                        </div>

                        <Button
                            className={cn(
                                "group flex w-full items-center justify-center gap-3",
                                "rounded-xl bg-crimson px-5 py-4",
                                "font-bold text-white",
                                "transition duration-300 hover:bg-[#630a14]",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-gold-utility focus-visible:ring-offset-2",
                            )}
                        >
                            <span>{t("details.book-button")}</span>

                            <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                            >
                                →
                            </span>
                        </Button>

                        <p className="mt-4 text-center text-xs leading-6 text-black-light-utility">
                            {locale === "fa"
                                ? "اطلاعات رویداد را بررسی کنید و رزرو خود را ادامه دهید."
                                : "Review the event details before continuing your booking."}
                        </p>
                    </div>
                </div>
            </form>
        </FadeIn>
    )
}

export default EventsAndCoursesHeaderForm
