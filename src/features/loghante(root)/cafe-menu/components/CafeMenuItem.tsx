import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

import { cafeMenusVariant } from '../../animations/loghante.variants'

interface ICafeMenuItem {
    name: string
    price: number
    image: string
}

function CafeMenuItem({
    name,
    price,
    image,
}: ICafeMenuItem) {
    const commonT = useTranslations('common')

    return (
        <FadeUp
            once={true}
            variants={cafeMenusVariant}
            className={cn(
                'group',
                'col-span-6 sm:col-span-4 lg:col-span-3',
            )}
        >
            <article
                className={cn(
                    'relative h-full overflow-hidden',
                    'rounded-2xl',
                    'border border-black-opacity',
                    'bg-white-utility',
                    'shadow-[0_8px_30px_rgba(22,22,22,0.06)]',
                    'transition-shadow duration-300',
                    'hover:shadow-[0_14px_40px_rgba(92,33,39,0.12)]',
                )}
            >
                {/* Image */}
                <div
                    className={cn(
                        'relative aspect-[4/3]',
                        'overflow-hidden',
                        'bg-white-light-utility',
                    )}
                >
                    <AppImage
                        src={image}
                        width={500}
                        height={375}
                        alt={name}
                        className={cn(
                            'h-full w-full object-cover',
                            'transition-transform duration-500',
                            'group-hover:scale-[1.04]',
                        )}
                    />

                    {/* Price */}
                    <div
                        className={cn(
                            'absolute bottom-3 left-3',
                            'fcol items-center justify-center',
                            'min-w-18',
                            'rounded-xl',
                            'border border-white/30',
                            'bg-crimson',
                            'px-3 py-2',
                            'shadow-lg',
                        )}
                    >
                        <span className="text-sm font-bold leading-5 text-white-utility">
                            {price.toLocaleString()}
                        </span>

                        <span className="text-[10px] leading-4 text-white/75">
                            {commonT('price-type')}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div
                    className={cn(
                        'fbc',
                        'min-h-18',
                        'gap-3',
                        'px-3 py-3',
                        'sm:px-4',
                        'sm:py-4',
                    )}
                >
                    {/* Name */}
                    <div className="min-w-0 flex-1">
                        <span
                            title={name}
                            className={cn(
                                'block',
                                'font-semibold',
                                'leading-6',
                                'text-black-utility',
                                'text-sm sm:text-base',
                                'line-clamp-2',
                                'transition-colors duration-300',
                                'group-hover:text-crimson',
                            )}
                        >
                            {name}
                        </span>
                    </div>

                    {/* Decorative accent */}
                    <span
                        aria-hidden="true"
                        className={cn(
                            'h-8 w-0.75 shrink-0',
                            'rounded-full',
                            'bg-gold-utility',
                            'opacity-70',
                        )}
                    />
                </div>
            </article>
        </FadeUp>
    )
}

export default CafeMenuItem

