"use client"

import React from "react"

import { useRouter } from "next/navigation"

import {
    FaRegMoneyBillAlt,
} from "react-icons/fa"

import {
    SlCalender,
} from "react-icons/sl"

import Button from "@/components/ui/Button"

import { cn } from "@/lib/utils/cn"

import {
    useHall,
} from "../../context/HallProvider"

import { useLocale, useTranslations } from "next-intl"

import {
    formatTime,
    formatWeekdayDate,
} from "@/lib/utils/date"

function HallTicketDetails() {

    const T =
        useTranslations(
            "hall.hall-details",
        )


    const commonT =
        useTranslations("common")

    const router =
        useRouter()

    const locale = useLocale()


    const {
        hallData,
    } = useHall()

    const event =
        hallData?.eventData

    if (!event) {
        return null
    }

    console.log(event.startAt)

    const startAt =
        new Date(event.startAt)

    const formattedDate =
        formatWeekdayDate(
            startAt,
            locale,
        )

    const formattedTime =
        formatTime(
            startAt,
            locale,
        )

    function changeButtonHandler() {
        router.back()
    }

    return (
        <div className="fcol gap-5">

            <div>
                <span className="text-xl">
                    {T("title")}
                </span>
            </div>

            <div className="fcc">

                <div className="flex w-full items-center gap-2">

                    <FaRegMoneyBillAlt
                        className="text-crimson"
                        size={25}
                    />

                    <span>
                        {T("amount")}:{" "}
                        {event.price?.toLocaleString(
                            locale,
                        )}{" "}
                        {commonT("price-type")}
                    </span>

                </div>

                <div className="w-full fbc bg-gold-opacity p-8">

                    <div
                        className={cn(
                            "fcol gap-3",
                            "text-sm",
                            "text-black-light-utility",
                        )}
                    >

                        <div className="flex items-center gap-2">

                            <SlCalender
                                className="text-crimson"
                                size={13}
                            />

                            <span>
                                {formattedDate}
                            </span>

                        </div>

                        <div className="flex items-center gap-2">

                            <SlCalender
                                className="text-crimson"
                                size={13}
                            />

                            <span>
                                {T("time")}{" "}
                                {formattedTime}
                            </span>

                        </div>

                    </div>

                    <div>

                        <Button
                            className={cn(
                                "text-crimson",
                                "hover:text-[var(--crimson-opacity-color)]",
                            )}
                            onClick={
                                changeButtonHandler
                            }
                        >
                            {T("change")}
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default HallTicketDetails