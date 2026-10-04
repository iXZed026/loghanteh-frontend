import { useTranslations } from 'next-intl'
import React from 'react'
import AboutLoghantehComponent from '../AboutLoghantehComponent'

function AboutMuseums() {

    const t = useTranslations("LoghantehAbout")

    return (
        <div id="about" className='xl:px-20 loghante-section'>
            <AboutLoghantehComponent
                reverse={false}
                title={t("about.title")}
                description={t("about.description")}
            />
            <br /> <br />

            <AboutLoghantehComponent
                reverse={true}
                title={t("history.title")}
                description={t("history.description")}
            />
        </div>
    )
}

export default AboutMuseums