import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'
import React from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'

function FooterContact({
    t
}: {
    t: TranslationFunction
}) {
    return (
        <div
            className={cn(
                "xl:col-span-2 md:col-span-4 col-span-6",
                "fcol gap-10",
            )}
        >
            <div>
                <h4 className='font-semibold md:text-lg'>
                    {t("contacts.title")}
                </h4>
            </div>
            <div>
                <ul className='fcol gap-4 md:text-[16px] text-sm'>
                    <li className='flex items-center gap-2'>
                        <BsFillTelephoneFill className='size-5' />
                        <a href="phone:021-65555555">
                            {t("contacts.list-items.phone")}
                        </a>
                    </li>
                    <li className='flex items-center gap-2'>
                        <MdAccessTime className='size-5' />
                        <span>
                            {t("contacts.list-items.opening-hours")}
                        </span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaLocationDot className='size-5' />
                        <span>
                            {t("contacts.list-items.address")}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterContact