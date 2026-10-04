"use client"

import Modal from '@/components/shared/modal/Modal'
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loading from '@/components/ui/Loading'
import useInput from '@/hooks/useInput'
import { login } from '@/lib/api/auth/login'
import { cn } from '@/lib/utils/cn'
import { saveToLocalStorage } from '@/lib/utils/localStorage'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { GrGoogle } from 'react-icons/gr'

interface ILoginForm {
    googleText: string
}

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}

function LoginForm({
    googleText,
}: ILoginForm) {

    const loginT =
        useTranslations("authLogin")

    const locale =
        useLocale()

    const [isLoading, setIsLoading] =
        useState<boolean>(false)

    const [modal, setModal] =
        useState<IModalState>({
            active: false,
            success: false,
            message: "",
            pushUrl: undefined,
        })

    const [
        emailOrPhone,
        ,
        ChangeEmailOrPhoneValue,
        clearEmailOrPhoneValue,
    ] = useInput("")

    const [
        password,
        ,
        changePasswordValue,
        clearPasswordValue,
    ] = useInput("")

    async function loginSubmitedForm(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault()

        setIsLoading(true)

        try {

            const response = await login(
                {
                    emailOrPhone,
                    password,
                },
                locale
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

            // Save verification token
            saveToLocalStorage(
                "loginVerificationToken",
                response.data.verificationToken
            )

            // Save email for verification page
            saveToLocalStorage(
                "loginVerificationEmail",
                response.data.email
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
                    setModal(prev => ({
                        ...prev,
                        active: false,
                    }))
                }}
            />

            <form
                className={cn(
                    "fcol gap-5"
                )}
                onSubmit={loginSubmitedForm}
            >

                {/* Phone Or Email */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {loginT("inputs.phone-or-email")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="text"
                        maxLength={100}
                        value={emailOrPhone}
                        onChange={ChangeEmailOrPhoneValue}
                    />
                </div>

                {/* Password */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {loginT("inputs.password")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="password"
                        maxLength={100}
                        value={password}
                        onChange={changePasswordValue}
                    />
                </div>

                {/* Forget Password */}
                <div className="text-sm text-center hover:opacity-60 transition-all">
                    <AppLink
                        href="/login/forgot-password"
                    >
                        {loginT("forgot")}
                    </AppLink>
                </div>

                {/* Sign In With Google */}
                <div className="border-2 border-black/30 h-12.5 rounded-lg fcc gap-3 text-sm">
                    <GrGoogle className="size-4 text-purple-500" />

                    <span>
                        {googleText}
                    </span>
                </div>

                {/* Login Button */}
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
                            : loginT("login-button")
                        }
                    </Button>
                </div>

            </form>
        </>
    )
}

export default LoginForm