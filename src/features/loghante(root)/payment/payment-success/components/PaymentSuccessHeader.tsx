import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import { IoMdCheckmark, IoMdDownload } from 'react-icons/io'
import { MdOutlinePictureAsPdf } from 'react-icons/md'

function PaymentSuccessHeader() {

    const PaymentSuccessT =
        useTranslations("paymentSuccess.payment-success")

    return (
        <div className={cn(
            "fcol justify-center items-center gap-7.5 shadow-xl",
            "py-10",
        )}>
            <div className='fcc p-5 bg-gold-opacity rounded-full'>
                <IoMdCheckmark className='size-11 text-crimson' />
            </div>
            <div>
                <span className='font-wulkan text-4xl text-crimson'>
                    {PaymentSuccessT("tank-you")}
                </span>
            </div>
            <div>
                <p className='md:w-140 w-full text-center'>
                    {PaymentSuccessT("description")}

                </p>
            </div>
            <div>
                <Button className={cn(
                    "fcc gap-2",
                    "py-3 px-3",
                    "bg-crimson",
                    "md:text-base font-semibold text-sm",
                    "hover:bg-[var(--crimson-hover-color)]"
                )}>
                    <span>
                        <MdOutlinePictureAsPdf className='size-5' />
                    </span>
                    <span>
                        {PaymentSuccessT("download-pdf-button")}
                    </span>
                    <span>
                        <IoMdDownload className='size-5' />
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default PaymentSuccessHeader