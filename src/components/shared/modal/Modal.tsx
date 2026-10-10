"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import { defaultTransitionOut } from "@/lib/animations/transitions";
import { cn } from "@/lib/utils/cn";

export interface IModal {
    active: boolean;
    message: string;
    success: boolean | "warning";
    pushUrl?: string;
    onClose?: () => void;
    clearData?: () => void;
}

function Modal({
    active,
    message,
    success,
    pushUrl,
    onClose,
    clearData,
}: IModal) {
    const locale = useLocale();
    const router = useRouter();
    const handledRef = useRef(false);

    useEffect(() => {
        if (!active) {
            handledRef.current = false;
            return;
        }

        const timeout = window.setTimeout(() => {
            if (handledRef.current) return;

            handledRef.current = true;

            if (success === true && pushUrl) {
                router.push(`/${locale}${pushUrl}`);
                clearData?.();
            }

            onClose?.();
        }, 1500);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [
        active,
        success,
        pushUrl,
        locale,
        router,
        onClose,
        clearData,
    ]);

    return (
        <AnimatePresenceWrapper isActive={active}>
            <motion.div
                initial={{ opacity: 0, top: -10 }}
                animate={{ opacity: 1, top: 20 }}
                exit={{ opacity: 0, top: -10 }}
                transition={defaultTransitionOut}
                className={cn(
                    "fixed left-1/2 top-5 z-[100] -translate-x-1/2",
                    "min-w-85 max-w-[calc(100vw-2rem)] px-7 py-4",
                    "rounded-md border text-center font-semibold",
                    success === true &&
                        "border-[#06582c] bg-[#54cc88]",
                    success === false &&
                        "border-red-800 bg-red-300",
                    success === "warning" &&
                        "border-yellow-800 bg-yellow-300",
                )}
                role="status"
                aria-live="polite"
            >
                {message}
            </motion.div>
        </AnimatePresenceWrapper>
    );
}

export default Modal;
