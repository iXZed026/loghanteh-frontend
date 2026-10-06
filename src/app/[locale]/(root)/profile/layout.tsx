"use client";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import CheckAuthorized from "@/components/shared/auth/CheckAuthorized";
import ProfileDashboard from "@/features/loghante(root)/profile/componenets/ProfileDashboard";
import ProfileMobileHeader from "@/features/loghante(root)/profile/componenets/ProfileMobileHeader";
import useActive from "@/hooks/useActive";
import useClickOutside from "@/hooks/useClickOutside";
import { Children } from "@/types/children";
import { useRef } from "react";

function ProfileLayout({
    children,
}: {
    children: Children;
}) {

    const [
        activeDashboard,
        activeDashboardHandler,
        UnActiveDashboardHandler,
    ] = useActive(false);

    const divElem =
        useRef<HTMLDivElement | null>(null);

    useClickOutside(
        divElem,
        UnActiveDashboardHandler,
    );

    return (
        <CheckAuthorized>
            <div className="flex">

                {/* Desktop Dashboard */}
                <div className="hidden xl:block">
                    <ProfileDashboard
                        isActive={false}
                    />
                </div>

                {/* Mobile / Tablet Dashboard */}
                <div className="block xl:hidden">
                    <AnimatePresenceWrapper
                        isActive={activeDashboard}
                    >
                        <div
                            className="
                                fixed
                                inset-0
                                z-40
                                h-screen
                                w-full
                                bg-black/70
                            "
                        >
                            <ProfileDashboard
                                isActive={
                                    activeDashboard
                                }
                                divElem={divElem}
                                UnActiveDashboardHandler={
                                    UnActiveDashboardHandler
                                }
                            />
                        </div>
                    </AnimatePresenceWrapper>
                </div>

                {/* Content */}
                <div className="w-full min-w-0">

                    {/* Mobile / Tablet Header */}
                    <ProfileMobileHeader
                        activeDashboardHandler={
                            activeDashboardHandler
                        }
                    />

                    <div
                        className="
                            p-5
                            md:h-screen
                            md:overflow-y-auto
                            md:p-8
                        "
                    >
                        {children}
                    </div>

                </div>

            </div>
        </CheckAuthorized>
    );
}

export default ProfileLayout;