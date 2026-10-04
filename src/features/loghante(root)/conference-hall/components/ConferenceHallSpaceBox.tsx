'use client'

import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import AppLink from '@/components/ui/AppLink'
import {
    fastTransitionOut,
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { ConferenceHall } from './conference-hall-detail/data/conference-hall'
import { conferenceHallVariant } from '../../animations/loghante.variants'
import ConferenceHallIcon from './conference-hall-detail/componenets/ConferenceHallIcon'

interface ConferenceHallSpaceBoxProps {
    conferenceHall: ConferenceHall
}

function ConferenceHallSpaceBox({
    conferenceHall,
}: ConferenceHallSpaceBoxProps) {

    const conferenceHallParametersT =
        useTranslations("conferenceHall.parameters")

    const buttonT = 
        useTranslations("conferenceHall.space.boxes")

    const locale = useLocale()

    const title = getLocalizedValue(
        conferenceHall.title,
        locale
    )

    const layout = getLocalizedValue(
        conferenceHall.layout.layout,
        locale
    )

    const capacityLabel = getLocalizedValue(
        conferenceHall.capacity.label,
        locale
    )

    const areaLabel = getLocalizedValue(
        conferenceHall.area.label,
        locale
    )

    const layoutLabel = getLocalizedValue(
        conferenceHall.layout.label,
        locale
    )

    return (
        <FadeUp
            variants={conferenceHallVariant}
            transition={fastTransitionOut}
            className={cn(
                'lg:col-span-4 sm:col-span-6 col-span-12',
                'min-h-125',
                'shadow-lg',
                'rounded-lg',
                'overflow-hidden',
            )}
            once
            y={100}
            amount={0.2}
        >
            <div>

                {/* Image */}
                <div>
                    <AppImage
                        width={1000}
                        height={500}
                        src={conferenceHall.imageURL[0]}
                        alt={title}
                        className='w-full h-50 object-cover'
                    />
                </div>

                {/* Body */}
                <div className='text-center p-5 fcol gap-y-8 text-crimson'>

                    {/* Title */}
                    <div className='text-black-utility'>
                        <span className='text-center font-semibold'>
                            {title}
                        </span>
                    </div>

                    {/* Capacity */}
                    <div className='fbc'>
                        <div className='fcc gap-1'>
                            <span>
                                <ConferenceHallIcon
                                    type={conferenceHall.capacity.icon}
                                />
                            </span>

                            <span>
                                {capacityLabel}
                            </span>
                        </div>

                        <div>
                            <span>
                                {conferenceHall.capacity.count} {" "}
                                {conferenceHallParametersT("person")}
                            </span>
                        </div>
                    </div>

                    {/* Area */}
                    <div className='fbc'>
                        <div className='fcc gap-1'>
                            <span>
                                <ConferenceHallIcon
                                    type={conferenceHall.area.icon}
                                />
                            </span>

                            <span>
                                {areaLabel}
                            </span>
                        </div>

                        <div>
                            <span>
                                {conferenceHall.area.count} {" "}
                                {conferenceHallParametersT("square-meters")}
                            </span>
                        </div>
                    </div>

                    {/* Layout */}
                    <div className='fbc'>
                        <div className='fcc gap-1'>
                            <span>
                                <ConferenceHallIcon
                                    type={conferenceHall.layout.icon}
                                />
                            </span>

                            <span>
                                {layoutLabel}
                            </span>
                        </div>

                        <div>
                            <span>
                                {layout}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Button */}
                <div className='fcc'>
                    <AppLink
                        href={conferenceHall.href}
                        className={cn(
                            'text-sm',
                            'bg-crimson',
                            'px-3 py-2.5',
                            'rounded-lg',
                            'text-white-utility',
                            'hover:bg-[var(--crimson-opacity-color)]',
                            'transition-colors',
                            'click-scale'
                        )}
                    >
                        {buttonT("details-button")}
                    </AppLink>
                </div>

            </div>
        </FadeUp>
    )
}

export default ConferenceHallSpaceBox