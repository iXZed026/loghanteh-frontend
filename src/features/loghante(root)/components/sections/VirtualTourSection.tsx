import { useTranslations } from 'next-intl'
import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'

function VirtualTourSection() {

    const t = useTranslations("LoghantehVirtualTour")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="virtual-tour" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href='/cinema-and-theaters'
                textButton={cmT("button.show-more")}
                reverse
            />
        </section>
    )
}

export default VirtualTourSection