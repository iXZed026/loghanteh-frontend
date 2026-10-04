import Container from "@/components/shared/Container";

import TicketHeaderBox from "@/features/loghante(root)/components/TicketHeaderBox";

import CinemaAndTheaterContent from "@/features/loghante(root)/tickets/cinema-and-theater/components/CinemaAndTheaterContent";

import { getTranslations } from "next-intl/server";

interface CinemaAndTheaterPageProps {
    searchParams: Promise<{
        type?: string;
        date?: string;
    }>;
}

async function CinemaAndTheaterPage({
    searchParams,
}: CinemaAndTheaterPageProps) {

    const params =
        await searchParams;

    const t =
        await getTranslations(
            "cinemaAndTheater.header"
        );

    return (
        <Container>
            <div className="py-30 xl:px-36">

                <div className="mb-15">
                    <TicketHeaderBox
                        title={t("title")}
                        description={t("description")}
                        image="/images/loghanteh-cafe.jpg"
                        imageAlt="image not found"
                    />
                </div>

                <CinemaAndTheaterContent
                    typeParam={params.type}
                    dateParam={params.date}
                />

            </div>
        </Container>
    );
}

export default CinemaAndTheaterPage;