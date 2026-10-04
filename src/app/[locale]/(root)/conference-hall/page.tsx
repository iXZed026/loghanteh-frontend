import Container from '@/components/shared/Container'
import ConferenceHallHeader from '@/features/loghante(root)/conference-hall/components/ConferenceHallHeader'
import ConferenceHallSoace from '@/features/loghante(root)/conference-hall/components/ConferenceHallSoace'
import React from 'react'

function ConferenceHall() {
    return (
        <Container>
            <div className='min-h-screen xl:px-36 py-30 fcol gap-y-20'>
                <ConferenceHallHeader />
                <ConferenceHallSoace />
            </div>
        </Container>
    )
}

export default ConferenceHall