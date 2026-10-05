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
                        !controller.signal.aborted
                    ) {
                        setBookingSeats(data);
                    }

                } catch (error) {

                    if (
                        !controller.signal.aborted
                    ) {
                        console.error(
                            "Failed to fetch booking seats:",
                            error,
                        );
                    }

                } finally {

                    if (
                        !controller.signal.aborted
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

    /*
     * O(1) reserved-seat lookup.
     */
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

    /*
     * O(1) selected-seat lookup.
     */
    const selectedSeatIds =
        useMemo(
            () =>
                new Set(
                    selectedSeats.map(
                        (seat) =>
                            seat.id,
                    ),
                ),
            [selectedSeats],
        );

    /*
     * Keep the original cinema row structure.
     */
    const rows =
        useMemo(
            () =>
                Object.groupBy(
                    seats ?? [],
                    (seat) =>
                        seat.row,
                ),
            [seats],
        );

    const rowEntries =
        useMemo(
            () =>
                Object.entries(rows),
            [rows],
        );

    return (
        <div className="w-full min-w-0">

            {/*
             * IMPORTANT:
             *
             * Desktop keeps the original cinema layout.
             *
             * Mobile gets its own horizontal scrolling
             * container so the whole page does not overflow.
             */}

            <div
                className="
                    w-full
                    overflow-x-auto
                    overflow-y-hidden
                    overscroll-x-contain
                    touch-pan-x
                    pb-3
                    sm:overflow-visible
                    sm:pb-0
                "
            >

                <div
                    className="
                        mx-auto
                        w-max
                        min-w-full
                        px-2
                        sm:w-full
                        sm:min-w-0
                        sm:px-0
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                        "
                    >

                        {rowEntries.map(
                            ([row, rowSeats]) => (
                                <div
                                    key={row}
                                    className="
                                        flex
                                        min-w-max
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
                                            items-center
                                            justify-center
                                            gap-3
                                        "
                                    >

                                        {rowSeats?.map(
                                            (
                                                seat,
                                            ) => {

                                                const reserved =
                                                    reservedSeatIds.has(
                                                        seat.id,
                                                    );

                                                const selected =
                                                    selectedSeatIds.has(
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
                                                            selected
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

                </div>

            </div>

            {/* Mobile scroll hint */}

            <div
                className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-[10px]
                    text-black-light-utility
                    sm:hidden
                "
            >
            </div>

        </div>
    );
}

export default SeatsWrapper;