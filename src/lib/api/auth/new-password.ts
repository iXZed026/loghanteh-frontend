import { fetcher } from "@/lib/api/fetcher";

export interface INewPasswordData {
    verificationToken: string;
    password: string;
    repeatPassword: string;
}

export interface NewPasswordResponseData {
    userId: number;
}

export interface NewPasswordResponse {
    data: NewPasswordResponseData;
    message: string;
    success: boolean;
}

export async function newPassword(
    data: INewPasswordData,
    locale: string,
): Promise<NewPasswordResponse> {

    return fetcher<NewPasswordResponse>(
        "/auth/login/forgot-password/verify/new-password",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}