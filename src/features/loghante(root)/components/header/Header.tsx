"use client";

import Container from "@/components/shared/Container";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";
import { useProfile } from "@/contexts/ProfileProvider";
import {
  getHeaderBackground,
  getLayoutVisibility,
} from "@/features/loghante(root)/utils/layout";
import useActive from "@/hooks/useActive";
import useScroll from "@/hooks/useScroll";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import HamburgerMenu from "./HamburgerMenu";
import TicketDropDown from "./TicketDropDown";

function Header() {
  const t = useTranslations("LoghantehHeader");
  const locale = useLocale();
  const pathname = usePathname();

  const {
    isAuthenticated,
    isLoading,
  } = useProfile();

  const isScrolled = useScroll(150);

  const {
    hideHeader,
  } = getLayoutVisibility(
    pathname,
    locale,
  );

  const [
    activeHumber,
    activeHumberHandler,
    UnActiveHumberHandler,
  ] = useActive(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-30",
        "w-full h-[80px]",
        "py-3",
        "select-none",
        "text-white-utility",
        "text-xs sm:text-sm md:text-md",
        "transition-all duration-300 ease-in-out",
        hideHeader
          ? "hidden"
          : getHeaderBackground(
              pathname,
              locale,
              isScrolled,
            ),
      )}
    >
      <Container>
        <div className="grid grid-cols-12">
          {/* LEFT */}
          <div className="col-span-4 flex items-center gap-2">
            {/* Hamburger */}
            <IoIosMenu
              className={cn(
                "sm:size-11 size-15",
                "cursor-pointer",
                "click-scale",
                "transition-all",
                "hover:opacity-50",
                isScrolled && "text-gold-utility",
              )}
              onClick={activeHumberHandler}
            />

            {/* Desktop Auth */}
            {isLoading ? (
              <Skeleton
                className={cn(
                  "hidden md:block",
                  "h-10 w-16",
                  "rounded-md",
                  isScrolled
                    ? "bg-gold-utility/20"
                    : "bg-white/20",
                )}
              />
            ) : isAuthenticated ? (
              <AppLink href="/profile">
                <Button
                  className={cn(
                    "hidden md:flex",
                    "size-10 p-0",
                    "items-center justify-center",
                    "hover:bg-white/35",
                    isScrolled && "text-gold-utility",
                  )}
                  aria-label="Profile"
                >
                  <FiUser className="size-5" />
                </Button>
              </AppLink>
            ) : (
              <AppLink href="/login">
                <Button
                  className={cn(
                    "hidden md:block",
                    "px-4 py-2",
                    "font-semibold",
                    "border",
                    "hover:bg-white/35",
                    isScrolled && "text-gold-utility",
                  )}
                >
                  {t("login-button")}
                </Button>
              </AppLink>
            )}

            {/* Desktop Language */}
            <div className="hidden md:block">
              <LanguageSwitcher
                isScrolled={isScrolled}
                className="w-20"
              />
            </div>
          </div>

          {/* LOGO */}
          <div className="col-span-4 fcc">
            <AppLink href="/">
              <AppImage
                width={70}
                height={50}
                priority
                src="/images/Loghanteh-logo.svg"
                alt="loghante icon"
                className={cn(
                  "w-[55px] h-auto",
                  "md:w-[70px]",
                  "brightness-0 invert",
                )}
              />
            </AppLink>
          </div>

          {/* RIGHT */}
          <div className="col-span-4 fec gap-2">
            {/* Desktop Tickets */}
            <div className="hidden md:block">
              <TicketDropDown
                t={t}
                isScrolled={isScrolled}
                className="w-40"
              />
            </div>

            {/* Shop */}
            <AppLink href="/shop">
              <Button
                className={cn(
                  "w-22 md:w-25",
                  "fcc gap-2",
                  "py-2 md:py-3",
                  "md:font-semibold",
                  "bg-crimson",
                  isScrolled
                    ? "hover:bg-[#936c23]"
                    : "hover:bg-[#42151A]",
                  isScrolled && "bg-gold-utility",
                )}
              >
                <FiShoppingBag className="size-4" />
                {t("shop-button")}
              </Button>
            </AppLink>
          </div>
        </div>
      </Container>

      {/* Hamburger */}
      <HamburgerMenu
        activeHumber={activeHumber}
        UnActiveHumberHandler={UnActiveHumberHandler}
        t={t}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
    </header>
  );
}

export default Header;
