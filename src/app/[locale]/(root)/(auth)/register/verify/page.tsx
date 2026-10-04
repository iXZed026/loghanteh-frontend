import CheckVerificationToken from "@/components/shared/auth/CheckVerificationToken"
import VerifyForm from "@/features/loghante(root)/auth/components/VerifyForm"


function Verify() {
    return (
        <CheckVerificationToken
            tokenKey="registerVerificationToken"
            redirectPath="/register"
        >
            <VerifyForm mode="register" />
        </CheckVerificationToken>
    )
}

export default Verify