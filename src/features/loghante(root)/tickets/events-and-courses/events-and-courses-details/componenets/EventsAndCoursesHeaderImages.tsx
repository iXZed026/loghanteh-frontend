"use client"

import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import { fastTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import {
    EventImage,
} from '@/lib/api/ticket/events-and-courses'
import { useState } from 'react'

interface EventsAndCoursesHeaderImagesProps {
    images: EventImage[]
}

function EventsAndCoursesHeaderImages({
    images,
}: EventsAndCoursesHeaderImagesProps) {

    const sortedImages = [...images].sort(
        (a, b) =>
            a.displayOrder -
            b.displayOrder
    )

    const firstImage =
        sortedImages[0]?.imageUrl ||
        "/images/loghanteh-cafe.jpg"

    const [imageSrc, setImageSrc] =
        useState<string>(firstImage)

    function changeImageHandler(
        src: string
    ): void {
        setImageSrc(src)
    }

    return (
        <div
            className={cn(
                "lg:col-span-7 col-span-12",
                "fcol gap-y-5",
                "rounded-xl",
            )}
        >
            {/* Main Image */}

            <div className="w-full overflow-hidden">
                <FadeUp
                    y={200}
                    key={imageSrc}
                    once
                    transition={
                        fastTransitionOut
                    }
                >
                    <AppImage
                        width={1920}
                        height={1080}
                        src={imageSrc}
                        alt="event image"
                        priority
                        className="rounded-xl"
                    />
                </FadeUp>
            </div>

            {/* Select Image */}

            {sortedImages.length > 0 && (
                <div
                    className={cn(
                        "w-full rounded-lg",
                        "fcc gap-3",
                    )}
                >
                    {sortedImages.map((image) => {

                        const src =
                            image.imageUrl ||
                            "/images/loghanteh-cafe.jpg"

                        return (
                            <AppImage
                                key={
                                    image.displayOrder
                                }
                                width={100}
                                height={45}
                                src={src}
                                alt="event image"
                                className="cursor-pointer click-scale"
                                onClick={() =>
                                    changeImageHandler(
                                        src
                                    )
                                }
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default EventsAndCoursesHeaderImages