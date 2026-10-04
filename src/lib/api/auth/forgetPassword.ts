import { fetcher } from "../fetcher";

export interface IForgetPasswordData {
    emailOrPhone: string;
}

export interface ForgetPasswordResponseData {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    verificationToken: string;
}

export interface ForgetPasswordResponse {
    data: ForgetPasswordResponseData;
    message: string;
    success: boolean;
}

export async function forgetPassword(
    data: IForgetPasswordData,
    locale: string,
): Promise<ForgetPasswordResponse> {

    return fetcher<ForgetPasswordResponse>(
        "/auth/login/forgot-password",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}