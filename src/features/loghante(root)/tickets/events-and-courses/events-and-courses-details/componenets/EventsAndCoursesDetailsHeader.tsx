import EventsAndCoursesHeaderImages from './EventsAndCoursesHeaderImages'
import EventsAndCoursesHeaderForm from './EventsAndCoursesHeaderForm'

import {
    EventAndCourseSessionDetail,
} from '@/lib/api/ticket/events-and-courses'

interface EventsAndCoursesDetailsHeaderProps {
    event: EventAndCourseSessionDetail
}

function EventsAndCoursesDetailsHeader({
    event,
}: EventsAndCoursesDetailsHeaderProps) {

    return (
        <div className="grid grid-cols-12 lg:gap-10 gap-y-10">

            {/* Events Images */}
            <EventsAndCoursesHeaderImages
                images={event.images}
            />

            {/* Events Details */}
            <EventsAndCoursesHeaderForm
                event={event}
            />

        </div>
    )
}

export default EventsAndCoursesDetailsHeader