"use client"

import {
    useEffect,
    useState,
} from "react"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"

import EventsAndCoursesHeader from "./EventsAndCoursesHeader"
import EventAndCoursesTab from "./EventAndCoursesTab"
import EventsAndCoursesDate from "./EventsAndCoursesDate"
import EventsAndCoursesBoxWrraper from "./EventsAndCoursesBoxWrraper"

import {
    EventAndCourseType,
    EventSession,
    getEventsAndCourses,
} from "@/lib/api/ticket/events-and-courses"

function EventsAndCoursesContent() {

    const locale = useLocale()
    const searchParams = useSearchParams()

    const typeParam = searchParams.get("type")

    const type: EventAndCourseType =
        typeParam === "courses"
            ? "courses"
            : "events"

    const [selectedDate, setSelectedDate] =
        useState<Date>(new Date())

    const [data, setData] =
        useState<EventSession[]>([])

    const [isLoading, setIsLoading] =
        useState(false)

    const [error, setError] =
        useState(false)

    useEffect(() => {

        let isMounted = true

        async function fetchData() {

            setIsLoading(true)
            setError(false)

            const year =
                selectedDate.getFullYear()

            const month =
                String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")

            const date =
                `${year}-${month}-01`

            try {

                const response =
                    await getEventsAndCourses(
                        type,
                        date,
                        locale,
                    )

                if (!isMounted) {
                    return
                }

                if (!response.success) {
                    setData([])
                    setError(true)
                    return
                }

                console.log(response.data)

                setData(
                    response.data ?? []
                )

            } catch {

                if (!isMounted) {
                    return
                }

                setData([])
                setError(true)

            } finally {

                if (isMounted) {
                    setIsLoading(false)
                }

            }
        }

        fetchData()

        return () => {
            isMounted = false
        }

    }, [
        selectedDate,
        type,
        locale,
    ])

    return (
        <>
            <EventsAndCoursesHeader />

            <EventAndCoursesTab />

            <EventsAndCoursesDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />

            <EventsAndCoursesBoxWrraper
                data={data}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default EventsAndCoursesContent