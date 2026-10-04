import { cn } from '@/lib/utils/cn'
import ConferenceHallSpaceBox from './ConferenceHallSpaceBox'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { conferenceHallContainerVariant } from '../../animations/loghante.variants'
import { conferenceHalls } from './conference-hall-detail/data/conference-hall'
import { useTranslations } from 'next-intl'

function ConfrenceHallSoace() {

    const conferenceHallHeaderT =
        useTranslations("conferenceHall.space")

    const rows = []

    for (let i = 0; i < conferenceHalls.length; i += 3) {
        rows.push(conferenceHalls.slice(i, i + 3))
    }

    return (
        <div>

            {/* Header */}
            <div className='fcol gap-y-10 text-center mb-10'>
                <h6 className='font-wulkan lg:text-5xl text-3xl'>
                   {conferenceHallHeaderT("title")}
                </h6>

                <span className='text-lg font-medium text-black-light-utility'>
                    {conferenceHallHeaderT("description")}
                </span>
            </div>

            {/* Conference Hall Space Boxes */}
            <div className='fcol gap-y-10'>

                {rows.map((row, rowIndex) => (
                    <StaggerWrapper
                        key={rowIndex}
                        variants={conferenceHallContainerVariant}
                        once
                        className={cn(
                            'grid grid-cols-12',
                            'lg:gap-10 gap-3',
                        )}
                    >
                        {row.map((conferenceHall) => (
                            <ConferenceHallSpaceBox
                                key={conferenceHall.id}
                                conferenceHall={conferenceHall}
                            />
                        ))}
                    </StaggerWrapper>
                ))}

            </div>
        </div>
    )
}

export default ConfrenceHallSoace