
"use client"

import Modal from "@/components/shared/modal/Modal"
import Button from "@/components/ui/Button"
import Loading from "@/components/ui/Loading"
import { cn } from "@/lib/utils/cn"
import { formatPrice } from "@/lib/utils/formatPrice"
import { calculateDiscountPrice } from "@/lib/utils/calculateDiscountPrice"

import { useState } from "react"

import {
    useLocale,
    useTranslations,
} from "next-intl"

import PaymentDiscoutCodeDropDown from "./PaymentDiscoutCodeDropDown"

import {
    createSeatBooking,
} from "@/lib/api/ticket/booking-seat"

import {
    createBooking,
} from "@/lib/api/ticket/booking"

import {
    useTicketPayment,
} from "../../context/TicketPaymentContext"

import type {
    DiscountCodeResponse,
} from "@/lib/api/discount-codes/discount-codes"

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
    clearData?: () => void
}

function PaymentDetails() {
    const paymentPaymentDetailsT =
        useTranslations("payment.payment-details")

    const commonT =
        useTranslations("common")

    const locale =
        useLocale()

    const {
        paymentData,
        clearPaymentData,
    } = useTicketPayment()

    const [
        paymentMethod,
        setPaymentMethod,
    ] = useState<string>("")

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState<boolean>(false)

    const [
        discountData,
        setDiscountData,
    ] = useState<DiscountCodeResponse | null>(null)

    const [
        modal,
        setModal,
    ] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
        pushUrl: undefined,
        clearData: undefined,
    })

    if (!paymentData) {
        return null
    }

    const {
        ticket,
        quantity,
    } = paymentData

    const unitPrice =
        ticket.price ?? 0

    const totalPrice =
        unitPrice * quantity

    const discount = discountData?.success
        ? calculateDiscountPrice({
            price: totalPrice,
            discountPercent:
                discountData.data.discountPercent,
            maxDiscountAmount:
                discountData.data.maxDiscountAmount,
        })
        : {
            originalPrice: totalPrice,
            discountAmount: 0,
            finalPrice: totalPrice,
        }

    const discountedPrice =
        discount.finalPrice

    const discountAmount =
        discount.discountAmount

    const vat =
        discountedPrice * 0.1

    const payable =
        discountedPrice + vat

    async function submitHandler() {
        if (quantity < 1 || isSubmitting) {
            return
        }

        if (!paymentMethod) {
            setModal({
                active: true,
                success: "warning",
                message: "Please select a payment method.",
            })

            return
        }

        setIsSubmitting(true)

        try {
            let response

            if (paymentData?.hall) {
                const seatIds =
                    paymentData.hall.seatsNumbs.map(
                        (seat) => seat.seatId,
                    )

                if (seatIds.length === 0) {
                    setModal({
                        active: true,
                        success: false,
                        message: "No seats selected.",
                    })

                    return
                }

                response = await createSeatBooking(
                    {
                        sessionId: ticket.sessionId,
                        seatIds,
                        discountCodeId:
                            discountData?.data.discountCodeId,
                    },
                    locale,
                )
            } else {
                response = await createBooking(
                    {
                        sessionId: ticket.sessionId,
                        quantity,
                        discountCodeId:
                            discountData?.data.discountCodeId,
                    },
                    locale,
                )
            }

            if (!response.success) {
                setModal({
                    active: true,
                    success: false,
                    message: response.message,
                })

                return
            }

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: "/profile/ticket-purchased",
                clearData: clearPaymentData,
            })
        } catch (error) {
            setModal({
                active: true,
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An error occurred while creating the booking.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    function getDiscountData(
        data: DiscountCodeResponse,
    ) {
        setDiscountData(data)
    }

    return (
        <>
            <Modal
                active={modal.active}
                message={modal.message}
                success={modal.success}
                pushUrl={modal.pushUrl}
                clearData={modal.clearData}
                onClose={() => {
                    setModal((prev) => ({
                        ...prev,
                        active: false,
                    }))
                }}
            />

            <div
                className={cn(
                    "lg:col-span-6 col-span-12",
                    "md:p-10 p-8",
                    "border-[1px] border-black-opacity",
                    "rounded-xl",
                    "md:text-base text-sm",
                    "pb-28 md:pb-10",
                )}
            >
                {/* Payment Details */}
                <div>
                    <span className="text-xl font-semibold">
                        {paymentPaymentDetailsT("title")}
                    </span>
                </div>

                {/* Ticket Details */}
                <div className="fcol py-5 px-5">
                    <div
                        className={cn(
                            "py-10",
                            "border-b-[1px]",
                            "border-black-opacity",
                        )}
                    >
                        {/* Ticket Price */}
                        <div className="fbc mb-5">
                            <span className="w-full">
                                {paymentPaymentDetailsT(
                                    "ticket-details.ticket",
                                )}{" "}
                                {formatPrice(unitPrice)}
                                {commonT("price-type")}
                            </span>

                            <span className="w-full text-center">
                                {quantity}{" "}
                                {paymentPaymentDetailsT(
                                    "ticket-details.ticket-count",
                                )}
                            </span>

                            <span className="w-full text-end">
                                {formatPrice(totalPrice)}
                                {commonT("price-type")}
                            </span>
                        </div>

                        {/* Discount */}
                        {discountAmount > 0 && (
                            <div className="fbc mb-5 text-crimson">
                                <span className="w-full">
                                    Discount
                                </span>

                                <span className="w-full text-center">
                                    {discountData?.data.discountPercent}%
                                </span>

                                <span className="w-full text-end">
                                    -{formatPrice(discountAmount)}
                                    {commonT("price-type")}
                                </span>
                            </div>
                        )}

                        {/* VAT */}
                        <div className="fbc">
                            <span className="w-full">
                                {paymentPaymentDetailsT(
                                    "ticket-vat.ticket-vat",
                                )}
                            </span>

                            <span className="w-full text-center">
                                10%
                            </span>

                            <span className="w-full text-end">
                                {formatPrice(vat)}
                                {commonT("price-type")}
                            </span>
                        </div>
                    </div>

                    {/* Payable */}
                    <div className="py-10 fbc">
                        <span className="font-bold text-xl">
                            {paymentPaymentDetailsT("payable")}
                        </span>

                        <span className="text-xl font-bold text-crimson">
                            {formatPrice(payable)}
                            {commonT("price-type")}
                        </span>
                    </div>
                </div>

                {/* Discount Code */}
                <PaymentDiscoutCodeDropDown
                    onDIscountData={getDiscountData}
                />

                {/* Payment Method */}
                <div
                    className={cn(
                        "fcol",
                        "items-start",
                        "gap-10",
                        "mb-15",
                    )}
                >
                    <div>
                        <span className="text-xl">
                            {paymentPaymentDetailsT(
                                "payment-method.title",
                            )}
                        </span>
                    </div>

                    <div
                        className={cn(
                            "fcol",
                            "items-start",
                            "gap-5",
                        )}
                    >
                        <label
                            className={cn(
                                "flex items-center gap-2",
                                "cursor-pointer",
                            )}
                        >
                            <input
                                type="radio"
                                name="payment-method"
                                value="saman"
                                checked={paymentMethod === "saman"}
                                onChange={(event) =>
                                    setPaymentMethod(event.target.value)
                                }
                            />

                            <span>
                                {paymentPaymentDetailsT(
                                    "payment-method.saman",
                                )}
                            </span>
                        </label>

                        <label
                            className={cn(
                                "flex items-center gap-2",
                                "cursor-pointer",
                            )}
                        >
                            <input
                                type="radio"
                                name="payment-method"
                                value="another"
                                checked={paymentMethod === "another"}
                                onChange={(event) =>
                                    setPaymentMethod(event.target.value)
                                }
                            />

                            <span>
                                {paymentPaymentDetailsT(
                                    "payment-method.another",
                                )}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Payment Button */}
                <div
                    className={cn(
                        "fixed",
                        "bottom-0",
                        "left-0",
                        "right-0",
                        "z-50",
                        "bg-white",
                        "sm:static",
                        "md:p-0",
                        "md:bg-transparent",
                        "md:z-auto",
                    )}
                >
                    <Button
                        type="button"
                        onClick={submitHandler}
                        disabled={isSubmitting}
                        className={cn(
                            "w-full",
                            "fbc",
                            "font-bold",
                            "px-4 md:py-4 py-5",
                            "bg-crimson",
                            "md:rounded-lg rounded-none",
                            "hover:bg-[var(--crimson-hover-color)]",
                            isSubmitting &&
                                "opacity-60 cursor-not-allowed",
                        )}
                    >
                        <span>
                            {isSubmitting ? (
                                <Loading
                                    className="w-full"
                                    size={40}
                                    color="var(--white-color)"
                                />
                            ) : (
                                paymentPaymentDetailsT("payment-button")
                            )}
                        </span>

                        <span>
                            {formatPrice(payable)}
                            {commonT("price-type")}
                        </span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default PaymentDetails
