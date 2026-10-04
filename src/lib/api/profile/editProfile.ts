import { fetcher } from "../fetcher";

export interface IEditProfileData {
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string | null;
    currentPassword: string;
    newPassword: string;
}

export interface EditProfileResponse {
    message: string;
    success: boolean;
}

export async function editProfile(
    data: IEditProfileData,
    locale: string,
): Promise<EditProfileResponse> {

    return fetcher<EditProfileResponse>(
        "/profile/edit-profile",
        {
            method: "PUT",
            body: JSON.stringify(data),
        },
        locale,
    );
}