import CheckVerificationToken from "@/components/shared/auth/CheckVerificationToken"
import VerifyForm from "@/features/loghante(root)/auth/components/VerifyForm"


function Verify() {
    return (
        <CheckVerificationToken
            tokenKey="loginVerificationToken"
            redirectPath="/login"
        >
            <VerifyForm mode="login" />
        </CheckVerificationToken>
    )
}

export default Verify