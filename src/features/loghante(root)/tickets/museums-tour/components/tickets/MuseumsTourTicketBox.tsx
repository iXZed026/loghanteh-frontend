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
import { useEffect, useMemo, useState } from "react";
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
            "museumsTour.ticket-box"
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

    /*
     * Keep the current time updated so the session
     * automatically changes from upcoming -> in-progress -> ended.
     */
    useEffect(() => {

        const interval =
            setInterval(() => {
                setCurrentTime(Date.now());
            }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, []);

    const startAt =
        useMemo(
            () => new Date(ticket.startAt),
            [ticket.startAt],
        );

    const endAt =
        useMemo(
            () =>
                new Date(
                    startAt.getTime() +
                    ticket.durationM * 60 * 1000,
                ),
            [
                startAt,
                ticket.durationM,
            ],
        );

    const sessionStatus: SessionStatus =
        currentTime < startAt.getTime()
            ? "upcoming"
            : currentTime < endAt.getTime()
                ? "in-progress"
                : "ended";

    const formattedTime =
        formatTime(
            startAt,
            locale,
        );

    const increaseHandler = () => {

        setTicketCount((prev) => {

            if (
                prev >= ticket.capacity
            ) {
                return prev;
            }

            return prev + 1;
        });
    };

    const decreaseHandler = () => {

        setTicketCount((prev) => {

            if (prev <= 0) {
                return prev;
            }

            return prev - 1;
        });
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
                sessionId: ticket.sessionId,
                eventId: ticket.eventId,
                name: ticket.name,
                startAt: ticket.startAt,
                durationM: ticket.durationM,
                capacity: ticket.capacity,
                price: ticket.price,
            },

            quantity: ticketCount,
        });

        router.push(
            `/${locale}/payment`,
        );
    };

    const isUnavailable =
        sessionStatus !== "upcoming";

    const isCapacityCompleted =
        ticket.capacity <= 0;

    return (
        <div
            className={cn(
                "lg:col-span-6 col-span-12",
                "fcol gap-10",
                "p-8",
                "border-[1px] border-black-opacity",
                "rounded-xl",
                "shadow-xl",

                (
                    isUnavailable ||
                    isCapacityCompleted
                ) && [
                    "bg-[var(--white-light-color)]",
                    "justify-center",
                ],
            )}
        >

            {/* Start Time */}
            <div className="text-center">

                <span className="text-xl font-bold">
                    {formattedTime}
                </span>

            </div>

            {/* Upcoming */}
            {sessionStatus === "upcoming" && (
                <>
                    {/* Remaining Capacity */}
                    {!isCapacityCompleted && (
                        <div>
                            <span className="text-lg font-semibold">
                                {ticketBoxT("capacity")}{" "}
                                {ticket.capacity}
                            </span>
                        </div>
                    )}

                    {/* Ticket Quantity */}
                    {!isCapacityCompleted && (
                        <div
                            className={cn(
                                "select-none",
                                "fbc",
                            )}
                        >
                            <div className="font-semibold">
                                <span>
                                    {ticketBoxT(
                                        "ticket-count",
                                    )}
                                </span>
                            </div>

                            <div className="fcc gap-2">

                                <div
                                    className={cn(
                                        "fcc",
                                        "bg-gray-600/30",
                                        "rounded-4xl",
                                        "font-bold",
                                    )}
                                >

                                    <span
                                        className={cn(
                                            "text-xl",
                                            "cursor-pointer",
                                            "click-scale",
                                            "px-3 py-1",
                                            ticketCount >=
                                            ticket.capacity &&
                                            "opacity-40 cursor-not-allowed",
                                        )}
                                        onClick={
                                            increaseHandler
                                        }
                                    >
                                        +
                                    </span>

                                    <span>|</span>

                                    <span
                                        className={cn(
                                            "text-xl",
                                            "cursor-pointer",
                                            "click-scale",
                                            "px-3 py-1",
                                            ticketCount <= 0 &&
                                            "opacity-40 cursor-not-allowed",
                                        )}
                                        onClick={
                                            decreaseHandler
                                        }
                                    >
                                        -
                                    </span>

                                </div>

                                <div
                                    className={cn(
                                        "bg-gray-600/30",
                                        "px-2 py-1",
                                        "rounded-4xl",
                                        "font-bold",
                                    )}
                                >
                                    <span>
                                        {ticketCount}
                                    </span>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Capacity Completed */}
                    {isCapacityCompleted && (
                        <span
                            className={cn(
                                "text-lg",
                                "font-semibold",
                                "text-crimson",
                                "text-center",
                            )}
                        >
                            Capacity completed.
                        </span>
                    )}

                    {/* Book Button */}
                    {!isCapacityCompleted && (
                        <div className="fcc">

                            <Button
                                type="button"
                                disabled={
                                    ticketCount === 0
                                }
                                onClick={
                                    bookTicketHandler
                                }
                                className={cn(
                                    "font-semibold",
                                    "px-3 py-2",
                                    "bg-crimson",
                                    "hover:bg-[var(--crimson-hover-color)]",
                                    ticketCount === 0 &&
                                    "opacity-50 cursor-not-allowed",
                                )}
                            >
                                {
                                    ticketBoxT(
                                        "book-button",
                                    )
                                }
                            </Button>

                        </div>
                    )}
                </>
            )}

            {/* In Progress */}
            {sessionStatus === "in-progress" && (
                <div className="fcc">

                    <span
                        className={cn(
                            "text-lg",
                            "font-semibold",
                            "text-[#527A8A]",
                        )}
                    >
                        In Progress
                    </span>

                </div>
            )}

            {/* Ended */}
            {sessionStatus === "ended" && (
                <div className="fcc">

                    <span
                        className={cn(
                            "text-lg",
                            "font-semibold",
                            "text-crimson",
                        )}
                    >
                        Session ended.
                    </span>

                </div>
            )}

        </div>
    );
}

export default MuseumsTourTicketBox;
