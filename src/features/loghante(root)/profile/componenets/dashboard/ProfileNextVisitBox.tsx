import ArrowIcon from '@/components/shared/ArrowIcon';
import AppLink from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations';
import { CiLocationOn } from "react-icons/ci";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoTimeOutline } from "react-icons/io5";

interface IProfileNextVisitBox {
    dashboardPageT: TranslationFunction
}

function ProfileNextVisitBox({
    dashboardPageT,
}: IProfileNextVisitBox) {
    return (
        <div
            className={cn(
                "grid grid-cols-12 gap-5",
                "lg:p-5",
                "border-1 border-[var(--crimson-opacity-color)]",
                "rounded-lg",
                "overflow-hidden"
            )}
        >
            <div className='w-full lg:col-span-4 col-span-5'>
                {/* Image */}
                <div className={cn(
                    "w-full lg:h-45 h-full lg:rounded-xl",
                    "bg-crimson",
                )}></div>
            </div>
            {/* Tour Details */}
            <div className={cn(
                "w-full",
                "lg:py-0 py-5",
                "lg:col-span-8 col-span-7",
                "flex  lg:flex-row flex-col lg:gap-0 gap-4"
            )}>
                <div className='w-full fcol gap-4'>
                    <span className='font-semibold text-lg'>
                        Loghanteh Museum Tour
                    </span>
                    <div className='fcol gap-4 text-sm text-crimson'>
                        <span className='flex items-center gap-1'>
                            <CiLocationOn />
                            Tehran - Loghanteh
                        </span>
                        <span className='flex items-center gap-1'>
                            <IoTimeOutline />
                            14:30
                        </span>
                        <span className='font-semibold'>
                            {dashboardPageT("upcoming-ticket.ticket-details.reservation-code")} 666585
                        </span>
                    </div>
                </div>
                {/* Date And View*/}
                <div className='w-full fcol'>
                    <div className={cn(
                        "font-semibold  text-gold-utility ",
                        "flex lg:flex-col lg:justify-center items-center gap-2",
                        "mb-5"
                    )}>
                        <FaRegCalendarAlt className="lg:size-6 size-5" />
                        <span className='lg:text-5xl'>12</span>
                        <span className='lg:text-xl'>Aug 2026</span>
                    </div>
                    <div className='flex lg:justify-center'>
                        <AppLink
                            href=''
                            className=''>
                            <Button className={cn(
                                "border-1 border-[var(--crimson-color)]",
                                "rounded-lg",
                                "text-black-utility font-medium text-xs",
                                "px-2 py-2",
                                "fcc gap-1",
                                "hover:opacity-75",
                                "click-scale"
                            )}>
                                {dashboardPageT("upcoming-ticket.date-and-views.view-ticket-button")}
                                <ArrowIcon />
                            </Button>
                        </AppLink>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileNextVisitBox