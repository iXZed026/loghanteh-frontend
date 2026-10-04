import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function EventsAndCoursesSection() {

    const t = useTranslations("LoghantehEventsAndCourses")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="events-and-courses" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href="/events-and-courses"
                textButton = {cmT("button.show-more")}
            />
        </section>
    )
}

export default EventsAndCoursesSection