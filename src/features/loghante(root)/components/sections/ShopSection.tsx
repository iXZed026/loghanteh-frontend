import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function ShopSection() {

    const t = useTranslations("LoghantehShop")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="shop" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                reverse={true}
                href='/shop'
                textButton={cmT("button.show-more")}
            />
        </section>
    )
}

export default ShopSection