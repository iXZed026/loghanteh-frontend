import StaggerWrapper from "@/components/animations/StaggerWrapper";

import {
    dayOfTheWeeksContainerVariant,
} from "@/features/loghante(root)/animations/loghante.variants";

import { getCinemaAndTheaterTickets } from "@/lib/api/ticket/cinema-and-theater";

import CinemaAndTheaterTicketBox from "./CinemaAndTheaterTicketBox";

import type {
    CinemaAndTheaterType,
} from "./data/cinema-and-theater-tabs";

import { getTranslations } from "next-intl/server";

interface Props {
    type: CinemaAndTheaterType;
    date: string;
    locale: string;
}

async function CinemaAndTheaterTicketsWrapper({
    type,
    date,
    locale,
}: Props) {
    const t = await getTranslations({
        locale,
        namespace: "cinemaAndTheater.ticket-box",
    });

    const response = await getCinemaAndTheaterTickets(
        type,
        date,
        locale,
    );

    const tickets = response.data;

    if (tickets.length === 0) {
        return (
            <div className="min-h-[50vh] py-16 text-center">
                <p className="text-lg text-[var(--black-light-color)]">
                    {t("not-today")}
                </p>
            </div>
        );
    }

    return (
        <StaggerWrapper
            once
            variants={dayOfTheWeeksContainerVariant}
            className="grid grid-cols-12 gap-6"
        >
            {tickets.map((ticket) => (
                <CinemaAndTheaterTicketBox
                    key={ticket.sessionId}
                    event={ticket}
                />
            ))}
        </StaggerWrapper>
    );
}

export default CinemaAndTheaterTicketsWrapper;