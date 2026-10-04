"use client";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { tickets } from "@/data/tickets";
import AppLink from "@/components/ui/AppLink";
import useActive from "@/hooks/useActive";
import { cn } from "@/lib/utils/cn";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/lib/animations/variants";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { TranslationFunction } from "@/types/translations";

interface ITicketDropDown {
    t?: TranslationFunction;
    isScrolled?: boolean;
    className?: string;
}

function TicketDropDown({
    t,
    isScrolled = false,
    className,
}: ITicketDropDown) {

    const [
        activeTicketDropDown,
        ,
        UnActiveTicketDropDownHandler,
        toggleTicketDropDownHandler,
    ] = useActive(false);

    const locale = useLocale();

    const dropDownRef =
        useRef<HTMLDivElement | null>(null);

    useClickOutside(
        dropDownRef,
        UnActiveTicketDropDownHandler
    );

    const buttonClass = cn(
        "md:py-3 py-2",
        "flex items-center justify-center gap-2",
        "md:font-semibold",

        "bg-crimson",

        isScrolled
            ? "hover:bg-[#936c23]"
            : "hover:bg-[#42151A]",

        isScrolled &&
        "bg-gold-utility",

        activeTicketDropDown &&
        "rounded-none border-b-2",
    );

    return (
        <div
            ref={dropDownRef}
            className={cn(
                "relative",
                className,
            )}
        >

            {/* BUTTON */}
            <Button
                className={cn(
                    "w-full",
                    "text-white-utility",
                    buttonClass,
                )}
                onClick={
                    toggleTicketDropDownHandler
                }
            >
                {t?.("ticket-button") ?? "Tickets"}

                <IoIosArrowDown
                    className={cn(
                        "size-3",
                        "transition-transform duration-300",
                        activeTicketDropDown &&
                        "rotate-180",
                    )}
                />
            </Button>

            {/* DROPDOWN */}
            <AnimatePresenceWrapper
                isActive={activeTicketDropDown}
            >
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "absolute",
                        "w-full",
                        "overflow-hidden",
                        "bg-crimson",
                        "text-center",
                        "text-white-utility",
                        "fcol z-90",

                        "bottom-full",
                        "rounded-t-md",
                        "md:bottom-auto",
                        "md:top-full",
                        "md:rounded-t-none",
                        "md:rounded-b-md",

                        isScrolled &&
                        "bg-gold-utility",
                    )}
                >
                    {tickets.map((ticket) => (
                        <AppLink
                            key={ticket.id}
                            href={`/${ticket.href}`}
                            className={cn(
                                "block w-full",
                                "px-2 py-3",
                                "text-white-utility",
                                "transition-all",

                                isScrolled
                                    ? "hover:bg-[#936c23]/50"
                                    : "hover:bg-[#42151A]/50",
                            )}
                            onClick={
                                UnActiveTicketDropDownHandler
                            }
                        >
                            {getLocalizedValue(
                                ticket.ticketType,
                                locale,
                            )}
                        </AppLink>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>

        </div>
    );
}

export default TicketDropDown;