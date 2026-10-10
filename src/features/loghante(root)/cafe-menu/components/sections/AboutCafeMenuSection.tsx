import AppImage from '@/components/ui/AppImage'
import FadeUp from '@/components/animations/FadeUp'
import { slowTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale } from 'next-intl'
import { cafeMenus } from '../../data/cafe-menus'

interface AboutCafeMenuSectionProps {
    cafeId: number
}

function AboutCafeMenuSection({
    cafeId,
}: AboutCafeMenuSectionProps) {
    const locale = useLocale()

    const cafe = cafeMenus.find(
        (menu) => menu.id === cafeId,
    )

    if (!cafe) {
        return null
    }

    const cafeTitle = getLocalizedValue(
        cafe.about.title,
        locale,
    )

    const cafeDescription = getLocalizedValue(
        cafe.about.description,
        locale,
    )

    return (
        <div
            className="
                min-h-screen
                grid
                grid-cols-12
                lg:gap-15
                gap-y-15
                py-20
            "
        >
            {/* Image */}
            <FadeUp
                once
                transition={verySlowTransitionOut}
                y={100}
                className={cn(
                    'lg:col-span-6 col-span-12',
                    'fcc',
                )}
            >
                <div
                    className="
                        relative
                        w-130
                        h-130
                        max-w-full
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <AppImage
                        src={cafe.about.image}
                        alt={cafeTitle}
                        width={600}
                        height={600}
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />
                </div>
            </FadeUp>

            {/* Content */}
            <div
                className={cn(
                    'lg:col-span-6 col-span-12',
                    'fcc',
                )}
            >
                <div
                    className="
                        lg:w-130
                        lg:text-start
                        text-center
                        fcol
                        gap-15
                    "
                >
                    <FadeUp
                        once
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                    >
                        <h3
                            className="
                                md:text-5xl
                                text-3xl
                                font-bold
                                font-wulkan
                                leading-15
                            "
                        >
                            {cafeTitle}
                        </h3>
                    </FadeUp>

                    <FadeUp
                        once
                        transition={slowTransitionOut}
                        y={60}
                    >
                        <p
                            className="
                                md:text-base
                                text-sm
                                text-black-light-utility
                            "
                        >
                            {cafeDescription}
                        </p>
                    </FadeUp>
                </div>
            </div>
        </div>
    )
}

export default AboutCafeMenuSection

