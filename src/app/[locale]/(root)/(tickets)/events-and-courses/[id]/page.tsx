import Container from "@/components/shared/Container"

import EventsAndCoursesDetailsAbout from "@/features/loghante(root)/tickets/events-and-courses/events-and-courses-details/componenets/EventsAndCoursesDetailsAbout"

import EventsAndCoursesDetailsHeader from "@/features/loghante(root)/tickets/events-and-courses/events-and-courses-details/componenets/EventsAndCoursesDetailsHeader"

import {
    EventAndCourseType,
    getEventAndCourseSessionDetail,
} from "@/lib/api/ticket/events-and-courses"

interface EventsAndCoursesDetailsPageProps {
    params: Promise<{
        id: string
        locale: string
    }>
    searchParams: Promise<{
        type?: string
    }>
}

async function EventsAndCoursesDetailsPage({
    params,
    searchParams,
}: EventsAndCoursesDetailsPageProps) {

    const {
        id,
        locale,
    } = await params

    const {
        type: typeParam,
    } = await searchParams

    console.log("SEARCH PARAMS:", {
        typeParam,
    })

    // Don't call API if type is missing or invalid
    if (
        typeParam !== "events" &&
        typeParam !== "courses"
    ) {
        return (
            <Container>
                <div className="py-38 text-center">
                    Invalid event type.
                </div>
            </Container>
        )
    }

    const type: EventAndCourseType =
        typeParam

    const response =
        await getEventAndCourseSessionDetail(
            type,
            id,
            locale,
        )

    if (
        !response.success ||
        !response.data
    ) {
        return (
            <Container>
                <div className="py-38 text-center">
                    Failed to load session details.
                </div>
            </Container>
        )
    }

    const event = response.data

    return (
        <Container>
            <div className="xl:px-25 sm:px-10 py-38 fcol gap-y-10">

                <EventsAndCoursesDetailsHeader
                    event={event}
                />

                <EventsAndCoursesDetailsAbout
                    event={event}
                />

            </div>
        </Container>
    )
}

export default EventsAndCoursesDetailsPage