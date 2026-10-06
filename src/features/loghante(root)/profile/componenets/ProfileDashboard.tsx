"use client";

import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import ProfileDashboardLinks from "./ProfileDashboardLinks";
import { IoIosLogOut } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";
import {
    openSlideMenu,
    openSlideMenuFa,
} from "@/lib/animations/variants";
import { motion } from "framer-motion";
import { RefObject } from "react";
import { useProfile } from "@/contexts/ProfileProvider";

interface IProfileDashboard {
    isActive: boolean;
    divElem?: RefObject<HTMLDivElement | null>;
    UnActiveDashboardHandler?: () => void;
}

function ProfileDashboard({
    isActive,
    divElem,
    UnActiveDashboardHandler,
}: IProfileDashboard) {

    const dashboardLinksT =
        useTranslations("profileDashboard");

    const locale = useLocale();

    const {
        profile,
        logout,
    } = useProfile();

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            variants={
                locale !== "fa"
                    ? openSlideMenu
                    : openSlideMenuFa
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={divElem}
            className={cn(
                "w-90",
                "min-h-screen",
                "bg-white-utility",
                "border-black/30",
                locale === "fa"
                    ? "border-l"
                    : "border-r",

                /*
                 * Mobile / Tablet drawer.
                 */
                isActive
                    ? locale === "fa"
                        ? "fixed top-0 right-0 z-50"
                        : "fixed top-0 left-0 z-50"
                    : "xl:block hidden",
            )}
        >
            <div
                className={cn(
                    "fcol",
                    "min-h-screen",
                    "justify-between",
                    "p-5",
                    "md:p-8.5",
                )}
            >

                <div className="fcol gap-10">

                    {/* Header */}
                    <div className="fbc">

                        <AppLink href="/">
                            <AppImage
                                width={80}
                                height={60}
                                src="/images/Loghanteh-logo.svg"
                                alt="Loghanteh logo"
                            />
                        </AppLink>

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={
                                UnActiveDashboardHandler
                            }
                            className={cn(
                                "flex items-center justify-center",
                                "size-9",
                                "cursor-pointer",
                                "rounded-lg",
                                "transition-opacity",
                                "duration-200",
                                "hover:opacity-65",
                                "active:scale-95",
                                "xl:hidden",
                            )}
                        >
                            <IoMdClose className="size-6" />
                        </button>

                    </div>

                    {/* User Name */}
                    <span
                        className={cn(
                            "truncate",
                            "text-lg",
                            "font-semibold",
                            "text-crimson",
                        )}
                    >
                        {profile?.full_name?.toUpperCase()}
                    </span>

                    {/* Dashboard Links */}
                    <ProfileDashboardLinks
                        UnActiveDashboardHandler={
                            UnActiveDashboardHandler
                        }
                    />

                </div>

                {/* Logout */}
                <Button
                    type="button"
                    className={cn(
                        "flex",
                        "w-full",
                        "items-center",
                        "gap-3",
                        "px-5",
                        "font-semibold",
                        "text-black-utility",
                        "transition-all",
                        "duration-300",
                        "active:pl-1",
                        "hover:pl-7",
                    )}
                    onClick={logoutHandler}
                >
                    <IoIosLogOut
                        className="
                            size-6
                            text-crimson
                        "
                    />

                    {dashboardLinksT("logout")}
                </Button>

            </div>
        </motion.div>
    );
}

export default ProfileDashboard;