import FadeUp from '@/components/animations/FadeUp'
import { verySlowTransitionOut } from '@/lib/animations/transitions'
import { formatMonthYear } from '@/lib/utils/date'
import { useLocale, useTranslations } from 'next-intl'

function EventsAndCoursesHeader() {

    const eventsAndCoursesHeaderT =
        useTranslations("eventsAndCourses.header")

    const locale = useLocale()

    const today = new Date()

    return (
        <div className='fcol gap-y-20  text-center sm:px-10 px-5'>
            <div>
                <FadeUp
                    once={true}
                >
                    <h2
                        className='break-all font-wulkan lg:text-5xl text-3xl font-bold'
                    >
                        {eventsAndCoursesHeaderT("title.part-one")}
                        <span className=' text-crimson'>
                            {eventsAndCoursesHeaderT("title.part-two")}
                        </span>
                        {formatMonthYear(today, locale).split(" ")[0]}
                    </h2>
                </FadeUp>
            </div>
            <div>
                <FadeUp
                    once={true}
                    transition={verySlowTransitionOut}
                >
                    <p className='lg:w-200 w-full mx-auto text-sm text-black-light-utility leading-7'>
                        {eventsAndCoursesHeaderT("description")}
                    </p>
                </FadeUp>
            </div>
        </div>
    )
}

export default EventsAndCoursesHeader