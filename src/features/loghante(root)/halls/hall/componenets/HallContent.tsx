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
    hallName: string,
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
                gap-10
            "
        >

            <div
                className="
                    col-span-12
                    lg:col-span-4
                    lg:order-1
                "
            >
                <SelectedSeats
                    hallName={hallName}
                    seats={selectedSeats}
                />
            </div>

            <div
                className="
                    col-span-12
                    lg:col-span-8
                    lg:order-2
                    w-full
                    overflow-x-scroll
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