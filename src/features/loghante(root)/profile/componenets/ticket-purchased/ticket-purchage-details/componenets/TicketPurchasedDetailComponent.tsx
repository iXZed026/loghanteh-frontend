'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import QRCode from 'react-qr-code'

import Loading from '@/components/ui/Loading'
import BookingPDFDownload from '@/features/loghante(root)/profile/componenets/BookingPDFDownload'
import TIcketPurchasedDetailsHeader from '@/features/loghante(root)/profile/componenets/ticket-purchased/ticket-purchage-details/componenets/TIcketPurchasedDetailsHeader'
import type {
  UserReservedSession,
} from '@/lib/api/ticket/booking'
import { getUserReservedSession } from '@/lib/api/ticket/booking'
import FadeIn from '@/components/animations/FadeIn'

interface TicketPurchasedDetailComponentProps {
  bookingId: number
  locale: string
}

function TicketPurchasedDetailComponent({
  bookingId,
  locale,
}: TicketPurchasedDetailComponentProps) {
  const t = useTranslations('ticketPurchasedDetails')

  const [ticket, setTicket] = useState<UserReservedSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!Number.isInteger(bookingId)) {
      setError(t('states.invalidTicketId'))
      setIsLoading(false)
      return
    }

    let isMounted = true

    async function fetchTicket() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await getUserReservedSession(
          bookingId,
          locale,
        )

        if (!isMounted) {
          return
        }

        if (!response.success || !response.data) {
          setError(
            response.message ||
            t('states.loadFailed'),
          )

          return
        }

        setTicket(response.data)
      } catch {
        if (!isMounted) {
          return
        }

        setError(t('states.loadError'))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchTicket()

    return () => {
      isMounted = false
    }
  }, [bookingId, locale, t])

  const formattedDate = useMemo(() => {
    if (!ticket?.startAt) {
      return '-'
    }

    const date = new Date(ticket.startAt)

    if (Number.isNaN(date.getTime())) {
      return '-'
    }

    return date.toLocaleDateString(
      locale === 'fa' ? 'fa-IR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    )
  }, [ticket?.startAt, locale])

  const formattedTime = useMemo(() => {
    if (!ticket?.startAt) {
      return '-'
    }

    const date = new Date(ticket.startAt)

    if (Number.isNaN(date.getTime())) {
      return '-'
    }

    return date.toLocaleTimeString(
      locale === 'fa' ? 'fa-IR' : 'en-US',
      {
        hour: '2-digit',
        minute: '2-digit',
      },
    )
  }, [ticket?.startAt, locale])

  const formattedPrice = useMemo(() => {
    if (!ticket) {
      return '0'
    }

    const totalPrice = Number(ticket.totalPrice)

    if (!Number.isFinite(totalPrice)) {
      return '0'
    }

    return totalPrice.toLocaleString(
      locale === 'fa' ? 'fa-IR' : 'en-US',
    )
  }, [ticket, locale])

  const groupedSeats = useMemo(() => {
    if (!ticket?.seats?.length) {
      return []
    }

    const groups = new Map<
      string,
      UserReservedSession['seats']
    >()

    for (const seat of ticket.seats) {
      const rowSeats = groups.get(seat.rowLabel) ?? []

      rowSeats.push(seat)
      groups.set(seat.rowLabel, rowSeats)
    }

    return Array.from(groups.entries())
      .map(([rowLabel, seats]) => ({
        rowLabel,
        seats: [...seats].sort(
          (a, b) => a.seatNumber - b.seatNumber,
        ),
      }))
      .sort((a, b) => {
        const rowA = Number(a.rowLabel)
        const rowB = Number(b.rowLabel)

        if (
          Number.isFinite(rowA) &&
          Number.isFinite(rowB)
        ) {
          return rowA - rowB
        }

        return a.rowLabel.localeCompare(b.rowLabel)
      })
  }, [ticket?.seats])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <TIcketPurchasedDetailsHeader />

          <div className="fcc min-h-[60vh]">
            <Loading
              size={55}
              className="w-full"
            />
          </div>
        </div>
      </main>
    )
  }

  if (error || !ticket) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <TIcketPurchasedDetailsHeader />

          <div className="fcc min-h-[50vh] px-5">
            <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-red-600">
                {error || t('states.loadFailed')}
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const hasSeats = groupedSeats.length > 0

  return (
    <FadeIn>
      <main className="min-h-screen py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <TIcketPurchasedDetailsHeader />

          <article className="overflow-hidden shadow-xl shadow-black/25 rounded-3xl border border-black/5 bg-white shadow-[0_15px_50px_rgba(92,33,39,0.08)]">

            {/* Ticket Header */}
            <div className="relative overflow-hidden bg-crimson px-6 py-7 text-white sm:px-8">
              <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/5" />

              <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-gold-opacity" />

              <div className="relative">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wider text-white/80">
                    {t('ticket.digitalTicket')}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-gold-utility" />

                  {ticket.eventTypeName && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                      {ticket.eventTypeName}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  {ticket.name}
                </h2>

                {ticket.description && (
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                    {ticket.description}
                  </p>
                )}
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 sm:p-8">

              {/* Main Information */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <span className="text-xs text-black-light-utility">
                    {t('ticket.date')}
                  </span>

                  <p className="mt-2 font-semibold text-black-utility">
                    {formattedDate}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <span className="text-xs text-black-light-utility">
                    {t('ticket.time')}
                  </span>

                  <p className="mt-2 font-semibold text-black-utility">
                    {formattedTime}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <span className="text-xs text-black-light-utility">
                    {t('ticket.duration')}
                  </span>

                  <p className="mt-2 font-semibold text-black-utility">
                    {ticket.duration}{' '}
                    {t('ticket.minutes')}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <span className="text-xs text-black-light-utility">
                    {t('ticket.tickets')}
                  </span>

                  <p className="mt-2 font-semibold text-black-utility">
                    {ticket.quantity}
                  </p>
                </div>
              </div>

              {/* Event Information */}
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-black-utility">
                    {t('ticket.eventInformation')}
                  </h3>

                  <span className="ml-4 h-px flex-1 bg-black/5" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-black/5 p-4">
                    <span className="text-xs text-black-light-utility">
                      {t('ticket.event')}
                    </span>

                    <p className="mt-1 font-semibold text-black-utility">
                      {ticket.name}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/5 p-4">
                    <span className="text-xs text-black-light-utility">
                      {t('ticket.type')}
                    </span>

                    <p className="mt-1 font-semibold text-black-utility">
                      {ticket.eventTypeName || '-'}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/5 p-4">
                    <span className="text-xs text-black-light-utility">
                      {t('ticket.hall')}
                    </span>

                    <p className="mt-1 font-semibold text-black-utility">
                      {ticket.hallName || '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seats */}
              {hasSeats ? (
                <div className="mt-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-black-utility">
                      {t('ticket.reservedSeats')}
                    </h3>

                    <span className="rounded-full bg-gold-opacity px-3 py-1 text-xs font-semibold text-crimson">
                      {ticket.seats.length}{' '}
                      {t('ticket.seatCount')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {groupedSeats.map((group) => (
                      <div
                        key={group.rowLabel}
                        className="flex items-center gap-4 rounded-2xl border border-black/5 bg-[#faf8f5] px-4 py-3"
                      >
                        <div className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-black/10 pr-4">
                          <span className="text-[11px] font-medium uppercase tracking-wide text-black-light-utility">
                            {t('ticket.row')}
                          </span>

                          <span className="mt-1 text-base font-bold text-crimson">
                            {group.rowLabel}
                          </span>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
                          {group.seats.map((seat) => (
                            <span
                              key={seat.seatId}
                              className="fcc h-9 min-w-9 rounded-lg border border-gold-opacity bg-white px-2.5 text-sm font-bold text-crimson"
                            >
                              {seat.seatNumber}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-black/10 bg-[#faf8f5] p-5">
                  <div className="flex items-center gap-4">
                    <div className="fcc h-11 w-11 shrink-0 rounded-full bg-gold-opacity">
                      <span className="text-lg text-gold-utility">
                        ✓
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-black-utility">
                        {t('ticket.generalAdmission')}
                      </p>

                      <p className="mt-1 text-sm text-black-light-utility">
                        {t('ticket.noAssignedSeats')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="relative my-8">
                <div className="border-t border-dashed border-black/15" />

                <span className="absolute -left-10 -top-3 h-6 w-6 rounded-full bg-[#faf8f5] sm:-left-11" />

                <span className="absolute -right-10 -top-3 h-6 w-6 rounded-full bg-[#faf8f5] sm:-right-11" />
              </div>

              {/* Bottom */}
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                    <div>
                      <span className="text-xs text-black-light-utility">
                        {t('ticket.tickets')}
                      </span>

                      <p className="mt-1 text-sm font-semibold text-black-utility">
                        {ticket.quantity}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-black-light-utility">
                        {t('ticket.hall')}
                      </span>

                      <p className="mt-1 text-sm font-semibold text-black-utility">
                        {ticket.hallName || '-'}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-black-light-utility">
                        {t('ticket.price')}
                      </span>

                      <p className="mt-1 font-bold text-crimson">
                        {formattedPrice}{' '}
                        <span className="text-xs font-normal">
                          {t('ticket.currency')}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-crimson px-4 py-3">
                    <p className="text-xs leading-5 text-white/70">
                      {t('ticket.entryMessage')}
                    </p>
                  </div>
                </div>

                {/* QR */}
                <div className="fcc flex-col">
                  <div className="relative rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
                    <div className="rounded-lg bg-white p-1">
                      <QRCode
                        value={ticket.ticketToken}
                        size={136}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                      />
                    </div>

                    <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-gold-utility" />

                    <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-crimson" />
                  </div>

                  <p className="mt-3 text-center text-xs text-black-light-utility">
                    {t('ticket.scanTicket')}
                  </p>
                </div>

                {/* PDF */}
                <div className="md:col-span-2">
                  <BookingPDFDownload
                    booking={ticket}
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </FadeIn>
  )
}

export default TicketPurchasedDetailComponent