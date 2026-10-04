import LoginForm from '@/features/loghante(root)/auth/components/LoginForm'
import { useTranslations } from 'next-intl'
import React from 'react'

function Login() {

    const sharedT = useTranslations("authShared")

    return (
        <div>
            <div className='text-center mb-7.5'>
                <span className='font-semibold'>
                    {sharedT("message")}
                </span>
            </div>
            {/* Form */}
            <LoginForm googleText={sharedT("google-auth")} />
        </div>
    )
}

export default Login