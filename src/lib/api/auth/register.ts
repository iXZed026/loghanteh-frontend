import { fetcher } from "../fetcher";

export interface RegisterData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterResponseData {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  verificationToken: string;
}

export interface RegisterResponse {
  data: RegisterResponseData;
  message: string;
  success: boolean;
}

export async function register(
  data: RegisterData,
  locale: string,
): Promise<RegisterResponse> {

  return fetcher<RegisterResponse>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    locale,
  );
}
