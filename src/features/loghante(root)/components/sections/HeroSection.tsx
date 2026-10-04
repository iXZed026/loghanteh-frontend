import Container from '@/components/shared/Container'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

function HeroSection() {

    const t = useTranslations("LoghantehHero")

    return (
        <section id="hero" className='relative h-screen select-none'>
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source
                    src="/videos/loghanteh/hero/loghante-hero-video.mp4"
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
                            {t("video-title")}
                        </h1>

                        <p className="mt-4 text-md md:text-xl scale-y-85">
                            {t("video-description")}
                        </p>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default HeroSection