
'use client'

import dynamic from 'next/dynamic'

import type { BookingPDFData } from '../types/booking-pdf.types'
import Button from '@/components/ui/Button'

const BookingPDFDownloadClient = dynamic(
  () => import('./BookingPDFDownloadClient'),
  {
    ssr: false,
    loading: () => (
      <Button
        type="button"
        disabled
        className="rounded-lg bg-gray-300 px-5 py-3 text-sm text-gray-600"
      >
        Preparing PDF...
      </Button>
    ),
  },
)

export default function BookingPDFDownload({
  booking,
}: {
  booking: BookingPDFData
}) {
  return <BookingPDFDownloadClient booking={booking} />
}