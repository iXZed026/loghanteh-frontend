import { fetcher } from "../fetcher"

interface LogoutResponse {
    data: null
    message: string
    success: boolean
}

export async function logout(
    locale?: string
) {
    return fetcher<LogoutResponse>(
        "/auth/logout",
        {
            method: "GET",
        },
        locale
    )
}