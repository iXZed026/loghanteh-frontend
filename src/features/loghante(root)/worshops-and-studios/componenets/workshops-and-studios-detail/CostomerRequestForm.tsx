"use client";

import Modal from "@/components/shared/modal/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import useInput from "@/hooks/useInput";
import useRemoveHashOnExit from "@/hooks/useRemoveHashOnExit";
import { createCustomerRequest } from "@/lib/api/customer-requests";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

interface ICostomerRequestForm {
    Translation: string;
    URLHash: string;
    requestTitle: string;
}

interface IModalState {
    active: boolean;
    success: boolean | "warning";
    message: string;
    pushUrl?: string;
}

function CostomerRequestForm({
    Translation,
    URLHash,
    requestTitle,
}: ICostomerRequestForm) {

    const T = useTranslations(Translation);

    const locale = useLocale();

    useRemoveHashOnExit(URLHash);

    const [
        fullName,
        ,
        changeFullName,
        clearFullName,
    ] = useInput("");

    const [
        phoneOrEmail,
        ,
        changePhoneOrEmail,
        clearPhoneOrEmail,
    ] = useInput("");

    const [
        companyName,
        ,
        changeCompanyName,
        clearCompanyName,
    ] = useInput("");

    const [
        description,
        ,
        changeDescription,
        clearDescription,
    ] = useInput("");

    const [
        isLoading,
        setIsLoading,
    ] = useState<boolean>(false);

    const [
        modal,
        setModal,
    ] = useState<IModalState>({
        active: false,
        success: false,
        message: "",
        pushUrl: undefined,
    });

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setIsLoading(true);

        try {

            const response = await createCustomerRequest(
                {
                    fullName,
                    companyName,
                    emailOrPhone: phoneOrEmail,
                    requestTitle,
                    description,
                },
                locale
            );

            if (!response.success) {

                setModal({
                    active: true,
                    success: false,
                    message: response.message,
                    pushUrl: undefined,
                });

                return;
            }

            clearFullName();
            clearPhoneOrEmail();
            clearCompanyName();
            clearDescription();

            setModal({
                active: true,
                success: true,
                message: response.message,
                pushUrl: undefined,
            });

        } catch (error) {

            console.error(
                "Failed to create customer request:",
                error
            );

            setModal({
                active: true,
                success: false,
                message: "Failed to submit request.",
                pushUrl: undefined,
            });

        } finally {

            setIsLoading(false);

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
                    }));
                }}
            />

            <form
                id={URLHash}
                onSubmit={handleSubmit}
                className={cn(
                    "fcol gap-y-10",
                    "scroll-mt-[120px]",
                    "py-15",
                )}
            >

                <div>
                    <span className="font-bold text-xl">
                        {T("title")}
                    </span>
                </div>

                <div
                    className={cn(
                        "grid grid-cols-12",
                        "gap-5 gap-y-10",
                        "md:px-10"
                    )}
                >

                    {/* Full Name */}
                    <div
                        className={cn(
                            "py-2 px-3",
                            "lg:col-span-4",
                            "sm:col-span-6",
                            "col-span-12",
                            "fcol",
                            "md:gap-y-3 gap-y-1"
                        )}
                    >
                        <span className="text-sm font-semibold text-black-light-utility">
                            {T("full-name")}:
                        </span>

                        <Input
                            value={fullName}
                            onChange={changeFullName}
                            className={cn(
                                "border-b-3",
                                "border-l border-r border-t",
                                "border-b-[var(--black-color)]",
                                "border-r-[var(--white-light-color)]",
                                "border-t-[var(--white-light-color)]",
                                "border-l-[var(--white-light-color)]",
                                "focus:bg-[var(--white-light-color)]",
                                "transition-colors",
                                "rounded-xs",
                                "h-15"
                            )}
                        />
                    </div>

                    {/* Phone Or Email */}
                    <div
                        className={cn(
                            "py-2 px-3",
                            "lg:col-span-4",
                            "sm:col-span-6",
                            "col-span-12",
                            "fcol",
                            "md:gap-y-3 gap-y-1"
                        )}
                    >
                        <span className="text-sm font-semibold text-black-light-utility">
                            {T("email-or-phone")}:
                        </span>

                        <Input
                            value={phoneOrEmail}
                            onChange={changePhoneOrEmail}
                            className={cn(
                                "border-b-3",
                                "border-l border-r border-t",
                                "border-b-[var(--black-color)]",
                                "border-r-[var(--white-light-color)]",
                                "border-t-[var(--white-light-color)]",
                                "border-l-[var(--white-light-color)]",
                                "focus:bg-[var(--white-light-color)]",
                                "transition-colors",
                                "rounded-xs",
                                "h-15"
                            )}
                        />
                    </div>

                    {/* Company Name */}
                    <div
                        className={cn(
                            "py-2 px-3",
                            "lg:col-span-4",
                            "sm:col-span-6",
                            "col-span-12",
                            "fcol",
                            "md:gap-y-3 gap-y-1"
                        )}
                    >
                        <span className="text-sm font-semibold text-black-light-utility">
                            {T("company-name")}:
                        </span>

                        <Input
                            value={companyName}
                            onChange={changeCompanyName}
                            className={cn(
                                "border-b-3",
                                "border-l border-r border-t",
                                "border-b-[var(--black-color)]",
                                "border-r-[var(--white-light-color)]",
                                "border-t-[var(--white-light-color)]",
                                "border-l-[var(--white-light-color)]",
                                "focus:bg-[var(--white-light-color)]",
                                "transition-colors",
                                "rounded-xs",
                                "h-15"
                            )}
                        />
                    </div>

                    {/* Description */}
                    <div
                        className={cn(
                            "py-2 px-3",
                            "lg:col-span-6",
                            "col-span-12",
                            "fcol",
                            "md:gap-y-3 gap-y-1"
                        )}
                    >
                        <span className="text-sm font-semibold text-black-light-utility">
                            {T("description")}:
                        </span>

                        <textarea
                            value={description}
                            onChange={changeDescription}
                            maxLength={500}
                            placeholder={T("optional")}
                            className={cn(
                                "resize-none",
                                "border-2",
                                "p-4",
                                "border-b-[var(--black-color)]",
                                "transition-colors",
                                "rounded-lg",
                                "h-35"
                            )}
                        />
                    </div>

                    {/* Submit */}
                    <div
                        className={cn(
                            "col-span-12",
                            "fcc",
                        )}
                    >
                        <Button
                            className={cn(
                                "w-3/4",
                                "bg-crimson",
                                "py-3",
                                "font-semibold",
                                "click-scale",
                                "transition-colors",
                                "hover:bg-[var(--crimson-hover-color)]",
                                "disabled:opacity-50",
                                "disabled:cursor-not-allowed",
                            )}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? <Loading
                                    className="w-full"
                                    size={40}
                                />
                                : <span>{T("submit-button")}</span>
                            }
                        </Button>
                    </div>

                </div>

            </form>
        </>
    );
}

export default CostomerRequestForm;