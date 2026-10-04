import FadeIn from '@/components/animations/FadeIn'
import FadeUp from '@/components/animations/FadeUp'
import {
    verySlowTransitionOut,
} from '@/lib/animations/transitions'
import {
    formatMonthYear,
} from '@/lib/utils/date'
import {
    EventAndCourseSessionDetail,
} from '@/lib/api/ticket/events-and-courses'
import {
    useLocale,
    useTranslations,
} from 'next-intl'
import { FaRegClock } from 'react-icons/fa6'

interface EventsAndCoursesDetailsAboutProps {
    event: EventAndCourseSessionDetail
}

function EventsAndCoursesDetailsAbout({
    event,
}: EventsAndCoursesDetailsAboutProps) {

    const locale = useLocale()

    const eventsAndCoursesAboutT =
        useTranslations(
            "eventsAndCoursesDetails.about"
        )

    const publishDate =
        new Date(event.startAt)

    return (
        <div className="grid grid-cols-12 gap-5">

            <div className="lg:col-span-7 col-span-12">

                {/* About Header */}

                <div
                    className="fcol gap-5 py-10 border-t border-black-opacity"
                >
                    <div className="overflow-hidden">
                        <FadeIn
                            transition={
                                verySlowTransitionOut
                            }
                            once
                        >
                            <h4 className="text-2xl font-semibold">
                                {event.name}
                            </h4>
                        </FadeIn>
                    </div>

                    <FadeUp once>
                        <div className="flex gap-2">
                            <span>
                                <FaRegClock
                                    className="size-4 text-crimson"
                                />
                            </span>

                            <span className="text-black-light-utility">
                                {
                                    eventsAndCoursesAboutT(
                                        "publish"
                                    )
                                }{" "}
                                {
                                    formatMonthYear(
                                        publishDate,
                                        locale
                                    )
                                }
                            </span>
                        </div>
                    </FadeUp>
                </div>

                {/* Description */}

                <div
                    className={`
                        fcol gap-10
                        whitespace-pre-line
                        text-black-light-utility
                        leading-8
                        text-justify
                    `}
                >
                    <div className="overflow-hidden min-h-[30vh]">
                        <FadeUp
                            once
                            amount={0.2}
                        >
                            <p>
                                {event.description}
                            </p>
                        </FadeUp>
                    </div>

                    {/* About Image */}

                    <div className="overflow-hidden">
                        <FadeUp
                            once
                            transition={
                                verySlowTransitionOut
                            }
                        >
                            <div className="w-full h-100 bg-crimson rounded-xl">
                            </div>
                        </FadeUp>
                    </div>

                    {/* Duration */}

                    <div className="overflow-hidden">
                        <FadeIn
                            once
                            transition={
                                verySlowTransitionOut
                            }
                        >
                            <p>
                                {/* Duration:{" "} */}
                                {/* {event.duration} minutes */}
                            </p>
                        </FadeIn>
                    </div>

                    {/* Location */}

                    <div>
                        <div className="w-full h-80 bg-crimson rounded-xl">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EventsAndCoursesDetailsAbout