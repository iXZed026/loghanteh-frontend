import FadeUp from '@/components/animations/FadeUp'
// import AppImage from '@/components/ui/AppImage'
import {
    slowTransitionOut,
    verySlowTransitionOut
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'

interface IAboutLoghantehComponent {
    reverse: boolean;
    title: string;
    description: string;
}

function AboutLoghantehComponent({
    reverse,
    title,
    description,
}: IAboutLoghantehComponent) {
    return (
        <div className='overflow-hidden'>

            <div className={cn(
                "flex flex-col-reverse items-center justify-between xl:gap-10 lg:gap-5 gap-y-15",
                reverse ? "lg:flex-row-reverse" : "lg:flex-row "
            )}>
                {/* Image */}
                <FadeUp
                    className="w-full"
                    transition={verySlowTransitionOut}
                    y={100}
                    once
                >
                    <div className='lg:h-160 h-110'>
                        {/* <AppImage
                    width={500}
                    height={750}
                    alt='about museum'
                    // src="/images/"
                    /> */}
                        {/* Box */}

                        <div className='xl:w-6/7 lg:w-full md:w-5/6 mx-auto h-full bg-crimson rounded-2xl'>

                        </div>
                    </div>
                </FadeUp>
                {/* Content */}
                <div className={cn(
                    "lg:w-full md:w-5/6 ",
                )}>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                        once
                    >
                        <h2 className={cn(
                            "font-wulkan",
                            "leading-12",
                            "loghante-section-title",
                            "mb-8 lg:text-start text-center"
                        )}>
                            {title}
                        </h2>
                    </FadeUp >
                    <FadeUp
                        transition={slowTransitionOut}
                        y={60}
                        once
                    >
                        <h4 className={cn(
                            "leading-7 md:text-start text-center",
                            "text-black-light-utility",
                        )}>
                            {description}
                        </h4>
                    </FadeUp>
                </div>
            </div >
        </div >
    )
}

export default AboutLoghantehComponent