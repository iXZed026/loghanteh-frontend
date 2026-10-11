import { cn } from '@/lib/utils/cn'
import type { TranslationFunction } from '@/types/translations'
import { ExternalLink, MapPin } from 'lucide-react'

const LOCATION = {
    baladUrl: 'https://balad.ir/embed?p=5Sm0aTTtABEA6a',
    embedUrl: 'https://balad.ir/embed?p=5Sm0aTTtABEA6a',
}

function FooterLocation({
    t,
}: {
    t: TranslationFunction
}) {
    return (
        <div
            className={cn(
                'col-span-12 md:col-span-8 lg:col-span-4 xl:col-span-5',
                'fcol gap-4',
            )}
        >


            <div className="fcol gap-0 overflow-hidden rounded-xl">
                {/* Map */}
                <div
                    className={cn(
                        'relative h-60 w-full overflow-hidden',
                        'border border-white/15 bg-white/10',
                        'sm:h-64 lg:h-60 xl:h-64',
                    )}
                >
                    <iframe
                        title={t('location.map-title')}
                        src={LOCATION.embedUrl}
                        className="absolute inset-0 size-full border-0"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>

                {/* Location information */}
                <a
                    href={LOCATION.baladUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('location.open-map')}
                    className={cn(
                        'group flex items-center justify-between gap-3',
                        'bg-white-utility p-5 sm:p-2',
                        'border border-gold-opacity',
                        'transition-colors duration-300',
                        'hover:bg-white-light-utility',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-gold-utility focus-visible:ring-inset',
                    )}
                >
                    <span className="flex min-w-0 items-center gap-3">
                        <span
                            className={cn(
                                'fcc size-11 shrink-0 rounded-xl',
                                'bg-crimson text-gold-utility',
                                'transition-colors duration-300',
                                'group-hover:bg-hover-crimson',
                            )}
                        >
                            <MapPin size={22} aria-hidden="true" />
                        </span>

                        <span className="min-w-0">
                            <span className="block text-sm font-bold text-black-utility sm:text-base">
                                {t('location.name')}
                            </span>

                            <span className="mt-1 block text-xs leading-5 text-black-light-utility sm:text-sm">
                                {t('location.description')}
                            </span>
                        </span>
                    </span>

                    <span
                        className={cn(
                            'fcc size-9 shrink-0 rounded-lg',
                            'bg-gold-opacity text-crimson',
                            'transition-all duration-300',
                            'group-hover:bg-gold-utility',
                        )}
                    >
                        <ExternalLink
                            size={18}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </span>
                </a>
            </div>
        </div>
    )
}

export default FooterLocation
