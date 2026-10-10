'use client'

import Container from '@/components/shared/Container'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale, useTranslations } from 'next-intl'
import { cafeMenus } from '../../data/cafe-menus'

interface CafeMenuHeroProps {
    cafeId: number
}

function CafeMenuHero({
    cafeId,
}: CafeMenuHeroProps) {
    const cafeMenuHeroT = useTranslations(
        'cafeMenu.hero',
    )

    const locale = useLocale()

    const cafe = cafeMenus.find(
        (menu) => menu.id === cafeId,
    )

    const title = cafe
        ? getLocalizedValue(cafe.name, locale)
        : cafeMenuHeroT('title')

    return (
        <section
            id="cafe-menus"
            className="relative h-screen select-none"
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                "
            >
                <source
                    src="https://74aex8lzr0js8tkj.public.blob.vercel-storage.com/loghante-hero-video.mp4"
                    type="video/mp4"
                />
            </video>

            <div
                className={cn(
                    'absolute bottom-0 left-0 w-full',
                    'gradient-shadow',
                    'py-12',
                )}
            >
                <Container>
                    <div className="text-white-utility">
                        <h1
                            className="
                                mb-7
                                font-wulkan
                                text-3xl
                                font-bold
                                md:text-5xl
                            "
                        >
                            {title}
                        </h1>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default CafeMenuHero
