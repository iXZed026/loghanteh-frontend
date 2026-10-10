'use client'

import CafeMenuItem from '../CafeMenuItem'
import CafeMenusFilters from '../CafeMenusFilters'

import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { cafeMenusContainerVariant } from '@/features/loghante(root)/animations/loghante.variants'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { cafeMenus } from '../../data/cafe-menus'

interface CafeMenusSectionsProps {
    cafeId: number
}

function CafeMenusSections({
    cafeId,
}: CafeMenusSectionsProps) {
    const cafeMenuMenuT = useTranslations(
        'cafeMenu.menu',
    )

    const locale = useLocale()

    const searchParams = useSearchParams()

    const activeFilter =
        searchParams.get('filter') || 'food'

    const cafe = cafeMenus.find(
        (menu) => menu.id === cafeId,
    )

    if (!cafe) {
        return null
    }

    const filteredMenus = cafe.menus.filter(
        (menu) =>
            menu.category === activeFilter,
    )

    return (
        <div className="min-h-screen">
            {/* Title */}
            <div className="py-10 text-center">
                <h5
                    className="
                        mb-5
                        font-wulkan
                        text-3xl
                        font-bold
                        md:text-5xl
                    "
                >
                    {cafeMenuMenuT('title')}
                </h5>
            </div>

            {/* Filters */}
            <CafeMenusFilters cafeId={cafeId}/>

            {/* Menu Items */}
            <StaggerWrapper
                key={`${cafeId}-${activeFilter}`}
                variants={cafeMenusContainerVariant}
                once
                className={cn(
                    'grid',
                    'grid-cols-12',
                    'lg:gap-10',
                    'gap-3',
                    'mb-15',
                )}
            >
                {filteredMenus.map((menu) => (
                    <CafeMenuItem
                        key={menu.id}
                        name={getLocalizedValue(
                            menu.name,
                            locale,
                        )}
                        price={menu.price}
                        image={menu.image}
                    />
                ))}
            </StaggerWrapper>
        </div>
    )
}

export default CafeMenusSections
