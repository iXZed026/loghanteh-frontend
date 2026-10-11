"use client"

import { useEffect, useState } from "react"

import FadeUp from "@/components/animations/FadeUp"
import AppImage from "@/components/ui/AppImage"

import { cn } from "@/lib/utils/cn"
import { fastTransitionOut } from "@/lib/animations/transitions"

import {
    EventImage,
} from "@/lib/api/ticket/events-and-courses"

interface EventsAndCoursesHeaderImagesProps {
    images: EventImage[]
}

const FALLBACK_IMAGE = "/images/loghanteh-cafe.jpg"

function getImageSrc(imageUrl?: string | null): string {
    return typeof imageUrl === "string" && imageUrl.trim().length > 0
        ? imageUrl
        : FALLBACK_IMAGE
}

function EventsAndCoursesHeaderImages({
    images,
}: EventsAndCoursesHeaderImagesProps) {
    const sortedImages = [...(images ?? [])].sort(
        (a, b) => a.displayOrder - b.displayOrder,
    )

    const firstValidImage =
        sortedImages.find(
            (image) =>
                typeof image.imageUrl === "string" &&
                image.imageUrl.trim().length > 0,
        )?.imageUrl ?? FALLBACK_IMAGE

    const [imageSrc, setImageSrc] =
        useState<string>(firstValidImage)

    useEffect(() => {
        setImageSrc(firstValidImage)
    }, [firstValidImage])

    return (
        <div className="flex flex-col gap-5 sm:gap-6">
            <FadeUp
                key={imageSrc}
                once
                transition={fastTransitionOut}
                className="w-full"
            >
                <div
                    className={cn(
                        "relative isolate aspect-video w-full",
                        "overflow-hidden rounded-3xl",
                        "border border-black/10 bg-[#f4f0eb]",
                        "shadow-[0_20px_55px_rgba(22,22,22,0.12)]",
                    )}
                >
                    <AppImage
                        src={getImageSrc(imageSrc)}
                        alt="Event or course"
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 58vw"
                        className="object-cover"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
                    />

                    <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:bottom-5 sm:left-5">
                        {sortedImages.length > 0
                            ? `${sortedImages.findIndex((image) => getImageSrc(image.imageUrl) === imageSrc) + 1} / ${sortedImages.length}`
                            : "Loghanteh"}
                    </div>
                </div>
            </FadeUp>

            {sortedImages.length > 0 && (
                <div
                    className={cn(
                        "flex gap-3 overflow-x-auto pb-2",
                        "scrollbar-none",
                    )}
                >
                    {sortedImages.map((image, index) => {
                        const src = getImageSrc(image.imageUrl)
                        const isActive = imageSrc === src

                        return (
                            <button
                                key={`${image.displayOrder}-${index}`}
                                type="button"
                                onClick={() => setImageSrc(src)}
                                aria-label={`View image ${index + 1}`}
                                aria-pressed={isActive}
                                className={cn(
                                    "cursor-pointer ",
                                    "relative h-[76px] w-[108px] shrink-0",
                                    "overflow-hidden rounded-xl border-2",
                                    "bg-[#f4f0eb] transition-all duration-300",
                                    "focus-visible:outline-none focus-visible:ring-2",
                                    "focus-visible:ring-[#d2ae6d] focus-visible:ring-offset-2",
                                    isActive
                                        ? "border-[#5c2127] opacity-100 shadow-[0_5px_18px_rgba(92,33,39,0.18)]"
                                        : "border-transparent opacity-65 hover:border-[#d2ae6d] hover:opacity-100",
                                )}
                            >
                                <AppImage
                                    src={src}
                                    alt={`Event image ${index + 1}`}
                                    fill
                                    sizes="108px"
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default EventsAndCoursesHeaderImages
