import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function ConferenceHall() {

    const t = useTranslations("LoghantehConferenceHall")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="conference-hall-reservation" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href='/cinema-and-theaters'
                textButton={cmT("button.show-more")}
            />
        </section>
    )
}

export default ConferenceHall