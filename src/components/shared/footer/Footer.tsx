"use client"

import Container from '../Container'
import { cn } from '@/lib/utils/cn'
import FooterSummery from './FooterSummery'
import FooterQuickAccess from './FooterQuickAccess'
import FooterContact from './FooterContact'
import FooterLocation from './FooterLocation'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { getLayoutVisibility } from '@/features/loghante(root)/utils/layout'

const LOCATION_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'مجموعه فرهنگی و تاریخی لقانطه',
    alternateName: [
        'Loghanteh Historical and Cultural Complex',
        'Loghanteh Cafe Museum',
        'کافه موزه لقانطه',
    ],
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tehran',
        addressCountry: 'IR',
    },
    hasMap: 'https://balad.ir/embed?p=5Sm0aTTtABEA6a',
    availableLanguage: ['fa', 'en'],
}

function Footer() {
    const t = useTranslations('footer')
    const locale = useLocale()
    const pathname = usePathname()

    const { hideFooter } = getLayoutVisibility(
        pathname,
        locale,
    )

    if (hideFooter) {
        return null
    }

    return (
        <footer
            id="footer"
            className={cn(
                'bg-crimson',
                'text-white-utility',
            )}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(LOCATION_SCHEMA),
                }}
            />

            <Container>
                <div
                    className={cn(
                        'grid grid-cols-12 md:gap-10 gap-y-20',
                        'py-10',
                    )}
                >
                    <FooterSummery t={t} />
                    <FooterQuickAccess t={t} />
                    <FooterContact t={t} />
                    <FooterLocation t={t} />
                </div>
            </Container>

            <div className="bg-[#3A3A3A] py-2 text-center">
                <Container>
                    <span className="md:text-[16px] text-xs">
                        {t("privacy.message")}
                    </span>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
