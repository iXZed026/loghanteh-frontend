import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import AppLink from '@/components/ui/AppLink'
import {
    eventsAndCoursesVariant,
} from '@/features/loghante(root)/animations/loghante.variants'
import {
    fastTransitionOut,
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { EventSession } from '@/lib/api/ticket/events-and-courses'
import { useLocale, useTranslations } from 'next-intl'

interface IEventAndCoursesBox {
    event: EventSession
}

function EventAndCoursesBox({
    event,
}: IEventAndCoursesBox) {
    const t = useTranslations('eventsAndCourses.box')
    const locale = useLocale()

    const isPaid = event.price > 0

    const imageURL =
        event.images?.[0]?.imageUrl ||
        '/images/loghanteh-cafe.jpg'

    return (
        <AppLink
            className="group block col-span-12 sm:col-span-6 md:col-span-4"
            href={`/events-and-courses/${event.sessionId}?type=${event.eventId === 2 ? 'events' : 'courses'}`}
        >
            <FadeUp
                transition={fastTransitionOut}
                variants={eventsAndCoursesVariant}
                once
                className={cn(
                    'group relative isolate',
                    'h-[280px] overflow-hidden rounded-2xl',
                    'cursor-pointer bg-crimson',
                    'shadow-[0_12px_35px_rgba(22,22,22,0.12)]',
                    'sm:h-[320px] lg:h-[350px]',
                    'focus-visible:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-gold-utility',
                    'focus-visible:ring-offset-4',
                )}
            >
                {/* Background image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <AppImage
                        src={imageURL}
                        alt={event.name}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className={cn(
                            'object-cover',
                            'scale-100',
                            'transition-transform duration-700 ease-out',
                            'motion-safe:group-hover:scale-110',
                        )}
                    />
                </div>

                {/* Image overlay */}
                <div
                    className={cn(
                        'pointer-events-none absolute inset-0 z-[1]',
                        'bg-gradient-to-t',
                        'from-black/90 via-black/30 to-black/10',
                        'transition-colors duration-500',
                        'group-hover:from-black/95',
                    )}
                />

                {/* Top badges */}
                <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
                    <span
                        className={cn(
                            'inline-flex items-center gap-2',
                            'rounded-full border border-white/20',
                            'bg-black/35 px-3 py-1.5',
                            'text-xs font-medium text-white',
                            'backdrop-blur-md',
                        )}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-utility" />
                        {event.eventId === 2
                            ? t('type.event')
                            : t('type.course')}
                    </span>

                    {!isPaid && (
                        <span
                            className={cn(
                                'rounded-full bg-crimson',
                                'px-3 py-1.5',
                                'text-xs font-semibold text-white',
                                'shadow-lg',
                            )}
                        >
                            {t('price-status.free')}
                        </span>
                    )}
                </div>

                {/* Bottom information */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                    <div
                        className={cn(
                            'mb-3 h-px w-9 bg-gold-utility',
                            'transition-all duration-500',
                            'group-hover:w-16',
                        )}
                    />

                    <h3
                        className={cn(
                            'line-clamp-2',
                            'font-wulkan text-xl leading-relaxed text-white',
                            'sm:text-2xl',
                        )}
                    >
                        {event.name}
                    </h3>

                    <div
                        className={cn(
                            'mt-3 flex items-center justify-between gap-3',
                            'border-t border-white/20 pt-3',
                        )}
                    >
                        <span className="text-xs text-white/75 sm:text-sm">
                            {locale === 'fa'
                                ? 'برای اطلاعات بیشتر'
                                : 'Discover more'}
                        </span>

                        <span
                            className={cn(
                                'flex h-9 w-9 shrink-0 items-center justify-center',
                                'rounded-full border border-white/30',
                                'text-white transition-colors duration-300',
                                'group-hover:border-gold-utility',
                                'group-hover:bg-gold-utility',
                                'group-hover:text-crimson',
                            )}
                            aria-hidden="true"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={cn(
                                    'h-4 w-4 transition-transform duration-300',
                                    locale === 'fa'
                                        ? 'group-hover:-translate-x-0.5'
                                        : 'group-hover:translate-x-0.5',
                                )}
                            >
                                <path
                                    d="M5 12h13M13 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Hover border */}
                <div
                    className={cn(
                        'pointer-events-none absolute inset-0 z-20',
                        'rounded-2xl border border-white/10',
                        'transition-colors duration-300',
                        'group-hover:border-gold-utility/50',
                    )}
                />
            </FadeUp>
        </AppLink>
    )
}

export default EventAndCoursesBox