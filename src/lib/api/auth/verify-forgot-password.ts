import { fetcher } from "../fetcher";

export interface IVerifyForgetPasswordData {
    verificationToken: string;
    code: string;
}

export interface VerifyForgetPasswordResponseData {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
}

export interface VerifyForgetPasswordResponse {
    data: VerifyForgetPasswordResponseData;
    message: string;
    success: boolean;
}

export async function verifyForgetPassword(
    data: IVerifyForgetPasswordData,
    locale: string,
): Promise<VerifyForgetPasswordResponse> {

    return fetcher<VerifyForgetPasswordResponse>(
        "/auth/login/forgot-password/verify",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}