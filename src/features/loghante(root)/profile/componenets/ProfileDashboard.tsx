"use client";

import {
    useCallback,
    useState,
    type RefObject,
} from "react";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IoIosLogOut } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/shared/modal/Modal";

import { cn } from "@/lib/utils/cn";
import {
    openSlideMenu,
    openSlideMenuFa,
} from "@/lib/animations/variants";

import { useProfile } from "@/contexts/ProfileProvider";
import ProfileDashboardLinks from "./ProfileDashboardLinks";

interface IProfileDashboard {
    isActive: boolean;
    divElem?: RefObject<HTMLDivElement | null>;
    UnActiveDashboardHandler?: () => void;
}

interface IModalState {
    active: boolean;
    success: boolean | "warning";
    message: string;
    pushUrl?: string;
    clearData?: () => void;
}

function ProfileDashboard({
    isActive,
    divElem,
    UnActiveDashboardHandler,
}: IProfileDashboard) {
    const dashboardLinksT = useTranslations("profileDashboard");
    const locale = useLocale();

    const { profile, logout, clearSession } = useProfile();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [modal, setModal] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
    });

    const closeModal = useCallback(() => {
        setModal((previous) => ({
            ...previous,
            active: false,
        }));
    }, []);

    const logoutHandler = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        try {
            await logout();

            setModal({
                active: true,
                success: true,
                message: dashboardLinksT("logout-success"),
                pushUrl: "/",
                clearData: clearSession,
            });
        } catch (error) {
            console.error("Logout failed:", error);

            setModal({
                active: true,
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Logout failed. Please try again.",
            });
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            <Modal
                active={modal.active}
                message={modal.message}
                success={modal.success}
                pushUrl={modal.pushUrl}
                clearData={modal.clearData}
                onClose={closeModal}
            />

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
                    locale === "fa" ? "border-l" : "border-r",
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
                                onClick={UnActiveDashboardHandler}
                                className={cn(
                                    "flex size-9 items-center justify-center",
                                    "cursor-pointer rounded-lg",
                                    "transition-opacity duration-200",
                                    "hover:opacity-65 active:scale-95",
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
                        disabled={isLoggingOut}
                        className={cn(
                            "flex w-full items-center gap-3 px-5",
                            "font-semibold text-black-utility",
                            "transition-all duration-300",
                            "active:pl-1 hover:pl-7",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                        )}
                        onClick={logoutHandler}
                    >
                        {isLoggingOut ? (
                            <Loading
                                className="size-6"
                                size={24}
                                color="var(--crimson-color)"
                            />
                        ) : (
                            <IoIosLogOut className="size-6 text-crimson" />
                        )}

                        {dashboardLinksT("logout")}
                    </Button>
                </div>
            </motion.div>
        </>
    );
}

export default ProfileDashboard;
