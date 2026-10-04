"use client";

import React, {
    useEffect,
    useState,
} from "react";

import DayOfWeekBox from "../../../../components/DayOfWeekBox";
import MuseumsTourTicketBox from "./MuseumsTourTicketBox";

import StaggerWrapper from "@/components/animations/StaggerWrapper";

import {
    dayOfTheWeeksContainerVariant,
} from "@/features/loghante(root)/animations/loghante.variants";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import {
    getMuseumTour,
    MuseumTourSessionResponse,
} from "@/lib/api/ticket/museum-tour";
import Loading from "@/components/ui/Loading";

function MuseumsTourTickets() {

    const DayOFTheWeeksT =
        useTranslations(
            "museumsTour.day-of-the-weeks"
        );

    const locale = useLocale();

    const [selectedDate, setSelectedDate] =
        useState<Date>(
            () => new Date()
        );

    const [tickets, setTickets] =
        useState<MuseumTourSessionResponse[]>([]);

    const [isLoading, setIsLoading] =
        useState<boolean>(false);

    const [error, setError] =
        useState<boolean>(false);

    useEffect(() => {

        let isMounted = true;

        async function fetchTickets() {

            setIsLoading(true);
            setError(false);

            const year =
                selectedDate.getFullYear();

            const month =
                String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    selectedDate.getDate()
                ).padStart(2, "0");

            const date =
                `${year}-${month}-${day}`;

            try {

                const response =
                    await getMuseumTour(
                        date,
                        locale
                    );

                if (!isMounted) return;

                if (!response.success) {

                    setTickets([]);
                    setError(true);

                    return;
                }

                setTickets(
                    response.data ?? []
                );

            } catch {

                if (!isMounted) return;

                setTickets([]);
                setError(true);

            } finally {

                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchTickets();

        return () => {
            isMounted = false;
        };

    }, [selectedDate, locale]);

    return (
        <div className="fcol gap-6">

            {/* Day Of The Weeks Header */}
            <div>
                <h3 className="text-xl">
                    {
                        DayOFTheWeeksT("title")
                    }
                </h3>
            </div>

            {/* Day Of The Weeks */}
            <div className="w-full overflow-y-hidden overflow-x-auto py-5 xl:overflow-x-visible">

                <StaggerWrapper
                    once
                    variants={
                        dayOfTheWeeksContainerVariant
                    }
                    className="grid grid-cols-7 gap-3 min-w-[1000px] xl:min-w-0 py-2"
                >
                    <DayOfWeekBox
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                    />
                </StaggerWrapper>

            </div>

            {/* Tickets */}
            <div className="grid grid-cols-12 md:gap-10 gap-y-10 xl:px-20 min-h-[50vh]">

                {isLoading && (

                    <div className="col-span-12 fcc py-10">
                        <Loading
                            className="w-full h-[50vh]"
                            size={50}
                        />
                    </div>

                )}

                {!isLoading && error && (

                    <div className="col-span-12 fcc py-10">
                        <span>
                            Failed to load tickets.
                        </span>
                    </div>

                )}

                {!isLoading &&
                    !error &&
                    tickets.length === 0 && (

                        <div className="col-span-12 fcc py-10">
                            <span>
                                No tickets available for this day.
                            </span>
                        </div>
                    )}

                {!isLoading &&
                    !error &&
                    tickets.map((ticket) => (

                        <MuseumsTourTicketBox
                            key={ticket.sessionId}
                            ticket={ticket}
                        />

                    ))}

            </div>

        </div>
    );
}

export default MuseumsTourTickets;