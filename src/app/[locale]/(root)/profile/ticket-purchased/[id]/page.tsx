import TicketPurchasedDetailComponent from '@/features/loghante(root)/profile/componenets/ticket-purchased/ticket-purchage-details/componenets/TicketPurchasedDetailComponent'

interface TicketDetailsPageProps {
  params: Promise<{
    id: string
    locale: string
  }>
}

export default async function TicketDetailsPage({
  params,
}: TicketDetailsPageProps) {
  const { id, locale } = await params

  const bookingId = Number(id)

  return (
    <TicketPurchasedDetailComponent
      bookingId={bookingId}
      locale={locale}
    />
  )
}