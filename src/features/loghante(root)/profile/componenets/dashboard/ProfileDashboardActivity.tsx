"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { GoBookmark } from "react-icons/go"
import { IoIosStar } from "react-icons/io"
import { LuTicketSlash } from "react-icons/lu"

import Skeleton from "@/components/ui/Skeleton"
import { useProfile } from "@/contexts/ProfileProvider"
import { getUserBookings } from "@/lib/api/ticket/booking"
import { cn } from "@/lib/utils/cn"
import type { TranslationFunction } from "@/types/translations"

interface IProfileDashboardActivity {
  dashboardPageT: TranslationFunction
}

type FriendlyClubTier = "bronze" | "silver" | "gold" | "vip"

const FRIENDLY_CLUB_STYLES: Record<
  FriendlyClubTier,
  {
    iconBackground: string
    iconColor: string
    textColor: string
    borderColor: string
  }
> = {
  bronze: {
    iconBackground: "bg-[#CD7F32]/15",
    iconColor: "text-[#CD7F32]",
    textColor: "text-[#CD7F32]",
    borderColor: "border-[#CD7F32]/40",
  },
  silver: {
    iconBackground: "bg-[#d2af6d4f]",
    iconColor: "text-[var(--black-light-color)]",
    textColor: "text-[var(--black-light-color)]",
    borderColor: "border-[var(--crimson-opacity-color)]",
  },
  gold: {
    iconBackground: "bg-[var(--gold-color)]/15",
    iconColor: "text-[var(--gold-color)]",
    textColor: "text-[var(--gold-color)]",
    borderColor: "border-[var(--gold-color)]/40",
  },
  vip: {
    iconBackground: "bg-[#7C3AED]/15",
    iconColor: "text-[#7C3AED]",
    textColor: "text-[#7C3AED]",
    borderColor: "border-[#7C3AED]/40",
  },
}

function getFriendlyClubTier(
  userTypeName?: string | null,
): FriendlyClubTier {
  const normalizedType = userTypeName?.trim().toLowerCase()

  switch (normalizedType) {
    case "bronze":
      return "bronze"
    case "silver":
      return "silver"
    case "gold":
      return "gold"
    case "vip":
      return "vip"
    default:
      return "silver"
  }
}

function ProfileDashboardActivity({
  dashboardPageT,
}: IProfileDashboardActivity) {
  const locale = useLocale()
  const { profile } = useProfile()

  const [ticketCount, setTicketCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const friendlyClubTier = getFriendlyClubTier(
    profile?.userType?.name,
  )

  const friendlyClubStyles =
    FRIENDLY_CLUB_STYLES[friendlyClubTier]

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
      {/* Friendly Club */}
      <div
        className={cn(
          "col-span-12 xl:col-span-4",
          "fcc rounded-lg border",
          "px-5 py-5",
          friendlyClubStyles.borderColor,
        )}
      >
        <div className="fcc w-full">
          <div
            className={cn(
              "rounded-full p-4",
              friendlyClubStyles.iconBackground,
            )}
          >
            <IoIosStar
              className={cn(
                "size-8 transition-colors duration-300",
                friendlyClubStyles.iconColor,
              )}
            />
          </div>
        </div>

        <div className="fcol w-full gap-2 text-sm">
          <span>
            {dashboardPageT("activity.friendly-club.tier")}
          </span>

          <span
            className={cn(
              "text-xl font-semibold transition-colors duration-300",
              friendlyClubStyles.textColor,
            )}
          >
            {profile?.userType?.name ?? "Silver"}
          </span>

          <span>
            {dashboardPageT("activity.friendly-club.points")}
          </span>
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
