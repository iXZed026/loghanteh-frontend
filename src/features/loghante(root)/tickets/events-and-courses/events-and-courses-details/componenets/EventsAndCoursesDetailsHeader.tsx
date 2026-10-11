import EventsAndCoursesHeaderImages from "./EventsAndCoursesHeaderImages"
import EventsAndCoursesHeaderForm from "./EventsAndCoursesHeaderForm"

import {
    EventAndCourseSessionDetail,
} from "@/lib/api/ticket/events-and-courses"

interface EventsAndCoursesDetailsHeaderProps {
    event: EventAndCourseSessionDetail
}

function EventsAndCoursesDetailsHeader({
    event,
}: EventsAndCoursesDetailsHeaderProps) {
    return (
        <section className="grid grid-cols-12 items-stretch gap-x-8 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 min-w-0 lg:col-span-7">
                <EventsAndCoursesHeaderImages
                    images={event.images ?? []}
                />
            </div>

            <div className="col-span-12 min-w-0 lg:col-span-5">
                <EventsAndCoursesHeaderForm event={event} />
            </div>
        </section>
    )
}

export default EventsAndCoursesDetailsHeader
