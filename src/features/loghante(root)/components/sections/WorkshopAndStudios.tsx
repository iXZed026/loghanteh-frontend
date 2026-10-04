import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function WorkshopAndStudios() {

    const t = useTranslations("LoghantehWSAndStudios")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="workshops_and-sstudios" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                reverse={true}
                href='/workshops-and-studios'
                textButton={cmT("button.show-more")}
            />
        </section>
    )
}

export default WorkshopAndStudios