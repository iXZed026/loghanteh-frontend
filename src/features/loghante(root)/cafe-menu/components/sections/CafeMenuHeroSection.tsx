import Container from '@/components/shared/Container'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import React from 'react'

function CafeMenuHero() {

    const cafeMenuHeroT =
        useTranslations("cafeMenu.hero")

    return (
        <section id="cafe-menus" className='relative h-screen select-none'>
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source
                    src="/videos/loghanteh/cafe-menu-hero/final.mp4"
                    type="video/mp4"
                />
            </video>
            {/* Content */}
            <div className={cn(
                "w-full",
                "py-12",
                "absolute bottom-0 left-0",
                "gradient-shadow",
            )}>
                <Container>
                    <div className="text-white-utility">
                        <h1 className="font-wulkan mb-7 text-3xl font-bold md:text-5xl">
                            {cafeMenuHeroT("title")}
                        </h1>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default CafeMenuHero