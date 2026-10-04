import Container from '@/components/shared/Container'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import {
    eventsAndCoursesContainerVariant,
} from '@/features/loghante(root)/animations/loghante.variants'
import { cn } from '@/lib/utils/cn'

import EventAndCoursesBox from './EventAndCoursesBox'
import { EventSession } from '@/lib/api/ticket/events-and-courses'
import Loading from '@/components/ui/Loading'

interface EventsAndCoursesBoxWrraperProps {
    data: EventSession[]
    isLoading: boolean
    error: boolean
}

function EventsAndCoursesBoxWrraper({
    data,
    isLoading,
    error,
}: EventsAndCoursesBoxWrraperProps) {

    if (isLoading) {
        return (
            <Container>
                <Loading
                    className="w-full h-[50vh]"
                    size={50}
                />
            </Container>
        )
    }

    if (data.length === 0) {
        return (
            <Container>
                <div className="fcc lg:px-45 min-h-[30vh]">
                    <span className="text-lg">
                        No events were found for this month.
                    </span>
                </div>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="text-center">
                    Failed to load events.
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <StaggerWrapper
                className={cn(
                    "grid grid-cols-12 gap-5 lg:px-45 min-h-[50vh]",
                )}
                variants={
                    eventsAndCoursesContainerVariant
                }
                amount={0.2}
                once
            >
                {data.map((event) => (
                    <EventAndCoursesBox
                        key={event.sessionId}
                        event={event}
                    />
                ))}
            </StaggerWrapper>
        </Container>
    )
}

export default EventsAndCoursesBoxWrraper