"use client";

import { cn } from "@/lib/utils/cn";
import {
    useLocale,
    useTranslations,
} from "next-intl";

import {
    FaRegCalendarAlt,
    FaRegClock,
} from "react-icons/fa";

import {
    FaLocationDot,
} from "react-icons/fa6";

import AppLink from "@/components/ui/AppLink";

import {
    getLocalizedValue,
} from "@/lib/utils/getLocalizedValue";

import {
    useTicketPayment,
} from "../../context/TicketPaymentContext";

import {
    ticketRules,
} from "../data/ticketRules";

import PaymentHallInfo from "./PaymentHallInfo";

function PaymentTicketInfo() {

    const paymentTicketInfoT =
        useTranslations(
            "payment.ticket-info"
        );

    const locale =
        useLocale();

    const {
        paymentData,
    } = useTicketPayment();

    if (!paymentData) {
        return null;
    }

    const {
        ticket,
        quantity,
        type,
    } = paymentData;

    const startAt =
        new Date(ticket.startAt);

    const formattedDate =
        startAt.toLocaleDateString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
            }
        );

    const formattedTime =
        startAt.toLocaleTimeString(
            locale === "fa"
                ? "fa-IR"
                : "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    const changeRoute =
        type === "museum-tour"
            ? "/museums-tour"
            : type === "events-and-courses"
                ? "/events-and-courses"
                : "/cinema-and-theater";

    return (
        <div
            className={cn(
                "lg:col-span-6",
                "col-span-12",
                "md:p-10",
                "p-6",
                "border border-black-opacity",
                "rounded-2xl",
                "md:text-base",
                "text-sm",
                "bg-white",
            )}
        >

            {/* Header / Date */}
            <div
                className={cn(
                    "flex",
                    "items-start",
                    "justify-between",
                    "gap-5",
                )}
            >

                <div
                    className={cn(
                        "fcol",
                        "items-start",
                        "gap-4",
                        "text-black-light-utility",
                    )}
                >

                    <span className="fcc gap-2">

                        <FaRegCalendarAlt
                            className="shrink-0 text-crimson"
                        />

                        <span>
                            {
                                formattedDate
                            }
                        </span>

                    </span>

                    <span className="fcc gap-2">

                        <FaRegClock
                            className="shrink-0 text-crimson"
                        />

                        <span>
                            {
                                formattedTime
                            }
                        </span>

                    </span>

                </div>

                <AppLink
                    href={changeRoute}
                    className={cn(
                        "shrink-0",
                        "font-semibold",
                        "text-crimson",
                        "hover:text-[var(--crimson-opacity-color)]",
                        "click-scale",
                    )}
                >
                    {
                        paymentTicketInfoT(
                            "ticket-date.change-button"
                        )
                    }
                </AppLink>

            </div>

            <div
                className={cn(
                    "my-8",
                    "h-px",
                    "w-full",
                    "bg-black-opacity",
                )}
            />

            {/* Ticket Information */}
            <div
                className={cn(
                    "fcol",
                    "items-start",
                    "gap-5",
                )}
            >

                {/* Ticket Name */}
                <div className="fcol gap-1">

                    <span
                        className={cn(
                            "text-xs",
                            "text-black-light-utility",
                        )}
                    >
                        {
                            paymentTicketInfoT(
                                "ticket"
                            )
                        }
                    </span>

                    <span
                        className={cn(
                            "md:text-2xl",
                            "text-xl",
                            "font-bold",
                        )}
                    >
                        {
                            ticket.name
                        }
                    </span>

                </div>

                {/* Location */}
                <div
                    className={cn(
                        "fcc",
                        "gap-2",
                        "text-black-light-utility",
                    )}
                >

                    <FaLocationDot
                        className="shrink-0 text-crimson"
                    />

                    <span>
                        {
                            paymentTicketInfoT(
                                "location"
                            )
                        }
                    </span>

                </div>

                {/* Quantity */}
                <div
                    className={cn(
                        "rounded-lg",
                        "bg-black/5",
                        "px-4",
                        "py-2",
                    )}
                >
                    <span>
                        {quantity}{" "}

                        {
                            paymentTicketInfoT(
                                quantity > 1
                                    ? "tickets"
                                    : "ticket"
                            )
                        }
                    </span>
                </div>

            </div>

            {/* Hall */}
            {
                paymentData.hall && (
                    <>
                        <div
                            className={cn(
                                "my-8",
                                "h-px",
                                "w-full",
                                "bg-black-opacity",
                            )}
                        />

                        <PaymentHallInfo />
                    </>
                )
            }

            <div
                className={cn(
                    "my-8",
                    "h-px",
                    "w-full",
                    "bg-black-opacity",
                )}
            />

            {/* Rules */}
            <div>

                <span
                    className={cn(
                        "text-xl",
                        "font-semibold",
                    )}
                >
                    {
                        paymentTicketInfoT(
                            "rules.title"
                        )
                    }
                </span>

                <ul
                    className={cn(
                        "fcol",
                        "gap-4",
                        "py-5",
                        "pl-5",
                        "list-disc",
                        "leading-8",
                        "text-black-light-utility",
                    )}
                >

                    {
                        ticketRules.map(
                            (rule) => (
                                <li
                                    key={rule.id}
                                >
                                    {
                                        getLocalizedValue(
                                            rule.rulesText,
                                            locale
                                        )
                                    }
                                </li>
                            )
                        )
                    }

                </ul>

            </div>

        </div>
    );
}

export default PaymentTicketInfo;