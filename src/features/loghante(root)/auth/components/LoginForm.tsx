
"use client"

import Modal from "@/components/shared/modal/Modal"
import AppLink from "@/components/ui/AppLink"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Loading from "@/components/ui/Loading"
import useInput from "@/hooks/useInput"
import { login } from "@/lib/api/auth/login"
import { cn } from "@/lib/utils/cn"
import { saveToLocalStorage } from "@/lib/utils/localStorage"
import { useLocale, useTranslations } from "next-intl"
import React, { useState } from "react"

interface ILoginForm {
    googleText: string
}

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}

function LoginForm({ googleText }: ILoginForm) {
    const loginT = useTranslations("authLogin")
    const locale = useLocale()

    const [isLoading, setIsLoading] = useState(false)

    const [modal, setModal] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
        pushUrl: undefined,
    })

    const [
        emailOrPhone,
        ,
        changeEmailOrPhoneValue,
        clearEmailOrPhoneValue,
    ] = useInput("")

    const [
        password,
        ,
        changePasswordValue,
        clearPasswordValue,
    ] = useInput("")

    async function loginSubmitedForm(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault()

        if (isLoading) return

        setIsLoading(true)

        try {
            const response = await login(
                {
                    emailOrPhone,
                    password,
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

                clearPasswordValue()
                return
            }

            saveToLocalStorage(
                "loginVerificationToken",
                response.data.verificationToken,
            )

            saveToLocalStorage(
                "loginVerificationEmail",
                response.data.email,
            )

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: "/login/verify",
            })

            clearEmailOrPhoneValue()
            clearPasswordValue()
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

            <form
                className={cn(
                    "flex w-full flex-col gap-5",
                    "min-h-dvh sm:min-h-0",
                )}
                onSubmit={loginSubmitedForm}
            >
                <div>
                    <span className="text-sm text-black-light-utility">
                        {loginT("inputs.phone-or-email")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm",
                        )}
                        type="text"
                        maxLength={100}
                        value={emailOrPhone}
                        onChange={changeEmailOrPhoneValue}
                    />
                </div>

                <div>
                    <span className="text-sm text-black-light-utility">
                        {loginT("inputs.password")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm",
                        )}
                        type="password"
                        maxLength={100}
                        value={password}
                        onChange={changePasswordValue}
                    />
                </div>

                <div className="text-center text-sm transition-opacity hover:opacity-60">
                    <AppLink href="/login/forgot-password">
                        {loginT("forgot")}
                    </AppLink>
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
                        {isLoading ? (
                            <Loading
                                className="h-12.5 w-full"
                                size={40}
                                color="var(--white-color)"
                            />
                        ) : (
                            loginT("login-button")
                        )}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default LoginForm
