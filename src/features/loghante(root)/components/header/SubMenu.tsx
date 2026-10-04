import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  INavLink,
} from "../../data/navLinks";
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import {
  openSlideMenu,
  openSlideMenuFa,
} from "@/lib/animations/variants";
import {
  getLocalizedValue,
} from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";
import {
  TranslationFunction,
} from "@/types/translations";
import ArrowIcon from "@/components/shared/ArrowIcon";

interface ISubMenu {
  link: INavLink;
  UnActiveHumberHandler: () => void;
  activeSubMenu: boolean;
  UnActiveSubMenuHandler: () => void;
  t: TranslationFunction;
}

const subMenuLinkClass = cn(
  "w-full",
  "block",
  "px-7 py-6",
  "border-b border-b-black/25",
  "hover:bg-[var(--white-light-color)]",
  "transition-all",
  "rounded-md",
  "click-scale",
);

function SubMenu({
  link,
  UnActiveHumberHandler,
  activeSubMenu,
  UnActiveSubMenuHandler,
  t,
}: ISubMenu) {

  const locale = useLocale();
  const isFa = locale === "fa";

  return (
    <AnimatePresenceWrapper
      isActive={activeSubMenu}
    >
      <div
        className={cn(
          "absolute top-0",
          "w-full",
          "overflow-hidden",
          isFa
            ? "lg:right-full"
            : "lg:left-full",
        )}
      >
        <motion.div
          variants={
            isFa
              ? openSlideMenuFa
              : openSlideMenu
          }
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            "h-screen",
            "xl:w-140 lg:w-110 w-full",
            "flex flex-col",
            "bg-white-utility",
            "border-l-2 border-black/20",
          )}
        >

          {/* HEADER */}
          <div
            className={cn(
              "shrink-0",
              "py-4 px-7",
              "mb-5",
              "border-b-2",
              "border-[var(--crimson-color)]",
            )}
          >
            <Button
              className={cn(
                "flex items-center",
                "p-0",
                "text-black-utility",
                "hover:opacity-50",
              )}
              onClick={
                UnActiveSubMenuHandler
              }
            >
              <ArrowIcon direction="left" />

              {t("back-button")}
            </Button>
          </div>

          {/* LINKS */}
          <div
            className={cn(
              "flex-1",
              "max-h-[62%]",
              "overflow-y-scroll",
            )}
          >
            {link.museumParts?.map((part) => (
              <AppLink
                key={part.id}
                href={part.href}
                className={subMenuLinkClass}
                onClick={
                  UnActiveHumberHandler
                }
              >
                {getLocalizedValue(
                  part.name,
                  locale
                )}
              </AppLink>
            ))}
          </div>

        </motion.div>
      </div>
    </AnimatePresenceWrapper>
  );
}

export default SubMenu;