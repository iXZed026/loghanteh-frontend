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
    const [{ id, locale }, { type: typeParam }] =
        await Promise.all([params, searchParams])

    if (
        typeParam !== "events" &&
        typeParam !== "courses"
    ) {
        return (
            <Container>
                <div className="flex min-h-[45vh] items-center justify-center">
                    <div className="max-w-md rounded-2xl border border-black/10 px-8 py-10 text-center">
                        <p className="text-lg font-semibold text-crimson">
                            Invalid event type.
                        </p>
                    </div>
                </div>
            </Container>
        )
    }

    const type: EventAndCourseType = typeParam

    const response = await getEventAndCourseSessionDetail(
        type,
        id,
        locale,
    )

    if (!response.success || !response.data) {
        return (
            <Container>
                <div className="flex min-h-[45vh] items-center justify-center">
                    <div className="max-w-md rounded-2xl border border-black/10 px-8 py-10 text-center">
                        <p className="text-lg font-semibold text-crimson">
                            Failed to load session details.
                        </p>
                    </div>
                </div>
            </Container>
        )
    }

    const event = response.data

    return (
        <main className="relative overflow-hidden py-32">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 right-0 -z-10 size-80 rounded-full bg-gold-utility/10 blur-3xl"
            />

            <Container>
                <div className="mx-auto flex max-w-7xl flex-col gap-12 sm:gap-16 lg:gap-20">
                    <EventsAndCoursesDetailsHeader event={event} />

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-utility/50 to-transparent" />

                    <EventsAndCoursesDetailsAbout event={event} />
                </div>
            </Container>
        </main>
    )
}

export default EventsAndCoursesDetailsPage
