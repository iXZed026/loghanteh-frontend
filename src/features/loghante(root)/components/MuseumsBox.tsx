'use client'

import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale, useTranslations } from 'next-intl'
import { IMuseumPart } from '../data/museumParts'
import AppImage from '@/components/ui/AppImage'

type MuseumBoxProps = IMuseumPart

function MuseumsBox({
  href,
  name,
  imageURL,
}: MuseumBoxProps) {

  const locale = useLocale()
 const T = useTranslations("LoghantehMuseums.box")

  const museumName = getLocalizedValue(name, locale)

  return (
    <AppLink
      href={href}
      className="group block h-full"
    >
      <article
        className={cn(
          'relative h-[260px] overflow-hidden rounded-2xl',
          'bg-crimson text-white-utility',
          'shadow-[0_15px_45px_rgba(92,33,39,0.14)]',
          'md:h-[340px]',
          'lg:h-[390px]',
        )}
      >
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <AppImage
            src={imageURL}
            fill
            alt={museumName}
            className={cn(
              'h-full w-full object-cover',
              'transition-transform duration-700 ease-out',
              'group-hover:scale-110',
            )}
          />
        </div>

        {/* Image overlay */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-t',
            'from-black/85 via-black/25 to-black/5',
            'transition-opacity duration-500',
            'group-hover:from-black/90',
          )}
        />

        {/* Top content */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 md:p-6">
          <div
            className={cn(
              'flex h-9 min-w-9 items-center justify-center',
              'rounded-full',
              'border border-gold-utility/50',
              'bg-black/20',
              'px-2.5',
              'font-poppins text-[11px]',
              'text-gold-utility',
              'backdrop-blur-sm',
            )}
          >
            {T("type")}
          </div>

          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center',
              'rounded-full',
              'border border-white/20',
              'bg-black/20',
              'backdrop-blur-sm',
              'transition-colors duration-500',
              'group-hover:border-gold-utility/60',
              'group-hover:bg-gold-utility',
              'group-hover:text-crimson',
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                'h-4 w-4',
                locale === 'fa' && 'rotate-180',
              )}
              aria-hidden="true"
            >
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Center decorative ring */}
        <div
          className={cn(
            'absolute left-1/2 top-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'h-24 w-24 rounded-full',
            'border border-white/20',
            'opacity-0',
            'transition-opacity duration-500',
            'group-hover:opacity-100',
          )}
        />

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-6">
          <div className="mb-2 h-px w-8 bg-gold-utility transition-all duration-500 group-hover:w-14" />

          <h3
            className={cn(
              'font-wulkan',
              'text-xl leading-tight',
              'md:text-2xl lg:text-3xl',
            )}
          >
            {museumName}
          </h3>

          <div
            className={cn(
              'mt-2 flex items-center gap-2',
              'text-xs text-white/70',
              'md:text-sm',
              'transition-colors duration-500',
              'group-hover:text-gold-utility',
            )}
          >
            <span>
                {T("explore")}
            </span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-500',
                locale === 'fa'
                  ? 'rotate-180 group-hover:-translate-x-1'
                  : 'group-hover:translate-x-1',
              )}
              aria-hidden="true"
            >
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Gold hover border */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0',
            'rounded-2xl',
            'border border-transparent',
            'transition-colors duration-500',
            'group-hover:border-gold-utility/40',
          )}
        />
      </article>
    </AppLink>
  )
}

export default MuseumsBox