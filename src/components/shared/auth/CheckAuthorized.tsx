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

        /*
         * Do not overwrite the original redirect path
         * while the user is already inside authentication
         * pages.
         *
         * Example:
         *
         * /payment
         *   -> /login
         *   -> /login/verify
         *
         * The redirect must remain /payment.
         */

        const localePrefix =
            `/${locale}`

        const normalizedPath =
            pathname === localePrefix
                ? "/"
                : pathname.startsWith(
                    `${localePrefix}/`,
                )
                    ? pathname.slice(
                        localePrefix.length,
                    )
                    : pathname

        const isAuthRoute =
            normalizedPath === "/login" ||
            normalizedPath.startsWith(
                "/login/",
            ) ||
            normalizedPath === "/register" ||
            normalizedPath.startsWith(
                "/register/",
            )

        if (isAuthRoute) {
            return
        }

        const queryString =
            searchParams.toString()

        const currentPath =
            queryString
                ? `${normalizedPath}?${queryString}`
                : normalizedPath

        saveToLocalStorage(
            AUTH_REDIRECT_KEY,
            currentPath,
        )

        router.replace(
            `/${locale}`,
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
