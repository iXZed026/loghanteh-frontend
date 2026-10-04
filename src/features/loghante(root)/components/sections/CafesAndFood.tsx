import FadeUp from '@/components/animations/FadeUp'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { defaultTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import {
    cafesAndFoodsContainerVariant,
    cafesAndFoodsVariant,

} from '../../animations/loghante.variants'
import { cafesAndFoods } from '../../data/cafesAndFoods'
import CafesAndFoodsBox from '../CafesAndFoodsBox'
import { useTranslations } from 'next-intl'

function CafesAndFood() {

    const T =
        useTranslations("LoghantehCafeAndFood")

    return (
        <section id="cafes-and-foods" className='loghante-section'>
            <div className='fcol gap-15 text-center mb-20'>
                <FadeUp
                    y={40}
                    once
                >
                    <h2 className={cn(
                        "font-wulkan",
                        "loghante-section-title",
                        "",
                    )}>
                        {T("title")}
                    </h2>
                </FadeUp>
                <FadeUp
                    y={40}
                    transition={verySlowTransitionOut}
                    once
                >
                    <h5 className='text-lg'>
                        {T("description")}
                    </h5>
                </FadeUp>
            </div>
            {/* CARDS */}
            <StaggerWrapper
                className='grid grid-cols-12 md:gap-10 gap-y-15 overflow-hidden'
                variants={cafesAndFoodsContainerVariant}
                once
                amount={0.5}
            >
                {cafesAndFoods.map(CAF => (
                    <div
                        className={cn(
                            "lg:col-span-4 sm:col-span-6 col-span-12",
                            "w-full",
                        )}
                        key={CAF.id}
                    >
                        <FadeUp
                            variants={cafesAndFoodsVariant}
                            transition={defaultTransitionOut}
                            once
                            amount={0.5}
                        >
                            <CafesAndFoodsBox {...CAF} />
                        </FadeUp>
                    </div>
                ))}
            </StaggerWrapper>
        </section>
    )
}

export default CafesAndFood