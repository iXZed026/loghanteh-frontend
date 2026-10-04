"use client";

import {
    useEffect,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import HallHeader from "@/features/loghante(root)/halls/hall/componenets/HallHeader";
import HallContent from "@/features/loghante(root)/halls/hall/componenets/HallContent";
import HallTicketDetails from "@/features/loghante(root)/halls/hall/componenets/HallTicketDetails";

import HallGuard from "@/features/loghante(root)/halls/componenets/HallGuard";

import {
    halls,
} from "@/features/loghante(root)/halls/data/halls";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";

function HallPage() {

    const locale = useLocale()

    const params =
        useParams();

    const router =
        useRouter();

    const hallId =
        Number(params.id);

    const hall =
        halls.find(
            (item) =>
                item.id === hallId,
        );

    useEffect(() => {

        if (!hall) {
            router.back();
        }

    }, [
        hall,
        router,
    ]);

    if (!hall) {
        return null;
    }

    return (
        <HallGuard>

            <div className="min-h-screen py-30 overflow-x-hidden w-full">

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        px-5
                        fcol
                        gap-y-15
                    "
                >

                    <HallHeader />

                    <HallTicketDetails />

                    <HallContent
                        hallName={getLocalizedValue(hall.hallName,locale)}
                        seats={
                            hall.seats
                        }
                    />

                </div>

            </div>

        </HallGuard>
    );
}

export default HallPage;