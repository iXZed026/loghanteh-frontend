'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

import type { BookingPDFData } from '../types/booking-pdf.types'
import BookingTicketPDF, {
  type BookingPDFTranslations,
} from './BookingTicketPDF'

const QR_CODE_URL = 'https://next-mart-shop.vercel.app/'

export default function BookingPDFDownloadClient({
  booking,
}: {
  booking: BookingPDFData
}) {
  const t = useTranslations('pdfBooking')

  const [qrCode, setQrCode] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    QRCode.toDataURL(QR_CODE_URL, {
      width: 200,
      margin: 0,
      errorCorrectionLevel: 'M',
    }).then((dataUrl) => {
      if (mounted) {
        setQrCode(dataUrl)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const translations: BookingPDFTranslations = {
    title: t('title'),
    subtitle: t('subtitle'),
    bookingInformation: t('bookingInformation'),
    bookingId: t('bookingId'),
    sessionId: t('sessionId'),
    event: t('event'),
    eventType: t('eventType'),
    dateTime: t('dateTime'),
    duration: t('duration'),
    minutes: t('minutes'),
    hall: t('hall'),
    quantity: t('quantity'),
    description: t('description'),
    reservedSeats: t('reservedSeats'),
    row: t('row'),
    seat: t('seat'),
    status: t('status'),
    paymentSummary: t('paymentSummary'),
    unitPrice: t('unitPrice'),
    ticketQuantity: t('ticketQuantity'),
    totalPrice: t('totalPrice'),
    footer: t('footer'),
    footerNote: t('footerNote'),
    download: t('download'),
    generating: t('generating'),
    error: t('error'),
  }

  if (!qrCode) {
    return (
      <button
        type="button"
        disabled
        className="click-scale inline-flex items-center justify-center gap-2 rounded-lg bg-gray-300 px-5 py-3 text-sm font-medium text-gray-600"
      >
        {t('generating')}
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <BookingTicketPDF
          booking={booking}
          translations={translations}
          qrCode={qrCode}
        />
      }
      fileName={`loghanteh-booking-${booking.bookingId}.pdf`}
      className="click-scale inline-flex items-center justify-center gap-2 rounded-lg bg-gold-utility px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#806338]"
    >
      {({ loading, error }) => (
        <span>
          {error
            ? t('error')
            : loading
              ? t('generating')
              : t('download')}
        </span>
      )}
    </PDFDownloadLink>
  )
}