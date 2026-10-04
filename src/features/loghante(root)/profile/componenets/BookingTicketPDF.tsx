import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import type { BookingPDFData } from '../types/booking-pdf.types'

Font.register({
  family: 'Vazirmatn',
  src: '/fonts/persian/vazirmatn/Vazirmatn-Regular.ttf',
})

export interface BookingPDFTranslations {
  title: string
  subtitle: string
  bookingInformation: string
  bookingId: string
  sessionId: string
  event: string
  eventType: string
  dateTime: string
  duration: string
  minutes: string
  hall: string
  quantity: string
  description: string
  reservedSeats: string
  row: string
  seat: string
  status: string
  paymentSummary: string
  unitPrice: string
  ticketQuantity: string
  totalPrice: string
  footer: string
  footerNote: string
  download: string
  generating: string
  error: string
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: '#F5F3EF',
    fontFamily: 'Vazirmatn',
    color: '#242424',
  },

  header: {
    backgroundColor: '#5c2127',
    padding: 18,
    borderRadius: 8,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerContent: {
    flex: 1,
    paddingRight: 15,
  },

  brand: {
    color: '#D6B477',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 7,
    fontFamily: 'Helvetica',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'Vazirmatn',
  },

  subtitle: {
    color: '#D0D0D0',
    fontSize: 8,
    lineHeight: 1.4,
    fontFamily: 'Vazirmatn',
  },

  qrWrapper: {
    width: 74,
    height: 74,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },

  qrCode: {
    width: 64,
    height: 64,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 10,
    color: '#967541',
    marginBottom: 11,
    fontFamily: 'Vazirmatn',
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  infoItem: {
    width: '50%',
    paddingRight: 8,
    marginBottom: 11,
  },

  label: {
    fontSize: 7.5,
    color: '#858585',
    marginBottom: 4,
    fontFamily: 'Vazirmatn',
  },

  value: {
    fontSize: 9,
    color: '#252525',
    fontFamily: 'Vazirmatn',
  },

  description: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#626262',
    fontFamily: 'Vazirmatn',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAE7E0',
    marginVertical: 10,
  },

  seatHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F3EF',
    padding: 7,
    borderRadius: 4,
  },

  seatRow: {
    flexDirection: 'row',
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  seatCell: {
    flex: 1,
    fontSize: 8.5,
    color: '#333333',
    fontFamily: 'Vazirmatn',
  },

  seatHeaderText: {
    flex: 1,
    fontSize: 7.5,
    color: '#686868',
    fontFamily: 'Vazirmatn',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 9,
    color: '#686868',
    fontFamily: 'Vazirmatn',
  },

  totalValue: {
    fontSize: 15,
    color: '#967541',
    fontFamily: 'Vazirmatn',
  },

  footer: {
    textAlign: 'center',
    fontSize: 7.5,
    lineHeight: 1.5,
    color: '#858585',
    marginTop: 2,
    fontFamily: 'Vazirmatn',
  },
})

function formatDate(date?: string) {
  if (!date) {
    return '-'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(parsedDate)
}

function formatPrice(value: number | string) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) {
    return String(value)
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(amount)
}

function InfoItem({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default function BookingTicketPDF({
  booking,
  translations,
  qrCode,
}: {
  booking: BookingPDFData
  translations: BookingPDFTranslations
  qrCode: string
}) {
  const seats = booking.seats ?? []

  return (
    <Document
      title={`Loghanteh Booking ${booking.bookingId}`}
      author="Loghanteh"
      subject={translations.title}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.brand}>LOGHANTEH</Text>

            <Text style={styles.title}>
              {translations.title}
            </Text>

            <Text style={styles.subtitle}>
              {translations.subtitle}
            </Text>
          </View>

          <View style={styles.qrWrapper}>
            <Image
              src={qrCode}
              style={styles.qrCode}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {translations.bookingInformation}
          </Text>

          <View style={styles.infoGrid}>
            <InfoItem
              label={translations.bookingId}
              value={booking.bookingId}
            />

            <InfoItem
              label={translations.sessionId}
              value={booking.sessionId ?? '-'}
            />

            <InfoItem
              label={translations.event}
              value={booking.name}
            />

            <InfoItem
              label={translations.eventType}
              value={booking.eventTypeName ?? '-'}
            />

            <InfoItem
              label={translations.dateTime}
              value={formatDate(booking.startAt)}
            />

            <InfoItem
              label={translations.duration}
              value={
                booking.duration != null
                  ? `${booking.duration} ${translations.minutes}`
                  : '-'
              }
            />

            <InfoItem
              label={translations.hall}
              value={booking.hallName ?? '-'}
            />

            <InfoItem
              label={translations.quantity}
              value={booking.quantity}
            />
          </View>

          {booking.description ? (
            <>
              <View style={styles.divider} />

              <Text style={styles.label}>
                {translations.description}
              </Text>

              <Text style={styles.description}>
                {booking.description}
              </Text>
            </>
          ) : null}
        </View>

        {seats.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              {translations.reservedSeats}
            </Text>

            <View style={styles.seatHeader}>
              <Text style={styles.seatHeaderText}>
                {translations.row}
              </Text>

              <Text style={styles.seatHeaderText}>
                {translations.seat}
              </Text>

              <Text style={styles.seatHeaderText}>
                {translations.status}
              </Text>
            </View>

            {seats.map((seat) => (
              <View
                key={seat.seatId}
                style={styles.seatRow}
              >
                <Text style={styles.seatCell}>
                  {seat.rowLabel}
                </Text>

                <Text style={styles.seatCell}>
                  {seat.seatNumber}
                </Text>

                <Text style={styles.seatCell}>
                  {seat.status}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {translations.paymentSummary}
          </Text>

          <View style={styles.infoGrid}>
            <InfoItem
              label={translations.unitPrice}
              value={formatPrice(booking.price)}
            />

            <InfoItem
              label={translations.ticketQuantity}
              value={booking.quantity}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              {translations.totalPrice}
            </Text>

            <Text style={styles.totalValue}>
              {formatPrice(booking.totalPrice)}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          {translations.footer}
          {'\n'}
          {translations.footerNote}
        </Text>
      </Page>
    </Document>
  )
}