import { getLocale } from "next-intl/server";

import CinemaAndTheaterDate from "./CinemaAndTheaterDate";
import CinemaAndTheaterTab from "./CinemaAndTheaterTab";
import CinemaAndTheaterTicketsWrapper from "./CinemaAndTheaterTicketsWrapper";

interface CinemaAndTheaterContentProps {
    typeParam?: string;
    dateParam?: string;
}

async function CinemaAndTheaterContent({
    typeParam,
    dateParam,
}: CinemaAndTheaterContentProps) {

    const locale =
        await getLocale();

    const type =
        typeParam === "theater"
            ? "theater"
            : "cinema";

    const date =
        dateParam ??
        new Date()
            .toISOString()
            .slice(0, 10);

    return (
        <div className="fcol gap-8">
            <CinemaAndTheaterTab
                type={type}
            />

            <CinemaAndTheaterDate
                selectedDate={date}
            />

            <CinemaAndTheaterTicketsWrapper
                type={type}
                date={date}
                locale={locale}
            />
        </div>
    );
}

export default CinemaAndTheaterContent;