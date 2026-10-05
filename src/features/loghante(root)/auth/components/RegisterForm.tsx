"use client"

import Modal from '@/components/shared/modal/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loading from '@/components/ui/Loading'
import useInput from '@/hooks/useInput'
import { register } from '@/lib/api/auth/register'
import { cn } from '@/lib/utils/cn'
import { saveToLocalStorage } from '@/lib/utils/localStorage'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { GrGoogle } from 'react-icons/gr'

interface IRegisterForm {
    googleText: string
}

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}

function RegisterForm({
    googleText
}: IRegisterForm) {

    const locale = useLocale()

    const RegisterT =
        useTranslations("authRegister")

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
        fullName,
        ,
        changeFullNameValue,
        clearFullNameValue,
    ] = useInput("")

    const [
        phone,
        setPhone,
        ,
        clearFhoneValue,
    ] = useInput("")

    const [
        email,
        ,
        changeEmailValue,
        clearEmailValue,
    ] = useInput("")

    const [
        password,
        ,
        changePasswordValue,
        clearPasswordValue,
    ] = useInput("")

    const [
        repPassword,
        ,
        changeRepPasswordValue,
        clearRepPasswordValue,
    ] = useInput("")

    async function registerSubmitForm(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault()

        setIsLoading(true)

        try {

            const response = await register(
                {
                    fullName,
                    phoneNumber: phone,
                    email,
                    password,
                    repeatPassword: repPassword,
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

            // Save verification token
            saveToLocalStorage(
                "registerVerificationToken",
                response.data.verificationToken
            )

            // Save email for verification page
            saveToLocalStorage(
                "registerVerificationEmail",
                email
            )

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: "/register/verify",
            })

            clearFullNameValue()
            clearFhoneValue()
            clearEmailValue()
            clearPasswordValue()
            clearRepPasswordValue()

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
                onSubmit={registerSubmitForm}
            >

                {/* Full Name */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {RegisterT("inputs.name")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="text"
                        maxLength={100}
                        value={fullName}
                        onChange={changeFullNameValue}
                    />
                </div>

                {/* Phone */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {RegisterT("inputs.phone")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="tel"
                        maxLength={11}
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => {

                            const value =
                                e.target.value.replace(/\D/g, "")

                            setPhone(value)
                        }}
                    />
                </div>

                {/* Email */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {RegisterT("inputs.email")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="text"
                        maxLength={150}
                        value={email}
                        onChange={changeEmailValue}
                    />
                </div>

                {/* Password */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {RegisterT("inputs.password")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        maxLength={16}
                        type="password"
                        value={password}
                        onChange={changePasswordValue}
                    />
                </div>

                {/* Repeat Password */}
                <div>
                    <span className="text-sm text-black-light-utility">
                        {RegisterT("inputs.rep-password")}
                    </span>

                    <Input
                        className={cn(
                            "w-full",
                            "border-b-3 border-[#525252]",
                            "rounded-sm"
                        )}
                        type="password"
                        maxLength={16}
                        value={repPassword}
                        onChange={changeRepPasswordValue}
                    />
                </div>

                {/* Privacy */}
                <div className="text-center text-sm">
                    <span>
                        {RegisterT("policy")}
                    </span>
                </div>

                {/* Sign In With Google */}
                {/* <div className="border-2 border-black/30 h-12.5 rounded-lg fcc gap-3 text-sm">
                    <GrGoogle className="size-4 text-purple-500" />

                    <span>
                        {googleText}
                    </span>
                </div> */}

                {/* Register Button */}
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
                            : RegisterT("submit-button")
                        }
                    </Button>
                </div>

            </form>
        </>
    )
}

export default RegisterForm