import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa6'

function TicketPaymentSummary() {

    const PaymentSuccessSummaryT =
        useTranslations("paymentSuccess.summary-payment-details")

    return (
        <div className={cn(
            "py-10",
            "flex lg:flex-row flex-col lg:gap-5 gap-y-10"
        )}>
            {/* QR Code */}
            <div className='fcc w-full'>
                <div className='border-2 p-30'>

                </div>
            </div>
            {/* Summary Details */}
            <div className='fcol w-full items-start gap-5'>
                <div>
                    <span className='text-lg'>
                        {PaymentSuccessSummaryT("title")}

                    </span>
                </div>
                <div>
                    <span className='text-5xl text-bold text-crimson'>
                        695554
                    </span>
                </div>
                <div className='w-80'>
                    <span className='text-black-light-utility text-sm'>
                        {PaymentSuccessSummaryT("description")}
                    </span>
                </div>
                <div>
                    <span className='text-lg font-semibold'>
                        Loghanteh Museum Tour
                    </span>
                </div>
                <div className='fcol gap-4 text-sm text-'>
                    <div className='flex gap-2'>
                        <span>
                            <FaCalendarAlt
                                className='size-4 text-crimson'
                            />
                        </span>
                        <span className='text-black-light-utility'>
                            Monday, August 18
                        </span>
                    </div>
                    <div className='flex gap-2'>
                        <span>
                            <FaRegClock
                                className='size-4 text-crimson'
                            />
                        </span>
                        <span className='text-black-light-utility'>
                            Time 12:40 P.M
                        </span>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default TicketPaymentSummary