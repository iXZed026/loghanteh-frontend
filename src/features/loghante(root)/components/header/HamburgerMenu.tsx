"use client";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    openSlideMenu,
    openSlideMenuFa,
} from "@/lib/animations/variants";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";
import NavLinks from "./NavLinks";
import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils/cn";
import { TranslationFunction } from "@/types/translations";
import { useLocale } from "next-intl";
import TicketDropDown from "./TicketDropDown";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppLink from "@/components/ui/AppLink";
import { FiUser } from "react-icons/fi";

interface IHamburgerMenuProps {
    activeHumber: boolean;
    UnActiveHumberHandler: () => void;
    t: TranslationFunction;
    isAuthenticated: boolean;
    isLoading: boolean;
}

function HamburgerMenu({
    activeHumber,
    UnActiveHumberHandler,
    t,
    isAuthenticated,
    isLoading,
}: IHamburgerMenuProps) {

    const divElem = useRef<HTMLDivElement | null>(null);

    const locale = useLocale();

    useClickOutside(
        divElem,
        UnActiveHumberHandler
    );

    return (
        <AnimatePresenceWrapper isActive={activeHumber}>

            {/* BACKDROP */}
            <div
                className={cn(
                    "fixed inset-0 z-40",
                    "w-full h-screen",
                    "bg-black/70",
                    "text-black-utility",
                    "md:text-md text-lg",
                    // "italic font-semibold",
                )}
            >

                {/* SIDEBAR */}
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
                        "fixed top-0 z-50",
                        "h-screen",
                        "sm:w-140 w-full",
                        "bg-white-utility",
                        "shadow-lg",

                        locale === "fa"
                            ? "right-0"
                            : "left-0",


                        "flex flex-col",
                    )}
                >

                    {/* HEADER */}
                    <div
                        className={cn(
                            "shrink-0",
                            "py-4 md:px-7 px-4",
                            "mb-2",
                            "border-b-2 border-[var(--crimson-color)]",
                        )}
                    >
                        <Button
                            className={cn(
                                "flex items-center gap-2",
                                "p-0",
                                "text-black-utility",
                                "hover:opacity-50",
                            )}
                            onClick={UnActiveHumberHandler}
                        >
                            {t("close-button")}

                            <IoMdClose
                                className="size-6 text-crimson"
                            />
                        </Button>
                    </div>

                    {/* NAV LINKS */}

                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <NavLinks
                            UnActiveHumberHandler={
                                UnActiveHumberHandler
                            }
                            t={t}
                        />
                    </div>

                    {/* BOTTOM ACTIONS */}

                    <div
                        className={cn(
                            "shrink-0",
                            "md:hidden flex flex-col gap-3",
                            "md:px-7 px-4",
                            "py-4",
                            "border-t-2",
                            "border-[var(--crimson-color)]",
                            "bg-white-utility",
                            "not-italic md:text-lg text-base z-100",
                        )}
                    >

                        {/* LANGUAGE */}
                        <LanguageSwitcher
                            isScrolled={false}
                            className="w-full"
                        />

                        {/* TICKETS */}
                        <TicketDropDown
                            t={t}
                            isScrolled={false}
                            className="w-full"
                        />

                        {/* LOGIN / PROFILE */}
                        {!isLoading && (
                            isAuthenticated ? (
                                <AppLink
                                    href="/profile"
                                    onClick={UnActiveHumberHandler}
                                    className="w-full"
                                >
                                    <Button
                                        className={cn(
                                            "w-full",
                                            "px-4 md:py-3 py-2",
                                            "flex items-center justify-center gap-2",
                                            "font-semibold",
                                            "border",
                                            "text-black-utility",
                                            "hover:bg-black/5",
                                        )}
                                    >
                                        <FiUser className="size-5" />
                                        Profile
                                    </Button>
                                </AppLink>
                            ) : (
                                <AppLink
                                    href="/login"
                                    onClick={UnActiveHumberHandler}
                                    className="w-full"
                                >
                                    <Button
                                        className={cn(
                                            "w-full",
                                            "px-4 py-3",
                                            "font-semibold",
                                            "border",
                                            "text-black-utility",
                                            "hover:bg-black/5",
                                        )}
                                    >
                                        {t("login-button")}
                                    </Button>
                                </AppLink>
                            )
                        )}

                    </div>

                </motion.div>
            </div>

        </AnimatePresenceWrapper>
    );
}

export default HamburgerMenu;