"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import SeatsBox from "./SeatsBox";

import {
    getBookingSeats,
} from "@/lib/api/ticket/booking-seat";

export interface HallSeat {
    id: number;
    seatNum: number;
    row: number;
}

export interface SelectedSeat {
    id: number;
    seatNum: number;
    row: number;
}

interface SeatsWrapperProps {
    seats: HallSeat[];
    selectedSeats: SelectedSeat[];
    onToggleSeat: (
        seat: SelectedSeat,
    ) => void;
    sessionId: number;
}

function SeatsWrapper({
    seats,
    selectedSeats,
    onToggleSeat,
    sessionId,
}: SeatsWrapperProps) {

    const [
        bookingSeats,
        setBookingSeats,
    ] = useState<
        Awaited<
            ReturnType<typeof getBookingSeats>
        >
    >([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    useEffect(() => {

        const controller =
            new AbortController();

        const fetchBookingSeats =
            async () => {

                try {

                    setIsLoading(true);

                    const data =
                        await getBookingSeats(
                            sessionId,
                        );

                    if (
                        !controller.signal
                            .aborted
                    ) {
                        setBookingSeats(data);
                    }

                } catch (error) {

                    if (
                        !controller.signal
                            .aborted
                    ) {
                        console.error(
                            "Failed to fetch booking seats:",
                            error,
                        );
                    }

                } finally {

                    if (
                        !controller.signal
                            .aborted
                    ) {
                        setIsLoading(false);
                    }
                }
            };

        fetchBookingSeats();

        return () => {
            controller.abort();
        };

    }, [sessionId]);

    const reservedSeatIds =
        useMemo(
            () =>
                new Set(
                    bookingSeats
                        .filter(
                            (seat) =>
                                seat.status ===
                                "reserved",
                        )
                        .map(
                            (seat) =>
                                seat.seatId,
                        ),
                ),
            [bookingSeats],
        );

    const rows = Object.groupBy(
        seats ?? [],
        (seat) => seat.row,
    );

    const isSeatSelected = (
        seatId: number,
    ) => {

        return selectedSeats.some(
            (seat) =>
                seat.id === seatId,
        );
    };

    const isSeatReserved = (
        seatId: number,
    ) => {

        return reservedSeatIds.has(
            seatId,
        );
    };

    return (
        <div className="fcol gap-4">

            {Object.entries(rows).map(
                ([row, rowSeats]) => (
                    <div
                        key={row}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-3
                        "
                    >

                        {/* Row Number */}

                        <div
                            className="
                                size-8
                                shrink-0
                                fcc
                                rounded-lg
                                bg-black
                                text-xs
                                font-semibold
                                text-white
                            "
                        >
                            {row}
                        </div>

                        {/* Seats */}

                        <div
                            className="
                                flex
                                justify-center
                                gap-3
                            "
                        >
                            {rowSeats?.map(
                                (seat) => {

                                    const reserved =
                                        isSeatReserved(
                                            seat.id,
                                        );

                                    return (
                                        <SeatsBox
                                            key={
                                                seat.id
                                            }
                                            seatNum={
                                                seat.seatNum
                                            }
                                            selected={
                                                isSeatSelected(
                                                    seat.id,
                                                )
                                            }
                                            reserved={
                                                reserved
                                            }
                                            disabled={
                                                isLoading ||
                                                reserved
                                            }
                                            onClick={() =>
                                                onToggleSeat(
                                                    seat,
                                                )
                                            }
                                        />
                                    );
                                },
                            )}
                        </div>

                    </div>
                ),
            )}

        </div>
    );
}

export default SeatsWrapper;