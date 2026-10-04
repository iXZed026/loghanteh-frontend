"use client"

import Modal from '@/components/shared/modal/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loading from '@/components/ui/Loading'
import useInput from '@/hooks/useInput'
import { forgetPassword } from '@/lib/api/auth/forgetPassword'
import { cn } from '@/lib/utils/cn'
import { saveToLocalStorage } from '@/lib/utils/localStorage'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}

function ForgotPassword() {

    const forgotPassT =
        useTranslations("authForgotPassword")

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
        emailOrPassword,
        ,
        changeEmailOrPasswordValue,
        clearEmailOrPasswordValue
    ] = useInput("")

    async function submitHandle(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault()

        setIsLoading(true)

        try {

            const response = await forgetPassword(
                {
                    emailOrPhone: emailOrPassword,
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

                return
            }

            saveToLocalStorage(
                "forgetPasswordVerificationToken",
                response.data.verificationToken
            )

            saveToLocalStorage(
                "forgetPasswordVerificationEmail",
                response.data.email
            )

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: "/login/forgot-password/verify",
            })

            clearEmailOrPasswordValue()

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred."

            setModal({
                active: true,
                success: false,
                message,
                pushUrl: undefined,
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
                    setModal(prev => ({
                        ...prev,
                        active: false,
                    }))
                }}
            />

            <form
                onSubmit={submitHandle}
                className={cn(
                    "fcol gap-10"
                )}
            >

                <div className='text-center text-2xl font-semibold'>
                    {forgotPassT("title")}
                </div>

                {/* Email Or Phone */}
                <div>
                    <span className='text-sm text-black-light-utility'>
                        {forgotPassT("inputs.email-or-phone")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="tel"
                        maxLength={220}
                        inputMode="numeric"
                        value={emailOrPassword}
                        onChange={changeEmailOrPasswordValue}
                    />
                </div>

                {/* Submit Button */}
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
                            ? (
                                <Loading
                                    className="w-full h-12"
                                    size={38}
                                    color="var(--white-color)"
                                />
                            )
                            : forgotPassT("submit-button")
                        }
                    </Button>
                </div>

            </form>
        </>
    )
}

export default ForgotPassword