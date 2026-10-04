import AppImage from '@/components/ui/AppImage'
import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'

function FooterSummery({
    t
}: {
    t: TranslationFunction
}) {
    return (
        <div className={cn(
            "xl:col-span-3 md:col-span-4 col-span-12",
            "fcol gap-10",
        )}>
            <div>
                <AppLink
                    href='/'
                >
                    <AppImage
                        width={92}
                        height={65}
                        alt='loghanteh logo'
                        src="/images/Loghanteh-logo.svg"
                        className='brightness-0 invert'
                    />
                </AppLink>
            </div>
            <div className='text-white-light-utility'>
                <p className='md:text-[16px] text-sm'>
                    {t("summery.description")}
                </p>
            </div>
        </div>
    )
}

export default FooterSummery