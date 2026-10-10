"use client"

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper"
import Modal from "@/components/shared/modal/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import useActive from "@/hooks/useActive"
import useClickOutside from "@/hooks/useClickOutside"
import useInput from "@/hooks/useInput"
import { getDiscountCode } from "@/lib/api/discount-codes/discount-codes"
import { cn } from "@/lib/utils/cn"
import { useLocale, useTranslations } from "next-intl"
import { useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { CiDiscount1 } from "react-icons/ci"
import { MdKeyboardArrowDown } from "react-icons/md"
import { motion } from "framer-motion"
import { dropdownVariants } from "@/lib/animations/variants"

interface PaymentDiscoutCodeDropDownProps {
    onDIscountData: (
        data: Awaited<ReturnType<typeof getDiscountCode>>
    ) => void
}

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
}

function PaymentDiscoutCodeDropDown({
    onDIscountData,
}: PaymentDiscoutCodeDropDownProps) {
    const paymentPaymentDetailsDDT = useTranslations(
        "payment.payment-details.drop-down"
    )

    const [
        discountValue,
        ,
        changeDiscountValue,
        clearDiscountValue,
    ] = useInput("")

    const [
        activeDD,
        ,
        unActiveDDHandler,
        toggleDDHandler,
    ] = useActive(false)

    const [isLoading, setIsLoading] = useState(false)

    const [modal, setModal] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
    })

    const locale = useLocale()
    const dropDownRef = useRef<HTMLDivElement | null>(null)

    useClickOutside(dropDownRef, unActiveDDHandler)

    async function applyDiscountHandle() {
        if (isLoading) return

        const code = discountValue.trim()

        if (!code) {
            setModal({
                active: true,
                success: "warning",
                message: "Please enter a discount code.",
            })
            return
        }

        setIsLoading(true)

        try {
            const response = await getDiscountCode(code, locale)

            if (!response.success) {
                setModal({
                    active: true,
                    success: false,
                    message: response.message,
                })
                return
            }

            onDIscountData(response)

            setModal({
                active: true,
                success: true,
                message: response.message,
            })

            clearDiscountValue()
            unActiveDDHandler()
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred."

            setModal({
                active: true,
                success: false,
                message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    function handleDiscountKeyDown(
        event: KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key !== "Enter") return

        event.preventDefault()
        event.stopPropagation()

        void applyDiscountHandle()
    }

    return (
        <>
            <Modal
                active={modal.active}
                message={modal.message}
                success={modal.success}
                onClose={() => {
                    setModal((prev) => ({
                        ...prev,
                        active: false,
                    }))
                }}
            />

            <div
                className="px-5 mb-15"
                ref={dropDownRef}
            >
                <Button
                    type="button"
                    className={cn(
                        "fbc w-full",
                        "py-4",
                        "rounded-md",
                        "text-black-utility",
                        "border-[1px] border-black-opacity",
                        "hover:bg-[var(--crimson-opacity-color)]",
                    )}
                    onClick={toggleDDHandler}
                >
                    <div className="fcc gap-2">
                        <CiDiscount1 className="size-6" />
                        <span>
                            {paymentPaymentDetailsDDT("title")}
                        </span>
                    </div>

                    <motion.div
                        animate={{ rotate: activeDD ? 180 : 0 }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                        }}
                    >
                        <MdKeyboardArrowDown className="size-7" />
                    </motion.div>
                </Button>

                <AnimatePresenceWrapper isActive={activeDD}>
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={cn(
                            "w-full",
                            "fbc gap-5",
                            "mt-3",
                        )}
                    >
                        <Input
                            className={cn(
                                "w-full",
                                "rounded-lg",
                                "border-[1px] border-black-opacity",
                            )}
                            type="text"
                            placeholder={paymentPaymentDetailsDDT(
                                "discount-placeholder"
                            )}
                            value={discountValue}
                            onChange={changeDiscountValue}
                            onKeyDown={handleDiscountKeyDown}
                            disabled={isLoading}
                        />

                        <Button
                            type="button"
                            disabled={isLoading}
                            className={cn(
                                "shrink-0",
                                "text-lg",
                                "py-1 px-5",
                                "bg-crimson",
                                "hover:bg-[var(--crimson-opacity-color)]",
                            )}
                            onClick={applyDiscountHandle}
                        >
                            {paymentPaymentDetailsDDT("apply-button")}
                        </Button>
                    </motion.div>
                </AnimatePresenceWrapper>
            </div>
        </>
    )
}

export default PaymentDiscoutCodeDropDown