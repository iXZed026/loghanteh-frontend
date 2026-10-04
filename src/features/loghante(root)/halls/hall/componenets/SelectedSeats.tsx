"use client";

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
    hallName: string
    seats?: SelectedSeat[];
}

function SelectedSeats({
    hallName,
    seats,
}: SelectedSeatsProps) {

    const T = useTranslations("hall.select-seat")

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
                hallName:
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
                className={cn(
                    "rounded-2xl",
                    "border",
                    "border-black-opacity",
                    "bg-white",
                    "p-6",
                    "text-center",
                )}
            >
                <p className="text-sm text-black-light-utility">
                    {T("no-seat")}
                </p>
            </div>
        );
    }

    const groupedSeats =
        Object.groupBy(
            selectedSeats,
            (seat) => seat.row,
        );

    return (
        <div
            className={cn(
                "rounded-2xl",
                "border",
                "border-black-opacity",
                "bg-white",
                "p-6",
            )}
        >

            <div className="fbc mb-5 gap-4">

                <div className="fcol gap-1">

                    <h2 className="text-lg font-bold">
                        {T("select-seat")}
                    </h2>

                    <span className="text-xs text-black-light-utility">
                        {
                            selectedSeats.length
                        }{" "}
                        seats x{" "}
                        {event?.price ?? 0} Toman
                    </span>

                </div>

                <div
                    className="
                        size-10
                        fcc
                        rounded-xl
                        bg-crimson
                        font-bold
                        text-white
                    "
                >
                    {
                        selectedSeats.length
                    }
                </div>

            </div>

            <div
                className="
                    fcol
                    min-h-[30vh]
                    justify-between
                "
            >

                <div className="fcol gap-3">

                    {Object.entries(
                        groupedSeats,
                    ).map(
                        ([row, rowSeats]) => (
                            <div
                                key={row}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <span
                                    className="
                                        w-14
                                        shrink-0
                                        text-xs
                                        font-semibold
                                        text-black-light-utility
                                    "
                                >
                                    {T("row")} {""} {row}
                                </span>

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {rowSeats?.map(
                                        (seat) => (
                                            <span
                                                key={
                                                    seat.id
                                                }
                                                className="
                                                    fcc
                                                    h-9
                                                    min-w-9
                                                    rounded-lg
                                                    bg-crimson
                                                    px-2
                                                    text-sm
                                                    font-semibold
                                                    text-white-utility
                                                "
                                            >
                                                {
                                                    seat.seatNum
                                                }
                                            </span>
                                        ),
                                    )}
                                </div>

                            </div>
                        ),
                    )}

                </div>

                {seats && (
                    <div className="mt-6">

                        <Button
                            type="button"
                            onClick={
                                handleContinue
                            }
                            className="
                                w-full
                                fbc
                                bg-crimson
                                py-3
                                text-sm
                                font-semibold
                                hover:bg-[var(--crimson-opacity-color)]
                                hover:text-crimson
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
                                        items-center
                                        gap-y-1
                                    "
                                >

                                    {(
                                        Number(
                                            event?.price ??
                                            0,
                                        ) *
                                        selectedSeats.length
                                    ).toLocaleString()}

                                    <span>
                                        Toman
                                    </span>

                                </span>
                            )}

                        </Button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default SelectedSeats;