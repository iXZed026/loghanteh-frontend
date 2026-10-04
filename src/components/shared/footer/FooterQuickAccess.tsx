import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'

function FooterQuickAccess({
    t
}: {
    t: TranslationFunction
}) {
    return (
        <div
            className={
                cn(
                    "xl:col-span-2 md:col-span-4 col-span-6",
                    "fcol gap-10",
                )
            }
        >
            <div>
                <h5 className='font-semibold md:text-lg '>
                    {t("quick-access.title")}
                </h5>
            </div>
            <div>
                <ul className='fcol gap-4 md:text-[16px] text-sm'>
                    <li
                    >
                        <AppLink
                            href='#hero'
                            className='transition-all hover:opacity-50'
                        >
                            {t("quick-access.links.home")}
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='#about'
                            className='transition-all hover:opacity-50'
                        >
                            {t("quick-access.links.about")}
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='#museums'
                            className='transition-all hover:opacity-50'
                        >
                            {t("quick-access.links.museums")}
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='/shop'
                            className='transition-all hover:opacity-50'
                        >
                            {t("quick-access.links.shop")}
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='/virtual-tour'
                            className='transition-all hover:opacity-50'
                        >
                            {t("quick-access.links.virtual-tour")}
                        </AppLink>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default FooterQuickAccess