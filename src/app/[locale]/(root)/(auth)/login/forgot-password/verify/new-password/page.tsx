import CheckVerificationToken from "@/components/shared/auth/CheckVerificationToken" 
import NewPasswordForm from "@/features/loghante(root)/auth/components/NewPasswordForm"

function NewPassword() {

    return (
        <CheckVerificationToken
            tokenKey="forgetPasswordVerificationToken"
            redirectPath="/login/forgot-password"
        >
            <NewPasswordForm />
        </CheckVerificationToken>
    )
}

export default NewPassword