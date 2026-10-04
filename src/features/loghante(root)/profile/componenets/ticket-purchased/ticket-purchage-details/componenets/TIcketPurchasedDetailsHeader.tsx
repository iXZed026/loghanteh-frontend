'use client'

import { useTranslations } from 'next-intl'

function TIcketPurchasedDetailsHeader() {
  const t = useTranslations('ticketPurchasedDetails.header')

  return (
    <div className="mb-18">
      <h2 className="text-2xl font-medium md:text-4xl">
        {t('title')}
      </h2>
    </div>
  )
}

export default TIcketPurchasedDetailsHeader