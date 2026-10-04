import CheckVerificationToken from "@/components/shared/auth/CheckVerificationToken"
import VerifyForm from "@/features/loghante(root)/auth/components/VerifyForm"


function Verify() {
    return (
        <CheckVerificationToken
            tokenKey="forgetPasswordVerificationToken"
            redirectPath="/login/forgot-password"
        >
            <VerifyForm mode="forgot-password" />
        </CheckVerificationToken>
    )
}

export default Verify