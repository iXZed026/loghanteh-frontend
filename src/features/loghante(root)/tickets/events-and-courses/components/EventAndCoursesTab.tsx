"use client"

import { useEffect } from "react"
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation"
import { useLocale } from "next-intl"
import { EventsAndCoursesTabs } from "../data/events-and-courses-tabs"
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"

function EventAndCoursesTab() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const type = searchParams.get("type")

    useEffect(() => {
        if (
            type === "events" ||
            type === "courses"
        ) {
            return
        }

        const params = new URLSearchParams(
            searchParams.toString()
        )

        params.set("type", "events")

        router.replace(
            `${pathname}?${params.toString()}`
        )
    }, [
        type,
        pathname,
        router,
        searchParams,
    ])

    function handleTabChange(
        selectedType: "events" | "courses"
    ) {
        const params = new URLSearchParams(
            searchParams.toString()
        )

        params.set("type", selectedType)

        router.push(
            `${pathname}?${params.toString()}`
        )
    }

    return (
        <div className="fcc pt-10">
            <div
                className={cn(
                    "fcc",
                    "w-80",
                    "border-2",
                    "rounded-full",
                    "border-[var(--crimson-color)]",
                    "overflow-hidden",
                )}
            >
                {EventsAndCoursesTabs.map((tab) => {
                    const isActive =
                        type === tab.type

                    return (
                        <Button
                            key={tab.id}
                            type="button"
                            onClick={() =>
                                handleTabChange(
                                    tab.type
                                )
                            }
                            className={cn(
                                "w-full",
                                "rounded-none",
                                "py-4",
                                "text-sm",
                                "font-bold",
                                "transition-colors",
                                isActive
                                    ? "bg-[var(--crimson-color)] text-white-utility"
                                    : "bg-[var(--white-utility-color)] text-black-utility-color hover:bg-[var(--crimson-opacity-color)]",
                            )}
                        >
                            <span>
                                {getLocalizedValue(
                                    tab.name,
                                    locale
                                )}
                            </span>
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default EventAndCoursesTab