"use client";

import {
    useState,
} from "react";

import SeatsWrapper, {
    HallSeat,
    SelectedSeat,
} from "./SeatsWrapper";

import SelectedSeats from "./SelectedSeats";

import {
    useHall,
} from "@/features/loghante(root)/halls/context/HallProvider";

interface HallContentProps {
    hallName: string;
    seats: HallSeat[];
}

function HallContent({
    hallName,
    seats,
}: HallContentProps) {

    const {
        hallData,
    } = useHall();

    const [
        selectedSeats,
        setSelectedSeats,
    ] = useState<SelectedSeat[]>([]);

    const toggleSeat = (
        seat: SelectedSeat,
    ) => {

        setSelectedSeats(
            (currentSeats) => {

                const exists =
                    currentSeats.some(
                        (item) =>
                            item.id ===
                            seat.id,
                    );

                if (exists) {
                    return currentSeats.filter(
                        (item) =>
                            item.id !==
                            seat.id,
                    );
                }

                return [
                    ...currentSeats,
                    seat,
                ];
            },
        );
    };

    const sessionId =
        hallData?.eventData.sessionId;

    if (!sessionId) {
        return null;
    }

    return (
        <div
            className="
                grid
                grid-cols-12
                gap-6
                lg:gap-10
            "
        >

            {/* Selected seats */}

            <div
                className="
                    col-span-12
                    order-1
                    lg:col-span-4
                    lg:order-1
                "
            >
                <div
                    className="
                        lg:sticky
                        lg:top-24
                    "
                >
                    <SelectedSeats
                        hallName={hallName}
                        seats={selectedSeats}
                    />
                </div>
            </div>

            {/* Hall */}

            <div
                className="
                    col-span-12
                    order-2
                    min-w-0
                    lg:col-span-8
                    lg:order-2
                "
            >
                <SeatsWrapper
                    seats={seats}
                    selectedSeats={
                        selectedSeats
                    }
                    onToggleSeat={
                        toggleSeat
                    }
                    sessionId={
                        sessionId
                    }
                />
            </div>

        </div>
    );
}

export default HallContent;