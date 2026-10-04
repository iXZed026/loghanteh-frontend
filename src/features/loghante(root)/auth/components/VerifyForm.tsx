"use client"

import Modal from "@/components/shared/modal/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import useInput from "@/hooks/useInput"

import { verifyLogin } from "@/lib/api/auth/verifyLogin"
import { verifyRegister } from "@/lib/api/auth/verifyRegister"
import { verifyForgetPassword } from "@/lib/api/auth/verify-forgot-password"

import { cn } from "@/lib/utils/cn"

import {
    getLocalStorageItem,
    removeFromLocalStorage,
    saveToLocalStorage,
} from "@/lib/utils/localStorage"

import {
    useProfile,
} from "@/contexts/ProfileProvider"

import {
    useLocale,
    useTranslations,
} from "next-intl"

import React, {
    useEffect,
    useState,
} from "react"

import {
    AUTH_REDIRECT_KEY,
} from "@/components/shared/auth/CheckAuthorized"
import Loading from "@/components/ui/Loading"

interface IVerifyForm {
    mode:
    | "login"
    | "register"
    | "forgot-password"
}

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}

function VerifyForm({
    mode,
}: IVerifyForm) {

    const verifyT =
        useTranslations("authVerify")

    const locale =
        useLocale()

    const {
        setProfile,
    } = useProfile()

    const [
        isLoading,
        setIsLoading,
    ] = useState(false)

    const [
        sendingTo,
        setSendingTo,
    ] = useState("")

    const [
        modal,
        setModal,
    ] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
        pushUrl: undefined,
    })

    const [
        verify,
        ,
        changeVerifyValue,
        clearVerifyValue,
    ] = useInput("")

    /*
     * LocalStorage keys
     */

    const tokenKey =
        mode === "login"
            ? "loginVerificationToken"
            : mode === "register"
                ? "registerVerificationToken"
                : "forgetPasswordVerificationToken"

    const emailKey =
        mode === "login"
            ? "loginVerificationEmail"
            : mode === "register"
                ? "registerVerificationEmail"
                : "forgetPasswordVerificationEmail"

    /*
     * Default redirect path
     *
     * Modal adds the locale itself.
     */

    const defaultRedirectPath =
        mode === "login"
            ? "/login"
            : mode === "register"
                ? "/register"
                : "/login/forgot-password"

    /*
     * Get verification email
     */

    useEffect(() => {

        const email =
            getLocalStorageItem<string>(
                emailKey,
            )

        if (email) {
            setSendingTo(email)
        }

    }, [
        emailKey,
    ])

    /*
     * Get the path that the user should
     * return to after successful login.
     */

    const getAuthRedirectPath = () => {

        if (mode !== "login") {
            return defaultRedirectPath
        }

        const storedPath =
            getLocalStorageItem<string>(
                AUTH_REDIRECT_KEY,
            )

        if (!storedPath) {
            return defaultRedirectPath
        }

        /*
         * Only internal paths are allowed.
         */

        if (!storedPath.startsWith("/")) {

            removeFromLocalStorage(
                AUTH_REDIRECT_KEY,
            )

            return defaultRedirectPath
        }

        /*
         * Remove the current locale because
         * Modal adds it before navigation.
         *
         * /en/payment     -> /payment
         * /fa/payment     -> /payment
         */

        const localePrefix =
            `/${locale}`

        const normalizedPath =
            storedPath === localePrefix
                ? "/"
                : storedPath.startsWith(
                    `${localePrefix}/`,
                )
                    ? storedPath.slice(
                        localePrefix.length,
                    )
                    : storedPath

        removeFromLocalStorage(
            AUTH_REDIRECT_KEY,
        )

        return normalizedPath || "/"
    }

    /*
     * Submit verification
     */

    async function submitVerify(
        e: React.FormEvent<HTMLFormElement>,
    ) {

        e.preventDefault()

        const verificationToken =
            getLocalStorageItem<string>(
                tokenKey,
            )

        /*
         * Verification token not found
         */

        if (!verificationToken) {

            setModal({
                active: true,
                success: false,
                message:
                    "Verification session expired or token not found.",
                pushUrl: defaultRedirectPath,
            })

            return
        }

        setIsLoading(true)

        try {

            /*
             * LOGIN
             */

            if (mode === "login") {

                const response =
                    await verifyLogin(
                        {
                            verificationToken,
                            code: verify,
                        },
                        locale,
                    )

                if (!response.success) {

                    setModal({
                        active: true,
                        success: false,
                        message: response.message,
                        pushUrl: undefined,
                    })

                    return
                }

                saveToLocalStorage(
                    "accessToken",
                    response.data.accessToken,
                )

                setProfile({
                    user_Id:
                        response.data.userId,
                    full_name:
                        response.data.fullName,
                    email:
                        response.data.email,
                    phone_number:
                        response.data.phoneNumber,
                    dob: "",
                })

                removeFromLocalStorage(
                    tokenKey,
                )

                clearVerifyValue()

                const redirectPath =
                    getAuthRedirectPath()

                setModal({
                    active: true,
                    success: true,
                    message: response.message,
                    pushUrl: redirectPath,
                })

                return
            }

            /*
             * REGISTER
             */

            if (mode === "register") {

                const response =
                    await verifyRegister(
                        {
                            verificationToken,
                            code: verify,
                        },
                        locale,
                    )

                if (!response.success) {

                    setModal({
                        active: true,
                        success: false,
                        message: response.message,
                        pushUrl: undefined,
                    })

                    return
                }

                removeFromLocalStorage(
                    tokenKey,
                )

                clearVerifyValue()

                setModal({
                    active: true,
                    success: true,
                    message: response.message,
                    pushUrl: "/login",
                })

                return
            }

            /*
             * FORGOT PASSWORD
             */

            const response =
                await verifyForgetPassword(
                    {
                        verificationToken,
                        code: verify,
                    },
                    locale,
                )

            if (!response.success) {

                setModal({
                    active: true,
                    success: false,
                    message: response.message,
                    pushUrl: undefined,
                })

                return
            }

            /*
             * Keep forgetPasswordVerificationToken
             * because NewPasswordForm still needs it.
             */

            saveToLocalStorage(
                "forgotPasswordUserId",
                String(response.data.userId),
            )

            saveToLocalStorage(
                "forgotPasswordEmail",
                response.data.email,
            )

            clearVerifyValue()

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl:
                    "/login/forgot-password/verify/new-password",
            })

        } finally {

            setIsLoading(false)
        }
    }

    return (
        <>
            <Modal
                active={modal.active}
                message={modal.message}
                success={modal.success}
                pushUrl={modal.pushUrl}
                onClose={() => {
                    setModal((prev) => ({
                        ...prev,
                        active: false,
                    }))
                }}
            />

            <div>

                <form
                    className={cn(
                        "fcol gap-10",
                    )}
                    onSubmit={submitVerify}
                >

                    <div
                        className="
                            text-center
                            text-2xl
                            font-semibold
                        "
                    >
                        {verifyT("title")}
                    </div>

                    <div>

                        <div
                            className="
                                text-center
                                mb-10
                            "
                        >
                            <span
                                className="
                                    text-black-light-utility
                                "
                            >
                                {verifyT("sent-message")}
                                {" "}
                                {sendingTo}
                            </span>
                        </div>

                        <Input
                            className={cn(
                                "w-full",
                                "border-b-3",
                                "border-[#525252]",
                                "rounded-sm",
                                "italic",
                            )}
                            type="text"
                            maxLength={6}
                            inputMode="numeric"
                            value={verify}
                            onChange={
                                changeVerifyValue
                            }
                        />

                    </div>

                    <div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "h-12.5 w-full",
                                "bg-crimson",
                                "font-bold",
                                "hover:opacity-85",
                            )}
                        >
                            {isLoading
                                ? <Loading
                                    className="w-full h-12,5"
                                    size={40}
                                    color="var(--white-color)"
                                />
                                : verifyT(
                                    "verify-button",
                                )}
                        </Button>

                    </div>

                </form>

            </div>
        </>
    )
}

export default VerifyForm