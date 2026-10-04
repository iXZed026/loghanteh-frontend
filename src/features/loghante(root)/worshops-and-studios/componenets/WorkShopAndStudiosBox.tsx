import AppLink from '@/components/ui/AppLink'
import { WorkshopAndStudio } from '../data/workshop-and-studios'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { cn } from '@/lib/utils/cn'
import { useLocale } from 'next-intl'
import React from 'react'

interface IWorkShopAndStudiosBox {
    workshop: WorkshopAndStudio
}

function WorkShopAndStudiosBox({
    workshop,
}: IWorkShopAndStudiosBox) {

    const locale = useLocale()

    const title = getLocalizedValue(
        workshop.title,
        locale
    )

    return (
        <AppLink
            href={`/workshops-and-studios/${workshop.id}`}
            className={cn(
                "lg:col-span-4 sm:col-span-6 col-span-12",
                "fcol justify-between",
                "bg-crimson",
                "h-90",
                "rounded-lg",
                "relative",
                "overflow-hidden",
                "block",
            )}
        >

            {/* Image */}
            <div className='w-full h-full'>
                {/* Image will be added here */}
            </div>

            {/* Title */}
            <div
                className={cn(
                    "w-full",
                    "py-6 px-3",
                    "absolute bottom-0 left-0",
                    "text-white-light-utility",
                    "gradient-shadow",
                )}
            >
                <div className='w-45 text-lg font-semibold'>
                    <span>
                        {title}
                    </span>
                </div>
            </div>

        </AppLink>
    )
}

export default WorkShopAndStudiosBox