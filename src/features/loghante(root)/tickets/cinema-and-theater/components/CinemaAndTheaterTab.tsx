"use client"

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation"

import {
    useLocale,
} from "next-intl"

import Button from "@/components/ui/Button"

import {
    getLocalizedValue,
} from "@/lib/utils/getLocalizedValue"

import {
    cn,
} from "@/lib/utils/cn"


import {
    CinemaAndTheaterTabs,
    CinemaAndTheaterType,
} from "./data/cinema-and-theater-tabs"

interface CinemaAndTheaterTabProps {
    type: CinemaAndTheaterType
}

function CinemaAndTheaterTab({
    type,
}: CinemaAndTheaterTabProps) {

    const locale = useLocale()

    const router = useRouter()

    const pathname =
        usePathname()

    const searchParams =
        useSearchParams()

    function handleTabChange(
        selectedType: CinemaAndTheaterType
    ) {

        const params =
            new URLSearchParams(
                searchParams.toString()
            )

        params.set(
            "type",
            selectedType
        )

        router.replace(
            `${pathname}?${params.toString()}`,
            {
                scroll: false,
            }
        )
    }

    return (
        <div className="fcc">

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

                {CinemaAndTheaterTabs.map(
                    (tab) => {

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
                                        ? [
                                            "bg-[var(--crimson-color)]",
                                            "text-white-utility",
                                        ]
                                        : [
                                            "bg-[var(--white-utility-color)]",
                                            "text-black-utility-color",
                                            "hover:bg-[var(--crimson-opacity-color)]",
                                        ]
                                )}
                            >
                                {
                                    getLocalizedValue(
                                        tab.name,
                                        locale
                                    )
                                }
                            </Button>
                        )
                    }
                )}

            </div>

        </div>
    )
}

export default CinemaAndTheaterTab