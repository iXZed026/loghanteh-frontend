import React from 'react'
import { ICafesAndFoods } from '../data/cafesAndFoods'
import { useLocale, useTranslations } from 'next-intl'
import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import Button from '@/components/ui/Button'

type cafesAndFoodsBox = ICafesAndFoods

function CafesAndFopdsBox(props: cafesAndFoodsBox) {

    const {
        name,
        description,
        href,
        imageURL,
    } = props

    const locale = useLocale()

    const T =
        useTranslations("LoghantehCafeAndFood.box")

    return (
        <div className={cn(
            "text-black-utility",
            "py-5",
            "rounded-xl",
            "shadow-md",
            "border border-[var(--white-light-color)]",
        )}>
            <div
                className={cn(
                    "min-h-120",
                    "md:px-12 ",
                    "fcol items-center justify-center gap-8",
                )}
            >
                {/* Image */}
                <div className={cn(
                    "w-full h-70",
                    "bg-crimson",
                    "rounded-2xl",
                )}>

                </div>
                {/* Content */}
                <div className='text-center fcol gap-7'>
                    <div className='font-bold text-lg text-crimson'>
                        <h3>{getLocalizedValue(name, locale)}</h3>
                    </div>
                    <div className='text-sm font-semibold text-black-light-utility'>
                        <h6>{getLocalizedValue(description, locale)}</h6>
                    </div>
                    <div>
                        <AppLink
                            href={href}
                        >
                            <Button
                                className={cn(
                                    "text-sm",
                                    "bg-crimson",
                                    "px-4 py-2.5"
                                )}
                            >
                                {T("discover-button")}
                            </Button>
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CafesAndFopdsBox