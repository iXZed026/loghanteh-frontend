"use client";

import StaggerWrapper from "@/components/animations/StaggerWrapper";

import {
    dayOfTheWeeksContainerVariant,
} from "@/features/loghante(root)/animations/loghante.variants";

import DayOfWeekBox from "@/features/loghante(root)/components/DayOfWeekBox";

import { useTranslations } from "next-intl";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

interface CinemaAndTheaterDateProps {
    selectedDate: string;
}

function parseDate(
    dateString: string
): Date {

    const [
        year,
        month,
        day,
    ] = dateString
        .split("-")
        .map(Number);

    return new Date(
        year,
        month - 1,
        day
    );
}

function CinemaAndTheaterDate({
    selectedDate,
}: CinemaAndTheaterDateProps) {

    const router =
        useRouter();

    const DOWeeksT =
        useTranslations(
            "cinemaAndTheater.day-of-the-weeks"
        );

    const pathname =
        usePathname();

    const searchParams =
        useSearchParams();

    function handleDateChange(
        date: Date
    ) {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        const formattedDate =
            `${year}-${month}-${day}`;

        const params =
            new URLSearchParams(
                searchParams.toString()
            );

        params.set(
            "date",
            formattedDate
        );

        router.replace(
            `${pathname}?${params.toString()}`,
            {
                scroll: false,
            }
        );
    }

    const date =
        parseDate(
            selectedDate
        );

    return (
        <div className="w-full">

            <div className="w-full overflow-x-auto overflow-y-hidden xl:overflow-x-visible py-5">

                <div className="py-5">
                    <span className="text-lg font-semibold">
                        {DOWeeksT("title")}
                    </span>
                </div>

                <StaggerWrapper
                    once
                    variants={
                        dayOfTheWeeksContainerVariant
                    }
                    className="
                        grid
                        min-w-[1000px]
                        grid-cols-7
                        gap-3
                        xl:min-w-0
                    "
                >

                    <DayOfWeekBox
                        selectedDate={date}
                        onDateChange={
                            handleDateChange
                        }
                    />

                </StaggerWrapper>

            </div>

        </div>
    );
}

export default CinemaAndTheaterDate;