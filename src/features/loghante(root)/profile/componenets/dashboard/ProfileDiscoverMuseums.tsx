import ArrowIcon from '@/components/shared/ArrowIcon'
import AppImage from '@/components/ui/AppImage'
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'
import React from 'react'

interface IProfileDiscoverMuseums {
    dashboardPageT: TranslationFunction
}

function ProfileDiscoverMuseums({
    dashboardPageT,
}: IProfileDiscoverMuseums) {
    return (
        <div className={cn(
            "py-9.5",
            "grid grid-cols-12",
            "rounded-lg",
            "bg-[var(--gold-opacity-color)]",
            "border-2 border-[var(--gold-opacity-color)]"
        )}
        >
            {/* Loghanteh Logo */}
            < div className={
                cn(
                    "col-span-3",
                    "fcc",
                )
            } >
                <AppLink
                    href="/"
                >

                    <AppImage
                        width={80}
                        height={60}
                        src={"/images/Loghanteh-logo.svg"}
                        alt="loghanteh logo"
                    />
                </AppLink>
            </div >
            <div
                className={cn(
                    "col-span-5 fcol gap-2"
                )}
            >
                <span className='font-semibold text-lg'>
                    {dashboardPageT("discover-museums.title")}
                </span>
                <p className='font-light text-black-light-utility'>
                    {dashboardPageT("discover-museums.sub-title")}
                </p>
            </div>
            <div
                className={cn(
                    "col-span-4 fcc"
                )}
            >
                <AppLink
                    href='/#museums'
                >
                    <Button
                        className={cn(
                            "fcc gap-1",
                            "px-3 py-2.5",
                            "bg-gold-utility",
                            "hover:bg-[var(--gold-hover-color)]"
                        )}
                    >
                        {dashboardPageT("discover-museums.museums-button")}
                        <ArrowIcon />
                    </Button>
                </AppLink>
            </div>

        </div >
    )
}

export default ProfileDiscoverMuseums