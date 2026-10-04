"use client"

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper"
import { defaultTransitionOut } from "@/lib/animations/transitions"
import { cn } from "@/lib/utils/cn"
import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export interface IModal {
    active: boolean
    message: string
    success: boolean | "warning"
    pushUrl?: string
    onClose?: () => void
}

function Modal({
    active,
    message,
    success,
    pushUrl,
    onClose,
}: IModal) {

    const locale = useLocale()
    const router = useRouter()

    useEffect(() => {

        if (!active) {
            return
        }

        const timeout =
            setTimeout(() => {

                onClose?.()

                if (
                    success === true &&
                    pushUrl
                ) {
                    router.push(
                        `/${locale}${pushUrl}`,
                    )
                }

            }, 1500)

        return () => {
            clearTimeout(timeout)
        }

    }, [
        active,
        success,
        pushUrl,
        locale,
        router,
        onClose,
    ])

    return (
        <AnimatePresenceWrapper
            isActive={active}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    top: -10,
                }}
                animate={{
                    opacity: 1,
                    top: 20,
                }}
                exit={{
                    opacity: 0,
                    top: -10,
                }}
                transition={defaultTransitionOut}
                className={cn(
                    "min-w-113 py-4 px-4",
                    "text-center font-semibold",
                    "fixed left-1/2 -translate-x-1/2",
                    "top-5",
                    "z-100",
                    "border-[1px]",
                    "rounded-md",

                    success === true &&
                    "border-[#06582c] bg-[#54cc88]",

                    success === false &&
                    "border-red-800 bg-red-300",

                    success === "warning" &&
                    "border-yellow-800 bg-yellow-300",
                )}
            >
                {message}
            </motion.div>
        </AnimatePresenceWrapper>
    )
}

export default Modal