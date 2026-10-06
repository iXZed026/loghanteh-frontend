"use client";

import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import { cn } from "@/lib/utils/cn";
import { IoMdMenu } from "react-icons/io";

interface ProfileMobileHeaderProps {
    activeDashboardHandler: () => void;
}

function ProfileMobileHeader({
    activeDashboardHandler,
}: ProfileMobileHeaderProps) {

    return (
        <header
            className={cn(
                "block",
                "w-full",
                "border-b-2",
                "border-[var(--crimson-color)]",
                "px-5",
                "xl:hidden",
                "md:px-8",
            )}
        >
            <div className="fbc h-20">

                <button
                    type="button"
                    aria-label="Open dashboard menu"
                    onClick={
                        activeDashboardHandler
                    }
                    className="
                        fcc
                        size-11
                        cursor-pointer
                        rounded-xl
                        transition-all
                        duration-150
                        hover:bg-crimson/10
                        active:scale-95
                    "
                >
                    <IoMdMenu className="size-11" />
                </button>

                <AppLink href="/">
                    <AppImage
                        width={60}
                        height={40}
                        src="/images/Loghanteh-logo.svg"
                        alt="Loghanteh logo"
                    />
                </AppLink>

            </div>
        </header>
    );
}

export default ProfileMobileHeader;