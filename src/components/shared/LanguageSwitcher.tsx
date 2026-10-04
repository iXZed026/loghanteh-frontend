"use client";

import { languages } from "@/data/languages";
import useActive from "@/hooks/useActive";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "next-intl";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { motion } from "framer-motion";
import {
    dropdownVariants,
} from "@/lib/animations/variants";
import {
    IoMdArrowDropdown,
} from "react-icons/io";
import { GrLanguage } from "react-icons/gr";
import {
    getLocalStorageItem,
    saveToLocalStorage,
} from "@/lib/utils/localStorage";
import { useEffect, useRef } from "react";
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import useClickOutside from "@/hooks/useClickOutside";
import {
    getLocalizedValue,
} from "@/lib/utils/getLocalizedValue";
import Button from "../ui/Button";

interface ILanguageSwitcherProps {
    className?: string;
    isScrolled: boolean;
}

function LanguageSwitcher({
    className,
    isScrolled,
}: ILanguageSwitcherProps) {

    const [
        activeLanguageDropDown,
        ,
        UnActiveLanguageDropDownHandler,
        toggleLanguageDropDownHandler,
    ] = useActive(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const dropDownRef =
        useRef<HTMLDivElement | null>(null);

    const locale = useLocale();

    useEffect(() => {

        const lang =
            getLocalStorageItem("lang");

        if (
            lang &&
            lang !== locale
        ) {
            const newPath =
                pathname.replace(
                    `/${locale}`,
                    `/${lang}`,
                );

            const queryString =
                searchParams.toString();

            const finalPath =
                queryString
                    ? `${newPath}?${queryString}`
                    : newPath;

            router.push(
                finalPath,
                {
                    scroll: false,
                }
            );
        }

    }, []);

    function changeLanguage(
        languageCode: string
    ): void {

        saveToLocalStorage(
            "lang",
            languageCode
        );

        const newPath =
            pathname.replace(
                `/${locale}`,
                `/${languageCode}`,
            );

        const queryString =
            searchParams.toString();

        const finalPath =
            queryString
                ? `${newPath}?${queryString}`
                : newPath;

        UnActiveLanguageDropDownHandler();

        router.push(
            finalPath,
            {
                scroll: false,
            }
        );
    }

    useClickOutside(
        dropDownRef,
        UnActiveLanguageDropDownHandler,
    );

    return (
        <div
            className={cn(
                "relative",
                "flex flex-col justify-center",
                "z-20",
                className,
            )}
        >

            {/* BUTTON */}
            <div
                ref={dropDownRef}
                className={cn(
                    "flex items-center justify-center",
                    "gap-1",
                    "md:py-3 py-2",
                    "font-semibold",
                    "cursor-pointer",
                    "transition-all",
                    "click-scale",
                    "bg-crimson",
                    "text-white-utility",

                    !activeLanguageDropDown &&
                    "md:hover:bg-[var(--white-light-color)] hover:bg-[var(--black-light-color)] md:bg-transparent rounded-lg",

                    isScrolled &&
                    "text-gold-utility",

                    activeLanguageDropDown && [
                        "bg-[var(--crimson-color)]",
                        "text-white-utility",
                        "rounded-t-sm",
                    ],
                )}
                onClick={
                    toggleLanguageDropDownHandler
                }
            >
                <GrLanguage />

                {locale.toUpperCase()}

                <IoMdArrowDropdown
                    className={cn(
                        "transition-transform duration-300",
                        activeLanguageDropDown &&
                        "rotate-180",
                    )}
                />
            </div>

            {/* DROPDOWN */}
            <AnimatePresenceWrapper
                isActive={
                    activeLanguageDropDown
                }
            >
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "absolute",
                        "w-full",
                        "flex flex-col items-center",
                        "overflow-hidden",
                        "bg-crimson",
                        "text-white-utility",
                        "shadow-lg",

    
                        "bottom-full",
                        "rounded-t-md",


                        "md:bottom-auto",
                        "md:top-full",
                        "md:rounded-t-none",
                        "md:rounded-b-md",
                    )}
                >
                    {languages.map((lang) => (
                        <Button
                            key={lang.id}
                            className={cn(
                                "w-full",
                                "py-3",
                                "text-center",
                                "text-white-utility",
                                "cursor-pointer",
                                "transition-all",
                                "hover:bg-[#42151A]",
                                "click-scale",
                            )}
                            onClick={() =>
                                changeLanguage(lang.code)
                            }
                        >
                            {getLocalizedValue(
                                lang.name,
                                locale
                            )}
                        </Button>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>

        </div>
    );
}

export default LanguageSwitcher;