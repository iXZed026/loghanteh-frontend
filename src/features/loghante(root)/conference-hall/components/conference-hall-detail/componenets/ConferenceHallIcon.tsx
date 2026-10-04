import React from 'react'
import { MdOutlineReduceCapacity } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'
import { MdOutlineViewQuilt } from 'react-icons/md'
import { ConferenceHallIcon as ConferenceHallIconType } from '../data/conference-hall'

interface ConferenceHallIconProps {
    type: ConferenceHallIconType
    className?: string
}

function ConferenceHallIcon({
    type,
    className,
}: ConferenceHallIconProps) {

    switch (type) {
        case 'capacity':
            return (
                <MdOutlineReduceCapacity
                    className={className}
                />
            )

        case 'area':
            return (
                <TbRulerMeasure
                    className={className}
                />
            )

        case 'layout':
            return (
                <MdOutlineViewQuilt
                    className={className}
                />
            )

        default:
            return null
    }
}

export default ConferenceHallIcon