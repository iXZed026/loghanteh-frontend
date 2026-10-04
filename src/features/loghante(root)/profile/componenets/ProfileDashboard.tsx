"use client"

import AppImage from '@/components/ui/AppImage'
import Button from '@/components/ui/Button'
import Modal, { IModal } from '@/components/shared/modal/Modal'
import { cn } from '@/lib/utils/cn'
import ProfileDashboardLinks from './ProfileDashboardLinks';
import { IoIosLogOut } from "react-icons/io";
import { useLocale, useTranslations } from 'next-intl';
import { openSlideMenu, openSlideMenuFa } from '@/lib/animations/variants';
import { motion } from "framer-motion";
import { RefObject, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useProfile } from '@/contexts/ProfileProvider';
import { useRouter } from 'next/navigation';

interface IProfileDashboard {
    isActive: boolean;
    divElem?: RefObject<HTMLDivElement | null>;
    UnActiveDashboardHandler?: () => void
}


function ProfileDashboard({
    isActive,
    divElem,
    UnActiveDashboardHandler,
}: IProfileDashboard) {

    const dashboardLinksT = useTranslations("profileDashboard")
    const locale = useLocale()

    const router = useRouter()

    const {
        profile,
        logout,
    } = useProfile()



    async function logoutHandler() {
        try {
            await logout()

        } catch (err) {
            console.log(err)
        }
    }


    return (

        <motion.div
            variants={
                locale !== "fa" ?
                    openSlideMenu :
                    openSlideMenuFa
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
                "w-90",
                "bg-white-utility",
                "min-h-screen",
                " border-black/30",
                locale === "fa" ? "border-l-1" : "border-r-1",
                isActive
                    ? locale === "fa"
                        ? "fixed top-0 right-0"
                        : "fixed top-0 left-0"
                    : "md:block hidden",
            )}
            ref={divElem}
        >
            <div className={cn(
                "p-8.5",
                "fcol justify-between",
                "min-h-screen",
            )}>

                <div className='fcol gap-10'>

                    <div className='fbc'>
                        <AppImage
                            width={80}
                            height={60}
                            src="/images/Loghanteh-logo.svg"
                            alt='loghante logo'
                        />

                        <IoMdClose
                            className={cn(
                                "size-6",
                                "transition-all",
                                "hover:opacity-65",
                                "click-scale",
                                "cursor-pointer",
                                "md:hidden"
                            )}
                            onClick={UnActiveDashboardHandler}
                        />
                    </div>

                    <span className='font-semibold text-lg text-crimson'>
                        {profile?.full_name.toUpperCase()}
                    </span>

                    <ProfileDashboardLinks
                        UnActiveDashboardHandler={UnActiveDashboardHandler}
                    />

                </div>

                <div>
                    <div>
                        <Button
                            className={cn(
                                "w-full",
                                "px-5",
                                "text-black-utility font-semibold",
                                "flex items-center gap-3",
                                "transition-all duration-300",
                                "active:pl-1",
                                "hover:pl-7",
                            )}
                            onClick={logoutHandler}
                        >
                            <IoIosLogOut className='size-6 text-crimson' />
                            {dashboardLinksT("logout")}
                        </Button>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default ProfileDashboard

