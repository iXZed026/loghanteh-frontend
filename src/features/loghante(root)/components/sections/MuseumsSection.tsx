import FadeUp from '@/components/animations/FadeUp'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import {
  fastTransitionOut,
  verySlowTransitionOut,
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import {
  MuseumCardVariant,
  MuseumsCardContainerVariant,
} from '../../animations/loghante.variants'
import { museumParts } from '../../data/museumParts'
import MuseumsBox from '../MuseumsBox'

function MuseumsSection() {
  const t = useTranslations('LoghantehMuseums')

  const mobileRows = []

  for (let i = 0; i < museumParts.length; i += 2) {
    mobileRows.push(museumParts.slice(i, i + 2))
  }

  const desktopRows = []

  for (let i = 0; i < museumParts.length; i += 3) {
    desktopRows.push(museumParts.slice(i, i + 3))
  }

  return (
    <section
      id="museums"
      className="loghante-section xl:px-20"
    >
      {/* Section Header */}
      <div className="mb-12 flex flex-col gap-5 text-center md:mb-16 md:gap-6">
        <FadeUp once y={40}>
          <h2
            className={cn(
              'font-wulkan',
              'loghante-section-title',
              'text-crimson',
              'tracking-wide',
            )}
          >
            {t('title')}
          </h2>
        </FadeUp>

        <FadeUp
          y={40}
          once
          transition={verySlowTransitionOut}
        >
          <h5 className="mx-auto max-w-2xl px-4 text-base leading-8 text-black-light-utility md:text-lg md:leading-9">
            {t('subtitle')}
          </h5>
        </FadeUp>
      </div>

      {/* Mobile + Tablet: 2 columns */}
      <div className="flex flex-col gap-5 md:gap-7 lg:hidden">
        {mobileRows.map((row, rowIndex) => (
          <StaggerWrapper
            key={`mobile-row-${rowIndex}`}
            className="grid grid-cols-12 gap-1 md:gap-7"
            variants={MuseumsCardContainerVariant}
            once
            amount={0.5}
          >
            {row.map((museum) => (
              <FadeUp
                key={museum.id}
                variants={MuseumCardVariant}
                transition={fastTransitionOut}
                once
                amount={0.5}
                className="col-span-6"
              >
                <MuseumsBox {...museum} />
              </FadeUp>
            ))}
          </StaggerWrapper>
        ))}
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden flex-col gap-7 lg:flex">
        {desktopRows.map((row, rowIndex) => (
          <StaggerWrapper
            key={`desktop-row-${rowIndex}`}
            className="grid grid-cols-12 gap-7"
            variants={MuseumsCardContainerVariant}
            once
            amount={0.5}
          >
            {row.map((museum) => (
              <FadeUp
                key={museum.id}
                variants={MuseumCardVariant}
                transition={fastTransitionOut}
                once
                amount={0.5}
                className="col-span-4"
              >
                <MuseumsBox {...museum} />
              </FadeUp>
            ))}
          </StaggerWrapper>
        ))}
      </div>
    </section>
  )
}

export default MuseumsSection