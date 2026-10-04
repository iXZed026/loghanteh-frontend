import { fetcher } from "../fetcher";

export interface ILoginData {
    emailOrPhone: string;
    password: string;
}

export interface LoginResponseData {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    verificationToken: string;
}

export interface LoginResponse {
    data: LoginResponseData;
    message: string;
    success: boolean;
}

export async function login(
    data: ILoginData,
    locale: string,
): Promise<LoginResponse> {

    return fetcher<LoginResponse>(
        "/auth/login",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}