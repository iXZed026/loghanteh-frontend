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
     * Keep rows memoized.
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
        <div
            className="
                w-full
                min-w-0
            "
        >

            <div
                className="
                    flex
                    w-full
                    flex-col
                    gap-4
                    rounded-2xl
                    sm:border
                    border-black-opacity
                    bg-white
                    px-2
                    py-6
                    sm:gap-5
                    sm:px-4
                    sm:py-8
                "
            >


                {/* Seat rows */}

                <div
                    className="
                        mx-auto
                        flex
                        w-full
                        max-w-full
                        flex-col
                        gap-3
                        sm:gap-4
                    "
                >

                    {rowEntries.map(
                        ([row, rowSeats]) => (
                            <div
                                key={row}
                                className="
                                    flex
                                    w-full
                                    min-w-0
                                    items-center
                                    justify-center
                                    gap-1
                                    sm:gap-3
                                "
                            >

                                {/* Row number */}

                                <div
                                    className="
                                        hidden
                                        sm:fcc
                                        size-4
                                        shrink-0
                                        
                                        rounded-md
                                        bg-black
                                        text-[9px]
                                        font-semibold
                                        text-white
                                        sm:size-8
                                        sm:rounded-lg
                                        sm:text-xs
                                    "
                                >
                                    {row}
                                </div>

                                {/* Seats */}

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        flex-1
                                        items-center
                                        justify-center
                                        gap-1
                                        sm:flex-none
                                        sm:gap-3
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
    );
}

export default SeatsWrapper;