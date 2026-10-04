import React from 'react'
import ConferenceHallHeaderImages from './ConferenceHallHeaderImages'
import { cn } from '@/lib/utils/cn'
import ConfrenceHallHeaderDetail from './ConfrenceHallHeaderDetail'
import { ConferenceHall } from '../data/conference-hall'

interface ConfrenceHallHeaderProps {
    conferenceHall: ConferenceHall
}

function ConfrenceHallHeader({
    conferenceHall,
}: ConfrenceHallHeaderProps) {

    return (
        <div
            className={cn(
                'grid grid-cols-12 lg:gap-20',
                'lg:px-25'
            )}
        >
            <ConferenceHallHeaderImages
                conferenceHall={conferenceHall}
            />

            <ConfrenceHallHeaderDetail
                conferenceHall={conferenceHall}
            />
        </div>
    )
}

export default ConfrenceHallHeader