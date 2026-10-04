"use client";

import {
    ReactNode,
    useEffect,
} from "react";

import {
    useLocale,
} from "next-intl";

import {
    useRouter,
} from "next/navigation";

import {
    useTicketPayment,
} from "../../context/TicketPaymentContext";

interface PaymentGuardProps {
    children: ReactNode;
}

function PaymentGuard({
    children,
}: PaymentGuardProps) {

    const router =
        useRouter();

    const locale =
        useLocale();

    const {
        paymentData,
        isReady,
    } = useTicketPayment();

    useEffect(() => {

        if (
            isReady &&
            !paymentData
        ) {
            router.replace(
                `/${locale}`,
            );
        }

    }, [
        isReady,
        paymentData,
        locale,
        router,
    ]);

    if (!isReady) {
        return null;
    }

    if (!paymentData) {
        return null;
    }

    return children;
}

export default PaymentGuard;
