"use client";

import { cn } from "@/lib/utils/cn";

import { useTranslations } from "next-intl";

import {
    FaChair,
    FaLocationDot,
} from "react-icons/fa6";

import {
    useTicketPayment,
} from "../../context/TicketPaymentContext";

function PaymentHallInfo() {

    const hallT =
        useTranslations(
            "payment.ticket-info.hall",
        );

    const {
        paymentData,
    } = useTicketPayment();

    const hall =
        paymentData?.hall;

    if (!hall) {
        return null;
    }

    const seatsByRow =
        hall.seatsNumbs.reduce<
            Record<number, number[]>
        >(
            (
                rows,
                seat,
            ) => {

                if (!rows[seat.row]) {
                    rows[seat.row] = [];
                }

                rows[seat.row].push(
                    seat.seatNum,
                );

                return rows;
            },
            {},
        );

    return (
        <div
            className={cn(
                "fcol",
                "gap-5",
                "rounded-xl",
                "border",
                "border-black-opacity",
                "bg-gold-utility",
                "p-5",
            )}
        >

            {/* Hall */}

            <div className="fcol gap-2">

                <span
                    className={cn(
                        "text-xs",
                        "text-black-light-utility",
                    )}
                >
                    {hallT("title")}
                </span>

                <div className="fcc gap-2">

                    <FaLocationDot
                        className="text-crimson"
                    />

                    <span className="font-semibold">
                        {hall.hallName}
                    </span>

                </div>

            </div>

            {/* Seats */}

            <div className="fcol gap-2">

                <span
                    className={cn(
                        "text-xs",
                        "text-black-light-utility",
                    )}
                >
                    {hallT("seats")}
                </span>

                <div
                    className={cn(
                        "fcol",
                        "gap-3",
                    )}
                >
                    {Object.entries(
                        seatsByRow,
                    ).map(
                        (
                            [
                                row,
                                seatNumbers,
                            ],
                        ) => (
                            <div
                                key={row}
                                className={cn(
                                    "flex",
                                    "items-center",
                                    "gap-3",
                                )}
                            >

                                <span
                                    className={cn(
                                        "shrink-0",
                                        "text-xs",
                                        "font-semibold",
                                        "text-black-light-utility",
                                    )}
                                >
                                    {hallT("row")} {row}
                                </span>

                                <div
                                    className={cn(
                                        "flex",
                                        "flex-wrap",
                                        "gap-2",
                                    )}
                                >
                                    {seatNumbers.map(
                                        (
                                            seatNumber,
                                        ) => (
                                            <div
                                                key={seatNumber}
                                                className={cn(
                                                    "fcc",
                                                    "gap-2",
                                                    "rounded-lg",
                                                    "bg-crimson",
                                                    "px-3",
                                                    "py-2",
                                                    "text-white",
                                                    "shadow-sm",
                                                )}
                                            >

                                                <FaChair
                                                    className="size-3.5 shrink-0"
                                                />

                                                <span
                                                    className="
                                                        text-sm
                                                        font-bold
                                                    "
                                                >
                                                    {seatNumber}
                                                </span>

                                            </div>
                                        ),
                                    )}
                                </div>

                            </div>
                        ),
                    )}
                </div>

            </div>

        </div>
    );
}

export default PaymentHallInfo;

