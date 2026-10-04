
import { cn } from "@/lib/utils/cn"
import { useLocale } from "next-intl"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"

function ArrowIcon({ direction }: { direction?: string }) {


    function checkLanguage() {

        const locale = useLocale()

        const leftArrow = <RiArrowLeftSLine className={cn(
            "size-5",
        )} />

        const rightArrow = <RiArrowRightSLine className={cn(
            "size-5",
        )} />

        if (direction) {
            if (direction === "left" && locale === "en") {
                return leftArrow
            }
            return rightArrow
        }
        if (locale === "fa") {
            return leftArrow
        }

        return rightArrow
    }

    return checkLanguage()
}

export default ArrowIcon