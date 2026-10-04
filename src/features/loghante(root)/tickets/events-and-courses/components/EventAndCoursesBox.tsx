import FadeUp from '@/components/animations/FadeUp'
import AppLink from '@/components/ui/AppLink'
import {
    eventsAndCoursesVariant,
} from '@/features/loghante(root)/animations/loghante.variants'
import {
    fastTransitionOut,
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { EventSession } from '@/lib/api/ticket/events-and-courses'
import { useTranslations } from 'next-intl'

interface IEventAndCoursesBox {
    event: EventSession
}

function EventAndCoursesBox({
    event,
}: IEventAndCoursesBox) {

    const T =
        useTranslations("eventsAndCourses.box")

    const isPaid = event.price > 0
    return (
        <AppLink
            className="md:col-span-4 sm:col-span-6 col-span-12"
            href={`/events-and-courses/${event.sessionId}?type=${event.eventId === 2 ? "events" : "courses"}`}
        >
            <FadeUp
                transition={fastTransitionOut}
                variants={eventsAndCoursesVariant}
                once
                className={cn(
                    "relative",
                    "rounded-lg",
                    "sm:h-80 h-95",
                    "bg-black-light-utility",
                    "cursor-pointer",
                    "hover:scale-97",
                    "transition-all duration-300",
                )}
            >
                {/* Price status */}
                <div
                    className={cn(
                        "absolute top-3 rounded-r-xl",
                        "px-5 py-1.5",
                        isPaid
                            ? "hidden"
                            :
                            "bg-crimson text-white-utility",
                        "font-semibold",
                    )}
                >
                    {T("price-status.free")}
                </div>

                {/* Event information */}
                <div
                    className={cn(
                        "absolute bottom-0 rounded-r-xl",
                        "px-5 py-4",
                        "font-semi-bold",
                    )}
                >
                    <span
                        className={cn(
                            "text-white-utility",
                            "text-sm",
                            "font-semibold",
                        )}
                    >
                        {event.name}
                    </span>
                </div>
            </FadeUp>
        </AppLink>
    )
}

export default EventAndCoursesBox