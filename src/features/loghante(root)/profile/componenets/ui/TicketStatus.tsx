import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

interface ITicketStatus {
    status: "upcoming" | "progress" | "past"
}

function TicketStatus({
    status,
}: ITicketStatus) {

    const ticketStatusT = useTranslations(
        "profileTicketPurchased.ticket-status",
    )

    function getStatusColor(): string {

        if (status === "upcoming") {
            return cn(
                "text-gold-utility",
                "border-gold-utility/30",
                "bg-gold-utility/10",
            )
        }

        if (status === "progress") {
            return cn(
                "text-[#527A8A]",
                "border-[#527A8A]/30",
                "bg-[#527A8A]/10",
            )
        }

        if (status === "past") {
            return cn(
                "text-crimson",
                "border-crimson/30",
                "bg-crimson/10",
            )
        }

        return ""
    }

    function getStatusText(): string {

        if (status === "upcoming") {
            return ticketStatusT("upcoming")
        }

        if (status === "progress") {
            return ticketStatusT("progress")
        }

        if (status === "past") {
            return ticketStatusT("past")
        }

        return ""
    }

    return (
        <span
            className={cn(
                "fcc",
                "gap-2",
                "px-3",
                "py-2",
                "rounded-full",
                "border",
                "text-xs",
                "font-semibold",
                "whitespace-nowrap",
                getStatusColor(),
            )}
        >

            {/* Status Dot */}
            <span
                className={cn(
                    "size-1.5",
                    "rounded-full",
                    status === "upcoming" &&
                    "bg-gold-utility",
                    status === "progress" &&
                    "bg-[#527A8A]",
                    status === "past" &&
                    "bg-crimson",
                )}
            />

            {getStatusText()}

        </span>
    )
}

export default TicketStatus
