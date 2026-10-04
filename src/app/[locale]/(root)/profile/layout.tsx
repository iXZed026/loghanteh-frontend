"use client"
import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper';
import CheckAuthorized from '@/components/shared/auth/CheckAuthorized';
import AppImage from '@/components/ui/AppImage'
import ProfileDashboard from '@/features/loghante(root)/profile/componenets/ProfileDashboard';
import ProfileMobileHeader from '@/features/loghante(root)/profile/componenets/ProfileMobileHeader';
import useActive from '@/hooks/useActive';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils/cn'
import { Children } from '@/types/children'
import { useLocale } from 'next-intl';
import { useRef } from 'react';

function ProfileLayout({
    children
}: {
    children: Children
}) {

    const [
        activeDashboard,
        activeDashboardHandler,
        UnActiveDashboardHandler,
        ,

    ] = useActive(false);

    const divElem =
        useRef<HTMLDivElement | null>(null)

    useClickOutside(
        divElem,
        UnActiveDashboardHandler,
    )

    return (
        <CheckAuthorized>
            <div className='flex'>
                {/* Profile Dashbord */}
                <div className='xl:block hidden'>
                    <ProfileDashboard isActive={activeDashboard} />
                </div>
                <div className='md:hidden block'>
                    {/* BLACK BACKGROUND */}
                    <AnimatePresenceWrapper isActive={activeDashboard}>
                        <div
                            className={cn(
                                "w-full h-[100vh]",
                                "bg-black/70",
                                "text-black-utility md:text-md text-sm",
                                "fixed top-0",
                                "z-40",
                            )}
                        >
                            <ProfileDashboard
                                isActive={activeDashboard}
                                divElem={divElem}
                                UnActiveDashboardHandler={UnActiveDashboardHandler}
                            />
                        </div>
                    </AnimatePresenceWrapper>
                </div>
                <div className='w-full'>
                    {/* Mobile Header */}
                    <ProfileMobileHeader
                        activeDashboardHandler={activeDashboardHandler}
                    />
                    <div className="md:p-8 p-5 md:overflow-y-scroll md:h-screen">
                        {/* Pages */}
                        {children}
                    </div>
                </div>
            </div>
        </CheckAuthorized>
    )
}

export default ProfileLayout