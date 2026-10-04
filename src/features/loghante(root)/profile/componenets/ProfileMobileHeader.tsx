import AppImage from '@/components/ui/AppImage'
import { cn } from '@/lib/utils/cn'
import React from 'react'
import { IoMdMenu } from 'react-icons/io'

function ProfileMobileHeader({
    activeDashboardHandler

}: { activeDashboardHandler: () => void }) {
    return (
        <div className={cn(
            "w-full ",
            "px-8",
            "md:hidden block",
            "border-b-2 border-[var(--crimson-color)]"
        )}>
            <div className="fbc h-20">
                <IoMdMenu
                    className='size-12 cursor-pointer click-scale'
                    onClick={activeDashboardHandler}
                />
                <AppImage
                    width={60}
                    height={40}
                    src="/images/loghanteh-logo.svg"
                    alt='loghanteh logo'
                />
            </div>

        </div>
    )
}

export default ProfileMobileHeader