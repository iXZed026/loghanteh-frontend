import Container from "@/components/shared/Container";
import TicketHeaderBox from "@/features/loghante(root)/components/TicketHeaderBox";
import MuseumsTourTickets from "@/features/loghante(root)/tickets/museums-tour/components/tickets/MuseumsTourTickets";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale, useTranslations } from "next-intl";

function MuseumsTour() {

  const t = useTranslations("museumsTour.header");
  const locale = useLocale();

  return (
    <Container>
      <div className="xl:px-36 py-30">

        {/* Header */}
        <div className="mb-15">
          <TicketHeaderBox
            title={t("title")}
            description={t("description")}
            image="/images/loghanteh-cafe.jpg"
            imageAlt={"image not found"}
          />
        </div>

        {/* Tickets */}
        <MuseumsTourTickets />

      </div>
    </Container>
  );
}

export default MuseumsTour;