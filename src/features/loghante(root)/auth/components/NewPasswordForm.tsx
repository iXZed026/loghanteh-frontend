"use client"

import Modal from '@/components/shared/modal/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loading from '@/components/ui/Loading'
import useInput from '@/hooks/useInput'

import { newPassword } from '@/lib/api/auth/new-password'

import { cn } from '@/lib/utils/cn'

import {
    getLocalStorageItem,
    removeFromLocalStorage
} from '@/lib/utils/localStorage'

import {
    useLocale,
    useTranslations
} from 'next-intl'

import React, {
    useState
} from 'react'


interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}


function NewPasswordForm() {

    const newPasswordT =
        useTranslations("authNewPassword")

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
        password,
        ,
        changePasswordValue,
        clearPasswordValue,
    ] = useInput("")

    const [
        repeatPassword,
        ,
        changeRepeatPasswordValue,
        clearRepeatPasswordValue,
    ] = useInput("")


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function submitHandle(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault()

        const verificationToken =
            getLocalStorageItem<string>(
                "forgetPasswordVerificationToken"
            )

        /*
        |--------------------------------------------------------------------------
        | Token Not Found
        |--------------------------------------------------------------------------
        */

        if (!verificationToken) {

            setModal({
                active: true,
                success: false,
                message:
                    "Verification session expired or token not found.",
                pushUrl:
                    `/login/forgot-password`,
            })

            return
        }

        setIsLoading(true)

        try {

            const response =
                await newPassword(
                    {
                        verificationToken,
                        password,
                        repeatPassword,
                    },
                    locale
                )

            /*
            |--------------------------------------------------------------------------
            | API Error
            |--------------------------------------------------------------------------
            */

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
            |--------------------------------------------------------------------------
            | Password Successfully Changed
            |--------------------------------------------------------------------------
            */

            removeFromLocalStorage(
                "forgetPasswordVerificationToken"
            )

            removeFromLocalStorage(
                "forgotPasswordUserId"
            )

            removeFromLocalStorage(
                "forgotPasswordEmail"
            )

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: "/login",
            })

            clearPasswordValue()
            clearRepeatPasswordValue()

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

            <div>

                <form
                    onSubmit={submitHandle}
                    className={cn(
                        "fcol gap-10"
                    )}
                >

                    <div className="text-center text-2xl font-semibold">

                        {newPasswordT("title")}

                    </div>

                    {/* New Password */}

                    <div className="fcol gap-5">

                        <div>

                            <span className="text-black-light-utility">

                                {newPasswordT(
                                    "inputs.new-password"
                                )}

                            </span>

                        </div>

                        <Input
                            className={cn(
                                "w-full",
                                "border-b-3 border-[#525252]",
                                "rounded-sm",
                            )}
                            type="password"
                            maxLength={16}
                            value={password}
                            onChange={changePasswordValue}
                        />

                    </div>

                    {/* Repeat Password */}

                    <div className="fcol gap-5">

                        <div>

                            <span className="text-black-light-utility">

                                {newPasswordT(
                                    "inputs.repeat-password"
                                )}

                            </span>

                        </div>

                        <Input
                            className={cn(
                                "w-full",
                                "border-b-3 border-[#525252]",
                                "rounded-sm",
                            )}
                            type="password"
                            maxLength={16}
                            value={repeatPassword}
                            onChange={changeRepeatPasswordValue}
                        />

                    </div>

                    {/* Submit */}

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
                                : newPasswordT("submit-button")
                            }

                        </Button>

                    </div>

                </form>

            </div>
        </>
    )
}

export default NewPasswordForm