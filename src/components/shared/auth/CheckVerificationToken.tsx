"use client"

import {
    ReactNode,
    useEffect,
    useState,
} from "react"

import {
    getLocalStorageItem,
} from "@/lib/utils/localStorage"

import {
    useLocale,
} from "next-intl"

import {
    useRouter,
} from "next/navigation"


interface CheckVerificationTokenProps {
    children: ReactNode
    tokenKey: string
    redirectPath: string
}


function CheckVerificationToken({
    children,
    tokenKey,
    redirectPath,
}: CheckVerificationTokenProps) {

    const router =
        useRouter()

    const locale =
        useLocale()


    const [
        isChecking,
        setIsChecking,
    ] = useState<boolean>(true)


    useEffect(() => {

        const token =
            getLocalStorageItem(tokenKey)


        if (!token) {

            router.replace(
                `/${locale}${redirectPath}`
            )

            return
        }


        setIsChecking(false)

    }, [
        tokenKey,
        redirectPath,
        locale,
        router,
    ])


    if (isChecking) {
        return null
    }


    return children
}


export default CheckVerificationToken