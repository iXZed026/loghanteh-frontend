"use client"

import FadeUp from '@/components/animations/FadeUp'
import Container from '@/components/shared/Container'
import WorkShopAndStudiosBox from '@/features/loghante(root)/worshops-and-studios/componenets/WorkShopAndStudiosBox'
import { workshopAndStudios } from '@/features/loghante(root)/worshops-and-studios/data/workshop-and-studios'
import { slowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

function WorkshopsAndStudios() {

    const wsAndStdsT =
        useTranslations("workshopsAndStudios")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Container>
            <div
                className={cn(
                    "py-40",
                    "min-h-screen",
                    "lg:px-30",
                )}
            >

                {/* Header */}
                <div className='fcol gap-10 text-center mb-20'>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                        once
                    >
                        <h2 className='font-wulkan font-bold md:text-5xl text-3xl text-crimson'>
                            {wsAndStdsT("title")}
                        </h2>
                    </FadeUp>

                    <FadeUp
                        transition={slowTransitionOut}
                        y={60}
                        once
                    >
                        <h6 className='md:text-lg text-sm font-medium lg:w-165 mx-auto text-black-light-utility'>
                            {wsAndStdsT("description")}
                        </h6>
                    </FadeUp>
                </div>

                {/* Boxes */}
                <div
                    className={cn(
                        "grid grid-cols-12 gap-5"
                    )}
                >
                    {workshopAndStudios.map((workshop) => (
                        <WorkShopAndStudiosBox
                            key={workshop.id}
                            workshop={workshop}
                        />
                    ))}
                </div>

            </div>
        </Container>
    )
}

export default WorkshopsAndStudios