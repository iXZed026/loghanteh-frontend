"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { TranslationFunction } from "@/types/translations"
import { getUserBookings } from "@/lib/api/ticket/booking"
import { GoBookmark } from "react-icons/go"
import { IoIosStar } from "react-icons/io"
import { LuTicketSlash } from "react-icons/lu"
import Skeleton from "@/components/ui/Skeleton"

interface IProfileDashboardActivity {
  dashboardPageT: TranslationFunction
}

function ProfileDashboardActivity({
  dashboardPageT,
}: IProfileDashboardActivity) {
  const locale = useLocale()

  const [ticketCount, setTicketCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchTicketCount() {
      try {
        setIsLoading(true)

        const response = await getUserBookings(locale)

        if (!response.success || !Array.isArray(response.data)) {
          return
        }

        const totalTickets = response.data.reduce(
          (total, booking) => total + (booking.quantity || 0),
          0,
        )

        if (isMounted) {
          setTicketCount(totalTickets)
        }
      } catch (error) {
        console.error("Failed to fetch user ticket count:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchTicketCount()

    return () => {
      isMounted = false
    }
  }, [locale])

  return (
    <div className="grid grid-cols-12 gap-5 xl:gap-10">
      {/* Upcoming Visit */}
      <div
        className={cn(
          "col-span-12 xl:col-span-4",
          "fcc rounded-lg border border-[var(--crimson-opacity-color)]",
          "px-5 py-5",
        )}
      >
        <div className="fcc w-full">
          <div className="rounded-full bg-[#d2af6d4f] p-4">
            <IoIosStar className="size-8 text-[var(--black-light-color)]" />
          </div>
        </div>

        <div className="fcol w-full gap-2 text-sm">
          <span>{dashboardPageT("activity.friendly-club.tier")}</span>

          <span className="text-xl font-semibold text-[var(--black-light-color)]">
            Silver
          </span>

          <span>{dashboardPageT("activity.friendly-club.points")}</span>
        </div>
      </div>

      {/* Tickets */}
      <div
        className={cn(
          "col-span-12 xl:col-span-4",
          "fcc rounded-lg border border-[var(--crimson-opacity-color)]",
          "px-5 py-5",
        )}
      >
        <div className="fcc w-full">
          <div className="rounded-full bg-[#d2af6d4f] p-4">
            <LuTicketSlash className="size-8 text-[var(--gold-color)]" />
          </div>
        </div>

        <div className="fcol w-full gap-2 text-sm">
          <span>{dashboardPageT("activity.tickets.title")}</span>

          {isLoading ? (
            <Skeleton
              backgroundClassName="bg-[var(--gold-opacity-color)]"
              className="h-7 w-20 rounded-md"
            />
          ) : (
            <span
              className="text-xl font-semibold text-crimson"
              aria-live="polite"
            >
              {ticketCount.toLocaleString(locale)}
            </span>
          )}

          <span>{dashboardPageT("activity.tickets.purchased")}</span>
        </div>
      </div>

      {/* Collections */}
      <div
        className={cn(
          "col-span-12 xl:col-span-4",
          "fcc rounded-lg border border-[var(--crimson-opacity-color)]",
          "px-5 py-5",
        )}
      >
        <div className="fcc w-full">
          <div className="rounded-full bg-[#d2af6d4f] p-4">
            <GoBookmark className="size-8 text-[var(--gold-color)]" />
          </div>
        </div>

        <div className="fcol w-full gap-2 text-sm">
          <span>{dashboardPageT("activity.collections.title")}</span>

          <span className="text-xl font-semibold text-crimson">
            8
          </span>

          <span>{dashboardPageT("activity.collections.saved")}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDashboardActivity
