import RegisterForm from '@/features/loghante(root)/auth/components/RegisterForm'
import { useTranslations } from 'next-intl'
import React from 'react'

function Register() {

    const sharedT = useTranslations("authShared")

    return (
        <div>
            <div className='text-center mb-7.5'>
                <span className='font-semibold'>
                    {sharedT("message")}
                </span>
            </div>
            {/* Form */}
            <RegisterForm googleText={sharedT("google-auth")} />
        </div>
    )
}

export default Register