import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'
import React from 'react'

function FooterLocation({
    t
}: {
    t: TranslationFunction
}) {
    return (
        <div
            className={cn(
                "xl:col-span-5 lg:col-span-4 md:col-span-8 col-span-12",
                "fcol gap-10",
            )}
        >
            <div className='w-full bg-white xl:h-full h-70 rounded-xl'>

            </div>
        </div>
    )
}

export default FooterLocation