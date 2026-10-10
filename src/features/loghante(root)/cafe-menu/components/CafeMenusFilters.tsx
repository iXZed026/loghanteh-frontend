"use client"

import AppLink from '@/components/ui/AppLink'
import React from 'react'
import { cafeMenusFilters } from '../data/cafe-menus-filters'
import { cn } from '@/lib/utils/cn'
import { useSearchParams } from 'next/navigation'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale } from 'next-intl'

interface ICafeMenusFilters {
    cafeId: number
}

function CafeMenusFilters({
    cafeId,
}:ICafeMenusFilters) {

    const searchParams = useSearchParams()

    const locale = useLocale()

    const activeFilter =
        searchParams.get("filter") || cafeMenusFilters[0].slug



    return (
        <div>
            <div className='fcc mb-10'>
                <ul className='fcc md:w-300 w-full mx-auto text-center'>
                    {cafeMenusFilters.map(filter => (
                        <li
                            key={filter.id}
                            className='w-full py-7'>
                            <AppLink
                                className={cn(
                                    "md:text-lg sm:text-sm text-xs",
                                    "md:px-3 py-2",
                                    "border-b-2",
                                    "rounded-sm",
                                    "transition-colors",
                                    activeFilter === filter.slug
                                        ? "border-[var(--crimson-color)] text-crimson font-bold"
                                        : "border-transparent text-black"
                                )}
                                href={`/cafe-menu/${cafeId}?filter=${filter.slug}`}
                                scroll={false}
                            >
                                {
                                    getLocalizedValue(filter.name, locale)
                                }
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CafeMenusFilters