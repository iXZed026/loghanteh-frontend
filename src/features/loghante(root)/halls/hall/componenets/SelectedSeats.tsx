"use client";

import {
    useMemo,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    useLocale,
    useTranslations,
} from "next-intl";

import Button from "@/components/ui/Button";

import {
    cn,
} from "@/lib/utils/cn";

import type {
    SelectedSeat,
} from "./SeatsWrapper";

import {
    useHall,
} from "../../context/HallProvider";

import {
    useTicketPayment,
} from "@/features/loghante(root)/context/TicketPaymentContext";

interface SelectedSeatsProps {
    hallName: string;
    seats?: SelectedSeat[];
}

function SelectedSeats({
    hallName,
    seats,
}: SelectedSeatsProps) {

    const T =
        useTranslations(
            "hall.select-seat",
        );

    const locale =
        useLocale();

    const router =
        useRouter();

    const {
        hallData,
    } = useHall();

    const {
        paymentData,
        setPaymentData,
    } = useTicketPayment();

    const event =
        hallData?.eventData ??
        paymentData?.ticket;

    const selectedSeats =
        seats ??
        paymentData?.hall?.seatsNumbs.map(
            (seat) => ({
                id: seat.seatId,
                seatNum: seat.seatNum,
                row: seat.row,
            }),
        ) ??
        [];

    const groupedSeats =
        useMemo(
            () =>
                Object.groupBy(
                    selectedSeats,
                    (seat) =>
                        seat.row,
                ),
            [selectedSeats],
        );

    const totalPrice =
        Number(
            event?.price ?? 0,
        ) *
        selectedSeats.length;

    const handleContinue = () => {

        if (
            !hallData?.eventData ||
            selectedSeats.length === 0
        ) {
            return;
        }

        const currentEvent =
            hallData.eventData;

        setPaymentData({
            type: "cinema-and-theater",

            ticket: {
                sessionId:
                    currentEvent.sessionId,

                eventId:
                    currentEvent.eventId,

                name:
                    currentEvent.title,

                startAt:
                    String(
                        currentEvent.startAt,
                    ),

                durationM:
                    currentEvent.duration,

                price:
                    currentEvent.price !==
                        undefined
                        ? Number(
                            currentEvent.price,
                        )
                        : null,
            },

            hall: {
                hallName,

                seatsNumbs:
                    selectedSeats.map(
                        (seat) => ({
                            seatId:
                                seat.id,

                            seatNum:
                                seat.seatNum,

                            row:
                                seat.row,
                        }),
                    ),
            },

            quantity:
                selectedSeats.length,
        });

        router.push(
            `/${locale}/payment`,
        );
    };

    if (selectedSeats.length === 0) {
        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-black-opacity
                    bg-white
                    p-4
                    sm:p-6
                "
            >
                <div
                    className="
                        flex
                        min-h-24
                        items-center
                        justify-center
                        text-center
                    "
                >
                    <p
                        className="
                            text-xs
                            text-black-light-utility
                            sm:text-sm
                        "
                    >
                        {T("no-seat")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-2xl",
                "border",
                "border-black-opacity",
                "bg-white",
                "p-4",
                "sm:p-6",
            )}
        >

            {/* Header */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-b
                    border-black-opacity
                    pb-4
                    sm:pb-5
                "
            >

                <div className="min-w-0">

                    <h2
                        className="
                            truncate
                            text-base
                            font-bold
                            sm:text-lg
                        "
                    >
                        {T("select-seat")}
                    </h2>

                    <p
                        className="
                            mt-1
                            text-[11px]
                            text-black-light-utility
                            sm:text-xs
                        "
                    >
                        {selectedSeats.length} seats ×{" "}
                        {Number(
                            event?.price ?? 0,
                        ).toLocaleString()}{" "}
                        Toman
                    </p>

                </div>

                <div
                    className="
                        fcc
                        size-9
                        shrink-0
                        rounded-xl
                        bg-crimson
                        text-sm
                        font-bold
                        text-white
                        sm:size-10
                    "
                >
                    {selectedSeats.length}
                </div>

            </div>

            {/* Seats */}
            <div
                className={cn(
                    "mt-4",
                    "sm:mt-5",
                    "overflow-y-auto",
                    "overscroll-contain",
                    "pr-1",
                    "scrollbar-thin",
                    "h-60",
                )}
            >
                <div
                    className="
            fcol
            gap-3
        "
                >
                    {Object.entries(
                        groupedSeats,
                    ).map(
                        ([row, rowSeats]) => (
                            <div
                                key={row}
                                className="
                        flex
                        min-w-0
                        items-start
                        gap-2
                        sm:gap-3
                    "
                            >
                                <span
                                    className="
                            w-10
                            shrink-0
                            pt-2
                            text-[10px]
                            font-semibold
                            text-black-light-utility
                            sm:w-14
                            sm:text-xs
                        "
                                >
                                    {T("row")} {row}
                                </span>

                                <div
                                    className="
                            flex
                            min-w-0
                            flex-1
                            flex-wrap
                            gap-1.5
                            sm:gap-2
                        "
                                >
                                    {rowSeats?.map(
                                        (seat) => (
                                            <span
                                                key={seat.id}
                                                className="
                                        fcc
                                        h-8
                                        min-w-8
                                        rounded-lg
                                        bg-crimson
                                        px-2
                                        text-xs
                                        font-semibold
                                        text-white-utility
                                        sm:h-9
                                        sm:min-w-9
                                        sm:text-sm
                                    "
                                            >
                                                {seat.seatNum}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>

            {/* Payment */}

            <div className="mt-5 sm:mt-6">

                <Button
                    type="button"
                    onClick={
                        handleContinue
                    }
                    className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                        bg-crimson
                        px-4
                        py-3
                        text-xs
                        font-semibold
                        transition-colors
                        hover:bg-[var(--crimson-opacity-color)]
                        hover:text-crimson
                        sm:px-5
                        sm:py-3.5
                        sm:text-sm
                    "
                >

                    <span>
                        {T("payment-button")}
                    </span>

                    {event?.price === 0 ? (
                        <span
                            className="
                                font-semibold
                                text-gold-utility
                            "
                        >
                            Free
                        </span>
                    ) : (
                        <span
                            className="
                                fcol
                                items-end
                                gap-y-0.5
                            "
                        >
                            <span className="font-bold">
                                {totalPrice.toLocaleString()}
                            </span>

                            <span
                                className="
                                    text-[10px]
                                    opacity-80
                                "
                            >
                                Toman
                            </span>
                        </span>
                    )}

                </Button>

            </div>

        </div>
    );
}

export default SelectedSeats;