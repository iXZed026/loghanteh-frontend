import FadeUp from '@/components/animations/FadeUp'
import AppLink from '@/components/ui/AppLink'
import { WorkshopCloseUp } from '../../data/workshop-and-studios'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import {
    slowTransitionOut,
    verySlowTransitionOut
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { useLocale } from 'next-intl'

interface IWorkshopsAndStudiosDetailCompBox {
    closeUp: WorkshopCloseUp
    reverse?: boolean
}

function WorkshopsAndStudiosDetailCompBox({
    closeUp,
    reverse = true,
}: IWorkshopsAndStudiosDetailCompBox) {

    const locale = useLocale()

    const title = getLocalizedValue(
        closeUp.title,
        locale
    )

    const description = getLocalizedValue(
        closeUp.description,
        locale
    )

    return (
        <div
            className={cn(
                "md:flex-row flex flex-col gap-5",
                reverse && "md:flex-row-reverse",
                "lg:px-10 px-5 py-5",
            )}
        >

            {/* Image */}
            <FadeUp
                transition={verySlowTransitionOut}
                y={100}
                className='fcc w-full'
                once
            >
                <div className='bg-crimson lg:w-4/5 w-full lg:h-110 h-90 rounded-xl overflow-hidden'>

                    {/* 
                    closeUp.url currently contains the link.
                    Add AppImage here when actual image data is available.
                    */}

                </div>
            </FadeUp>

            {/* Content */}
            <div className='w-full fcol justify-start md:text-start text-center'>

                <div className='md:py-15 py-7 font-bold w-full'>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                        once
                    >
                        <h5 className='font-wulkan lg:text-5xl md:text-4xl text-3xl leading-13'>
                            {title}
                        </h5>
                    </FadeUp>
                </div>

                <div>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={60}
                        once
                    >
                        <p className='md:text-sm text-xs text-black-light-utility leading-7'>
                            {description}
                        </p>
                    </FadeUp>
                </div>
            </div>

        </div>
    )
}

export default WorkshopsAndStudiosDetailCompBox