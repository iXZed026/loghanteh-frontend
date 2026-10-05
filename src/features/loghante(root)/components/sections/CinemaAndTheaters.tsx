import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function CinemaAndTheaters() {

    const t = useTranslations("LoghantehCinemaAndTheaters")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="cinema-and-theaters" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href='/cinema-and-theater'
                textButton={cmT("button.show-more")}
            />
        </section>
    )
}

export default CinemaAndTheaters