import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { FiDownload } from 'react-icons/fi'
import { ConferenceHall } from '../data/conference-hall'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import ConferenceHallIcon from './ConferenceHallIcon'

interface ConfrenceHallHeaderDetailProps {
    conferenceHall: ConferenceHall
}

function ConfrenceHallHeaderDetail({
    conferenceHall,
}: ConfrenceHallHeaderDetailProps) {

    const conferenceHallPageT =
        useTranslations("conferenceHall.page")

    const conferenceHallParametersT =
        useTranslations("conferenceHall.parameters")

    const locale = useLocale()

    const title = getLocalizedValue(
        conferenceHall.title,
        locale
    )

    const description = getLocalizedValue(
        conferenceHall.description,
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

    const layout = getLocalizedValue(
        conferenceHall.layout.layout,
        locale
    )

    return (
        <div
            className={cn(
                'lg:col-span-6 col-span-12',
                'px-8',
            )}
        >
            <div className='fcol gap-10 py-5'>

                {/* Title */}
                <div>
                    <h6 className='text-xl font-bold'>
                        {title}
                    </h6>
                </div>

                {/* Description */}
                <div className='text-black-light-utility'>
                    <p>
                        {description}
                    </p>
                </div>

                {/* Information */}
                <div
                    className={cn(
                        'grid md:grid-cols-12 grid-cols-6 gap-5',
                        'text-sm font-semibold',
                        'text-crimson'
                    )}
                >

                    {/* Capacity */}
                    <div
                        className={cn(
                            'col-span-6',
                            'flex items-center justify-between gap-3',
                            'border-2 border-[var(--crimson-color)]',
                            'rounded-lg',
                            'py-2.5 px-3'
                        )}
                    >
                        <span className='flex items-center gap-3'>
                            <ConferenceHallIcon
                                type={conferenceHall.capacity.icon}
                                className='size-6'
                            />

                            <span>
                                {capacityLabel}
                            </span>
                        </span>

                        <span>
                            {conferenceHall.capacity.count}{' '}
                            {conferenceHallParametersT('person')}
                        </span>
                    </div>

                    {/* Area */}
                    <div
                        className={cn(
                            'col-span-6',
                            'flex items-center justify-between gap-3',
                            'border-2 border-[var(--crimson-color)]',
                            'rounded-lg',
                            'py-2.5 px-3',
                        )}
                    >
                        <span className='flex items-center gap-3'>
                            <ConferenceHallIcon
                                type={conferenceHall.area.icon}
                                className='size-6'
                            />

                            <span>
                                {areaLabel}
                            </span>
                        </span>

                        <span>
                            {conferenceHall.area.count}{' '}
                            {conferenceHallParametersT('square-meters')}
                        </span>
                    </div>

                    {/* Layout */}
                    <div
                        className={cn(
                            'col-span-6',
                            'flex items-center justify-between gap-3',
                            'border-2 border-[var(--crimson-color)]',
                            'rounded-lg',
                            'py-2.5 px-3',
                        )}
                    >
                        <span className='flex items-center gap-3'>
                            <ConferenceHallIcon
                                type={conferenceHall.layout.icon}
                                className='size-6'
                            />

                            <span>
                                {layoutLabel}
                            </span>
                        </span>

                        <span>
                            {layout}
                        </span>
                    </div>

                </div>

                {/* Download + Contact */}
                <div className='fcol gap-y-5 text-center'>

                    <Button
                        className={cn(
                            'w-full',
                            'bg-crimson',
                            'py-3',
                            'fcc gap-2',
                            'text-white-utility'
                        )}
                    >
                        <span>
                            <FiDownload />
                        </span>

                        <span>
                            {conferenceHallPageT("download-button")}
                        </span>
                    </Button>

                    <a
                        className='font-semibold text-crimson'
                        href='tel:021-6555555'
                    >
                        {conferenceHallPageT('contact')} 021-6555555
                    </a>

                </div>

            </div>
        </div>
    )
}

export default ConfrenceHallHeaderDetail