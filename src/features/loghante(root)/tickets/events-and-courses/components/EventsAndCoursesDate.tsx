"use client"

import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useRef,
} from "react"
import { formatMonthYear } from "@/lib/utils/date"
import { cn } from "@/lib/utils/cn"
import { useLocale } from "next-intl"

import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi"

import Button from "@/components/ui/Button"
import { FaRegCalendarAlt } from "react-icons/fa"

interface EventsAndCoursesDateProps {
    selectedDate: Date
    setSelectedDate: Dispatch<SetStateAction<Date>>
}

function EventsAndCoursesDate({
    selectedDate,
    setSelectedDate,
}: EventsAndCoursesDateProps) {

    const locale = useLocale()

    const monthInputRef =
        useRef<HTMLInputElement>(null)

    function openMonthPicker() {
        monthInputRef.current?.showPicker()
    }

    function changeMonth(amount: number) {

        setSelectedDate((prev) => {

            const newDate =
                new Date(prev)

            newDate.setMonth(
                newDate.getMonth() + amount
            )

            return newDate
        })
    }

    function handleMonthChange(
        e: ChangeEvent<HTMLInputElement>
    ) {

        if (!e.target.value) {
            return
        }

        const [
            year,
            month,
        ] = e.target.value
            .split("-")
            .map(Number)

        setSelectedDate(
            new Date(
                year,
                month - 1,
                1
            )
        )
    }

    const monthTitle =
        formatMonthYear(
            selectedDate,
            locale
        )

    const inputMonth =
        `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
        ).padStart(2, "0")}`

    return (
        <div
            className={cn(
                "w-full",
                "flex items-center justify-center",
                "gap-4 py-10",
            )}
        >
            {/* Previous month */}

            <button
                type="button"
                onClick={() =>
                    changeMonth(-1)
                }
                aria-label="Previous month"
                className={cn(
                    "flex items-center justify-center",
                    "text-[var(--gold-color)]",
                    "md:p-2 p-1",
                    "rounded-full",
                    "transition-colors",
                    "bg-[var(--crimson-color)]",
                    "hover:bg-[var(--crimson-opacity-color)]",
                    "click-scale",
                )}
            >
                <FiChevronLeft size={24} />
            </button>

            {/* Month title */}

            <span
                className={cn(
                    "min-w-40",
                    "text-center",
                    "md:text-3xl text-xl",
                    "font-semibold",
                    "font-wulkan",
                )}
            >
                {monthTitle}
            </span>

            {/* Next month */}

            <Button
                type="button"
                onClick={() =>
                    changeMonth(1)
                }
                aria-label="Next month"
                className={cn(
                    "flex items-center justify-center",
                    "text-[var(--gold-color)]",
                    "md:p-2 p-1",
                    "rounded-full",
                    "transition-colors",
                    "bg-[var(--crimson-color)]",
                    "hover:bg-[var(--crimson-opacity-color)]",
                    "click-scale",
                )}
            >
                <FiChevronRight size={24} />
            </Button>

            {/* Month picker */}

            <label
                onClick={openMonthPicker}
                className={cn(
                    "relative",
                    "fcc",
                    "rounded-full",
                    "transition-colors",
                    "click-scale",
                    "hover:text-[var(--crimson-color)]",
                )}
            >
                <FaRegCalendarAlt size={22} />

                <input
                    ref={monthInputRef}
                    type="month"
                    value={inputMonth}
                    onChange={
                        handleMonthChange
                    }
                    className={cn(
                        "absolute",
                        "inset-0",
                        "w-full",
                        "h-full",
                        "opacity-0",
                    )}
                />
            </label>
        </div>
    )
}

export default EventsAndCoursesDate