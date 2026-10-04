"use client";

import {
    ReactNode,
    useEffect,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    useHall,
} from "../context/HallProvider";

interface HallGuardProps {
    children: ReactNode;
}

function HallGuard({
    children,
}: HallGuardProps) {

    const router =
        useRouter();

    const params =
        useParams();

    const {
        hallData,
        isReady,
    } = useHall();

    const locale =
        params.locale as string;

    useEffect(() => {

        if (
            isReady &&
            !hallData
        ) {
            router.replace(
                `/${locale}`,
            );
        }

    }, [
        hallData,
        isReady,
        locale,
        router,
    ]);

    if (!isReady) {
        return null;
    }

    if (!hallData) {
        return null;
    }

    return children;
}

export default HallGuard;