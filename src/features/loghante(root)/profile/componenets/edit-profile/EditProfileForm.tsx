"use client"

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useProfile } from '@/contexts/ProfileProvider'
import useInput from '@/hooks/useInput'
import { cn } from '@/lib/utils/cn'
import { useLocale, useTranslations } from 'next-intl'
import React, { FormEvent, useEffect, useState } from 'react'
import { editProfile } from '@/lib/api/profile/editProfile'
import Modal from '@/components/shared/modal/Modal'
import Loading from '@/components/ui/Loading'

interface IModalState {
    active: boolean
    success: boolean | "warning"
    message: string
    pushUrl?: string
}

function EditProfileForm() {

    const editProfileT = useTranslations("profileEdit")
    const locale = useLocale()

    const {
        profile,
        setProfile,
    } = useProfile()

    const [loading, setLoading] = useState(false)

    const [modal, setModal] =
        useState<IModalState>({
            active: false,
            success: false,
            message: "",
            pushUrl: undefined,
        })

    const [
        fullNameValue,
        setFullNameValue,
    ] = useInput(profile?.full_name ?? "")

    const [
        phoneValue,
        setPhoneValue,
    ] = useInput(profile?.phone_number ?? "")

    const [
        emailValue,
        setEmailValue,
    ] = useInput(profile?.email ?? "")

    const [
        currentPasswordValue,
        setCurrentPasswordValue,
    ] = useInput("")

    const [
        newPasswordValue,
        setNewPasswordValue,
    ] = useInput("")

    const [
        dayValue,
        setDayValue,
    ] = useInput("")

    const [
        monthValue,
        setMonthValue,
    ] = useInput("")

    const [
        yearValue,
        setYearValue,
    ] = useInput("")

    const [isDirty, setIsDirty] = useState(false)

    useEffect(() => {

        if (!profile) return

        setFullNameValue(profile.full_name ?? "")
        setPhoneValue(profile.phone_number ?? "")
        setEmailValue(profile.email ?? "")

        if (profile.dob) {

            const [
                year,
                month,
                dayWithTime,
            ] = profile.dob.split("-")

            const day = dayWithTime.split("T")[0]

            setYearValue(year)
            setMonthValue(month)
            setDayValue(day)

        } else {

            setYearValue("")
            setMonthValue("")
            setDayValue("")

        }

    }, [
        profile,
        setFullNameValue,
        setPhoneValue,
        setEmailValue,
        setYearValue,
        setMonthValue,
        setDayValue,
    ])

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault()

        if (!isDirty || loading) return

        try {

            setLoading(true)

            const response = await editProfile(
                {
                    fullName: fullNameValue,
                    email: emailValue,
                    phoneNumber: phoneValue,
                    dob:
                        yearValue &&
                            monthValue &&
                            dayValue
                            ? `${yearValue}-${monthValue}-${dayValue}`
                            : "",
                    currentPassword: currentPasswordValue,
                    newPassword: newPasswordValue,
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

            // Update profile context immediately
            if (profile) {

                setProfile({
                    ...profile,
                    full_name: fullNameValue,
                    email: emailValue,
                    phone_number: phoneValue,
                    dob:
                        yearValue &&
                            monthValue &&
                            dayValue
                            ? `${yearValue}-${monthValue}-${dayValue}`
                            : null,
                })

            }

            // Clear password fields after successful update
            setCurrentPasswordValue("")
            setNewPasswordValue("")

            setIsDirty(false)

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: undefined,
            })

        } catch (error) {

            console.error(error)

        } finally {

            setLoading(false)

        }
    }

    const handleChange = (
        setter: React.Dispatch<React.SetStateAction<string>>,
        value: string
    ) => {

        setter(value)
        setIsDirty(true)

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

            <form onSubmit={handleSubmit}>

                <div className="fcol gap-5 lg:w-111 md:w-75 w-full">

                    {/* Full Name */}
                    <div className="fcol gap-2.5 text-sm">

                        <span>
                            {editProfileT("inputs.full-name.title")}
                        </span>

                        <Input
                            className={cn(
                                "border-b-2 border-black-utility rounded-b-sm"
                            )}
                            maxLength={200}
                            type="text"
                            value={fullNameValue}
                            onChange={(e) =>
                                handleChange(
                                    setFullNameValue,
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Phone */}
                    <div className="fcol gap-2.5 text-sm">

                        <span>
                            {editProfileT("inputs.phone.title")}
                        </span>

                        <Input
                            className={cn(
                                "border-b-2 border-black-utility rounded-b-sm"
                            )}
                            maxLength={11}
                            inputMode="numeric"
                            value={phoneValue}
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(/\D/g, "")

                                handleChange(
                                    setPhoneValue,
                                    value
                                )
                            }}
                        />

                    </div>

                    {/* Email */}
                    <div className="fcol gap-2.5 text-sm">

                        <span>
                            {editProfileT("inputs.email.title")}
                        </span>

                        <Input
                            className={cn(
                                "border-b-2 border-black-utility rounded-b-sm"
                            )}
                            maxLength={250}
                            type="email"
                            value={emailValue}
                            onChange={(e) =>
                                handleChange(
                                    setEmailValue,
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Current Password */}
                    <div className="fcol gap-2.5 text-sm">

                        <span>
                            Current Password
                        </span>

                        <Input
                            className={cn(
                                "border-b-2 border-black-utility rounded-b-sm"
                            )}
                            maxLength={16}
                            type="password"
                            value={currentPasswordValue}
                            onChange={(e) =>
                                handleChange(
                                    setCurrentPasswordValue,
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* New Password */}
                    <div className="fcol gap-2.5 text-sm">

                        <span>
                            New Password
                        </span>

                        <Input
                            className={cn(
                                "border-b-2 border-black-utility rounded-b-sm"
                            )}
                            maxLength={16}
                            type="password"
                            value={newPasswordValue}
                            onChange={(e) =>
                                handleChange(
                                    setNewPasswordValue,
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Date Of Birth */}
                    <div className="fcol gap-2.5 text-sm">

                        <span>
                            {editProfileT("inputs.date.title")}
                        </span>

                        <div className="fbc gap-3">

                            {/* Day */}
                            <Input
                                className="h-10 border border-black-light-utility rounded-xl px-2 py-5 text-sm"
                                maxLength={2}
                                placeholder={editProfileT(
                                    "inputs.date.day"
                                )}
                                value={dayValue}
                                inputMode="numeric"
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(/\D/g, "")

                                    handleChange(
                                        setDayValue,
                                        value
                                    )
                                }}
                            />

                            {/* Month */}
                            <Input
                                className="h-10 border border-black-light-utility rounded-xl px-2 py-5 text-sm"
                                maxLength={2}
                                placeholder={editProfileT(
                                    "inputs.date.mounth"
                                )}
                                value={monthValue}
                                inputMode="numeric"
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(/\D/g, "")

                                    handleChange(
                                        setMonthValue,
                                        value
                                    )
                                }}
                            />

                            {/* Year */}
                            <Input
                                className="h-10 border border-black-light-utility rounded-xl px-2 py-5 text-sm"
                                maxLength={4}
                                placeholder={editProfileT(
                                    "inputs.date.year"
                                )}
                                value={yearValue}
                                inputMode="numeric"
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(/\D/g, "")

                                    handleChange(
                                        setYearValue,
                                        value
                                    )
                                }}
                            />

                        </div>
                    </div>

                    {/* Done */}
                    <div>

                        <Button
                            type="submit"
                            disabled={!isDirty || loading}
                            className={cn(
                                "bg-crimson",
                                "px-4 py-3",
                                "hover:bg-[var(--crimson-hover-color)]",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        >
                            {loading
                                ? <Loading
                                    className="w-full h-12,5"
                                    size={40}
                                    color="var(--white-color)"
                                />
                                : editProfileT("apply-button")}
                        </Button>

                    </div>

                </div>

            </form>
        </>
    )
}

export default EditProfileForm
