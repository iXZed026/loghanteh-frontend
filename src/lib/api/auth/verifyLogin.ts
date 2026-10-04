import { fetcher } from "../fetcher";

export interface IVerifyLoginData {
    verificationToken: string;
    code: string;
}

export interface VerifyLoginResponseData {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    accessToken: string;
}

export interface VerifyLoginResponse {
    data: VerifyLoginResponseData;
    message: string;
    success: boolean;
}

export async function verifyLogin(
    data: IVerifyLoginData,
    locale: string,
): Promise<VerifyLoginResponse> {

    return fetcher<VerifyLoginResponse>(
        "/auth/login/verify",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}