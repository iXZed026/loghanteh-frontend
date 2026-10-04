"use client"

import {
    ReactNode,
    useEffect,
} from "react"

import {
    useProfile,
} from "@/contexts/ProfileProvider"

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation"

import {
    useLocale,
} from "next-intl"

import {
    saveToLocalStorage,
} from "@/lib/utils/localStorage"

export const AUTH_REDIRECT_KEY =
    "authRedirectPath"

interface CheckAuthorizedProps {
    children: ReactNode
}

function CheckAuthorized({
    children,
}: CheckAuthorizedProps) {

    const locale = useLocale()
    const router = useRouter()

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const {
        isAuthenticated,
        isLoading,
    } = useProfile()

    useEffect(() => {

        if (
            isLoading ||
            isAuthenticated
        ) {
            return
        }

        const queryString =
            searchParams.toString()

        const currentPath =
            queryString
                ? `${pathname}?${queryString}`
                : pathname

        saveToLocalStorage(
            AUTH_REDIRECT_KEY,
            currentPath,
        )

        router.replace(
            `/${locale}/login`,
        )

    }, [
        isLoading,
        isAuthenticated,
        pathname,
        searchParams,
        router,
        locale,
    ])

    if (
        isLoading ||
        !isAuthenticated
    ) {
        return null
    }

    return children
}

export default CheckAuthorized
