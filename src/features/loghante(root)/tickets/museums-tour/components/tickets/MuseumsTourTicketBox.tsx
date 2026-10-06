"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import {
    MuseumTourSessionResponse,
} from "@/lib/api/ticket/museum-tour";
import {
    useLocale,
    useTranslations,
} from "next-intl";
import { useRouter } from "next/navigation";
import {
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    useTicketPayment,
} from "@/features/loghante(root)/context/TicketPaymentContext";
import {
    formatTime,
} from "@/lib/utils/date";

interface MuseumsTourTicketBoxProps {
    ticket: MuseumTourSessionResponse;
}

type SessionStatus =
    | "upcoming"
    | "in-progress"
    | "ended";

function MuseumsTourTicketBox({
    ticket,
}: MuseumsTourTicketBoxProps) {

    const ticketBoxT =
        useTranslations(
            "museumsTour.ticket-box",
        );

    const locale = useLocale();
    const router = useRouter();

    const {
        setPaymentData,
    } = useTicketPayment();

    const [
        ticketCount,
        setTicketCount,
    ] = useState(0);

    const [
        currentTime,
        setCurrentTime,
    ] = useState(() => Date.now());

    useEffect(() => {

        const interval =
            setInterval(() => {
                setCurrentTime(
                    Date.now(),
                );
            }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, []);

    const startAt =
        useMemo(
            () =>
                new Date(
                    ticket.startAt,
                ),
            [ticket.startAt],
        );

    const endAt =
        useMemo(
            () =>
                new Date(
                    startAt.getTime() +
                    ticket.durationM *
                        60 *
                        1000,
                ),
            [
                startAt,
                ticket.durationM,
            ],
        );

    const sessionStatus: SessionStatus =
        currentTime <
        startAt.getTime()
            ? "upcoming"
            : currentTime <
                endAt.getTime()
                ? "in-progress"
                : "ended";

    const formattedTime =
        formatTime(
            startAt,
            locale,
        );

    const isUnavailable =
        sessionStatus !== "upcoming";

    const isCapacityCompleted =
        ticket.capacity <= 0;

    const canIncrease =
        ticketCount <
        ticket.capacity;

    const canDecrease =
        ticketCount > 0;

    const increaseHandler = () => {

        if (!canIncrease) {
            return;
        }

        setTicketCount(
            (prev) =>
                prev + 1,
        );
    };

    const decreaseHandler = () => {

        if (!canDecrease) {
            return;
        }

        setTicketCount(
            (prev) =>
                prev - 1,
        );
    };

    const bookTicketHandler = () => {

        if (
            ticketCount < 1 ||
            sessionStatus !== "upcoming" ||
            ticket.capacity <= 0
        ) {
            return;
        }

        setPaymentData({
            type: "museum-tour",

            ticket: {
                sessionId:
                    ticket.sessionId,

                eventId:
                    ticket.eventId,

                name:
                    ticket.name,

                startAt:
                    ticket.startAt,

                durationM:
                    ticket.durationM,

                capacity:
                    ticket.capacity,

                price:
                    ticket.price,
            },

            quantity:
                ticketCount,
        });

        router.push(
            `/${locale}/payment`,
        );
    };

    const statusConfig = {
        upcoming: {
            label:
                ticketBoxT(
                    "status.upcoming",
                ),

            className:
                "bg-gold-opacity text-gold-utility",
        },

        "in-progress": {
            label:
                ticketBoxT(
                    "status.in-progress",
                ),

            className:
                "bg-gold-opacity text-gold-utility",
        },

        ended: {
            label:
                ticketBoxT(
                    "status.ended",
                ),

            className:
                "bg-crimson/10 text-crimson",
        },
    } as const;

    const currentStatus =
        statusConfig[
            sessionStatus
        ];

    return (
        <article
            className={cn(
                "md:col-span-6 col-span-12",
                "w-full",
                "rounded-2xl",
                "border",
                "border-black-opacity",
                "bg-white",
                "p-4",
                "shadow-[0_10px_35px_rgba(22,22,22,0.07)]",
                "transition-shadow",
                "duration-300",
                "sm:p-6",
                "lg:p-7",
                "hover:shadow-[0_14px_45px_rgba(22,22,22,0.10)]",

                isUnavailable ||
                    isCapacityCompleted
                    ? [
                        "bg-white-light-utility",
                    ]
                    : [],
            )}
        >

            {/* Header */}
            <div
                className={cn(
                    "fbc",
                    "gap-4",
                    "border-b",
                    "border-black/10",
                    "pb-5",
                )}
            >

                <div className="fcol gap-1">

                    <span
                        className={cn(
                            "text-xs",
                            "font-medium",
                            "text-black-light-utility",
                        )}
                    >
                        {ticketBoxT(
                            "start-time",
                        )}
                    </span>

                    <time
                        dateTime={
                            ticket.startAt
                        }
                        className={cn(
                            "text-2xl",
                            "font-bold",
                            "tracking-tight",
                            "text-black-utility",
                            "sm:text-3xl",
                        )}
                    >
                        {formattedTime}
                    </time>

                </div>

                <span
                    className={cn(
                        "shrink-0",
                        "rounded-full",
                        "px-3",
                        "py-1.5",
                        "text-xs",
                        "font-semibold",
                        "sm:text-sm",
                        currentStatus.className,
                    )}
                >
                    {currentStatus.label}
                </span>

            </div>

            {/* Upcoming */}
            {sessionStatus ===
                "upcoming" && (
                <div
                    className={cn(
                        "fcol",
                        "gap-6",
                        "pt-5",
                    )}
                >

                    {/* Session Information */}
                    <div
                        className={cn(
                            "grid",
                            "grid-cols-1",
                            "gap-3",
                            "sm:grid-cols-2",
                        )}
                    >

                        <div
                            className={cn(
                                "rounded-xl",
                                "border",
                                "border-black/10",
                                "bg-black/[0.025]",
                                "p-3.5",
                            )}
                        >
                            <span
                                className={cn(
                                    "block",
                                    "text-xs",
                                    "font-medium",
                                    "text-black-light-utility",
                                )}
                            >
                                {ticketBoxT(
                                    "capacity",
                                )}
                            </span>

                            <span
                                className={cn(
                                    "mt-1",
                                    "block",
                                    "text-lg",
                                    "font-bold",
                                    "text-black-utility",
                                )}
                            >
                                {ticket.capacity}
                            </span>
                        </div>

                        <div
                            className={cn(
                                "rounded-xl",
                                "border",
                                "border-black/10",
                                "bg-black/[0.025]",
                                "p-3.5",
                            )}
                        >
                            <span
                                className={cn(
                                    "block",
                                    "text-xs",
                                    "font-medium",
                                    "text-black-light-utility",
                                )}
                            >
                                {ticketBoxT(
                                    "duration",
                                )}
                            </span>

                            <span
                                className={cn(
                                    "mt-1",
                                    "block",
                                    "text-lg",
                                    "font-bold",
                                    "text-black-utility",
                                )}
                            >
                                {ticket.durationM}{" "}
                                {ticketBoxT(
                                    "minutes",
                                )}
                            </span>
                        </div>

                    </div>

                    {/* Capacity Completed */}
                    {isCapacityCompleted ? (
                        <div
                            className={cn(
                                "rounded-xl",
                                "bg-crimson/5",
                                "px-4",
                                "py-4",
                                "text-center",
                            )}
                        >
                            <span
                                className={cn(
                                    "text-sm",
                                    "font-semibold",
                                    "text-crimson",
                                    "sm:text-base",
                                )}
                            >
                                {ticketBoxT(
                                    "capacity-completed",
                                )}
                            </span>
                        </div>
                    ) : (
                        <>
                            {/* Ticket Quantity */}
                            <div
                                className={cn(
                                    "fbc",
                                    "gap-4",
                                    "rounded-xl",
                                    "border",
                                    "border-black/10",
                                    "bg-black/[0.025]",
                                    "p-3.5",
                                    "sm:p-4",
                                )}
                            >

                                <div className="fcol gap-0.5">

                                    <span
                                        className={cn(
                                            "text-sm",
                                            "font-semibold",
                                            "text-black-utility",
                                            "sm:text-base",
                                        )}
                                    >
                                        {ticketBoxT(
                                            "ticket-count",
                                        )}
                                    </span>

                                    <span
                                        className={cn(
                                            "text-xs",
                                            "text-black-light-utility",
                                        )}
                                    >
                                        {ticketBoxT(
                                            "selected-tickets",
                                            {
                                                count:
                                                    ticketCount,
                                            },
                                        )}
                                    </span>

                                </div>

                                <div
                                    className={cn(
                                        "fbc",
                                        "gap-2",
                                        "rounded-full",
                                        "bg-white",
                                        "p-1",
                                        "shadow-sm",
                                        "ring-1",
                                        "ring-black/10",
                                    )}
                                >

                                    <button
                                        type="button"
                                        aria-label={ticketBoxT(
                                            "decrease",
                                        )}
                                        disabled={
                                            !canDecrease
                                        }
                                        onClick={
                                            decreaseHandler
                                        }
                                        className={cn(
                                            "fcc",
                                            "size-9",
                                            "rounded-full",
                                            "text-xl",
                                            "font-semibold",
                                            "text-black-utility",
                                            "transition-all",
                                            "duration-150",
                                            "hover:bg-crimson/10",
                                            "hover:text-crimson",
                                            "active:scale-90",
                                            "disabled:cursor-not-allowed",
                                            "disabled:opacity-30",
                                            "sm:size-10",
                                        )}
                                    >
                                        −
                                    </button>

                                    <span
                                        aria-live="polite"
                                        className={cn(
                                            "fcc",
                                            "min-w-8",
                                            "px-1",
                                            "text-base",
                                            "font-bold",
                                            "text-black-utility",
                                        )}
                                    >
                                        {
                                            ticketCount
                                        }
                                    </span>

                                    <button
                                        type="button"
                                        aria-label={ticketBoxT(
                                            "increase",
                                        )}
                                        disabled={
                                            !canIncrease
                                        }
                                        onClick={
                                            increaseHandler
                                        }
                                        className={cn(
                                            "fcc",
                                            "size-9",
                                            "rounded-full",
                                            "bg-crimson",
                                            "text-xl",
                                            "font-semibold",
                                            "text-white",
                                            "transition-all",
                                            "duration-150",
                                            "hover:bg-[var(--crimson-hover-color)]",
                                            "active:scale-90",
                                            "disabled:cursor-not-allowed",
                                            "disabled:opacity-30",
                                            "sm:size-10",
                                        )}
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            {/* Book Button */}
                            <Button
                                type="button"
                                disabled={
                                    ticketCount ===
                                    0
                                }
                                onClick={
                                    bookTicketHandler
                                }
                                className={cn(
                                    "w-full",
                                    "rounded-xl",
                                    "px-5",
                                    "py-3",
                                    "font-semibold",
                                    "bg-crimson",
                                    "text-white",
                                    "shadow-sm",
                                    "transition-all",
                                    "duration-200",
                                    "hover:bg-[var(--crimson-hover-color)]",
                                    "hover:shadow-md",
                                    "disabled:cursor-not-allowed",
                                    "disabled:opacity-40",
                                    "sm:w-auto",
                                    "sm:self-end",
                                )}
                            >
                                {ticketBoxT(
                                    "book-button",
                                )}
                            </Button>
                        </>
                    )}

                </div>
            )}

            {/* In Progress */}
            {sessionStatus ===
                "in-progress" && (
                <div
                    className={cn(
                        "fcol",
                        "items-center",
                        "gap-3",
                        "py-10",
                        "text-center",
                    )}
                >
                    <span
                        className={cn(
                            "fcc",
                            "size-12",
                            "rounded-full",
                            "bg-gold-opacity",
                            "text-xl",
                        )}
                    >
                        •
                    </span>

                    <div className="fcol gap-1">

                        <span
                            className={cn(
                                "text-lg",
                                "font-bold",
                                "text-gold-hover",
                            )}
                        >
                            {ticketBoxT(
                                "status.in-progress",
                            )}
                        </span>

                        <span
                            className={cn(
                                "text-sm",
                                "text-black-light-utility",
                            )}
                        >
                            {ticketBoxT(
                                "in-progress-description",
                            )}
                        </span>

                    </div>
                </div>
            )}

            {/* Ended */}
            {sessionStatus ===
                "ended" && (
                <div
                    className={cn(
                        "fcol",
                        "items-center",
                        "gap-3",
                        "py-10",
                        "text-center",
                    )}
                >
                    <span
                        className={cn(
                            "fcc",
                            "size-12",
                            "rounded-full",
                            "bg-crimson/10",
                            "text-xl",
                            "text-crimson",
                        )}
                    >
                        ×
                    </span>

                    <div className="fcol gap-1">

                        <span
                            className={cn(
                                "text-lg",
                                "font-bold",
                                "text-crimson",
                            )}
                        >
                            {ticketBoxT(
                                "status.ended",
                            )}
                        </span>

                        <span
                            className={cn(
                                "text-sm",
                                "text-black-light-utility",
                            )}
                        >
                            {ticketBoxT(
                                "ended-description",
                            )}
                        </span>

                    </div>
                </div>
            )}

        </article>
    );
}

export default MuseumsTourTicketBox;