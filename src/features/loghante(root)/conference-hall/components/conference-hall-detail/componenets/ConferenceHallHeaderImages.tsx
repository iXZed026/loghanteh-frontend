'use client'

import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import { fastTransitionIn } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import React, { useState } from 'react'
import { ConferenceHall } from '../data/conference-hall'
import { useLocale } from 'next-intl'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'

interface ConferenceHallHeaderImagesProps {
    conferenceHall: ConferenceHall
}

function ConferenceHallHeaderImages({
    conferenceHall,
}: ConferenceHallHeaderImagesProps) {

    const locale = useLocale()

    const title = getLocalizedValue(
        conferenceHall.title,
        locale
    )

    const [imageSrc, setImageSrc] = useState<string>(
        conferenceHall.imageURL[0]
    )

    function changeImageHandler(
        src: string
    ): void {
        console.log("new: ",src)
        setImageSrc(src)
    }

    return (
        <div
            className={cn(
                'lg:col-span-6 col-span-12',
                'fcol gap-y-5',
                'rounded-xl',
            )}
        >
            {/* Main Image */}
            <div className='w-full overflow-hidden'>
                <FadeUp
                    y={200}
                    key={imageSrc}
                    once
                    transition={fastTransitionIn}
                >
                    <AppImage
                        width={1000}
                        height={1000}
                        src={imageSrc}
                        alt={title}
                        priority
                        className='rounded-xl'
                    />
                </FadeUp>
            </div>

            {/* Select Image */}
            <div className='w-full rounded-lg fcc gap-3'>
                {conferenceHall.imageURL.map(
                    (image, index) => (
                        <AppImage
                            key={`${image}-${index}`}
                            width={100}
                            height={45}
                            src={image}
                            alt={`${title} ${index + 1}`}
                            className='cursor-pointer click-scale'
                            onClick={() =>
                                changeImageHandler(image)
                            }
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default ConferenceHallHeaderImages