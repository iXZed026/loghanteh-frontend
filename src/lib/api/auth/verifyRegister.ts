import { fetcher } from "../fetcher";

export interface VerifyRegisterData {
  verificationToken: string;
  code: string;
}

export interface VerifyRegisterResponseData {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  accessToken: string;
}

export interface VerifyRegisterResponse {
  data: VerifyRegisterResponseData;
  message: string;
  success: boolean;
}

export async function verifyRegister(
  data: VerifyRegisterData,
  locale: string,
): Promise<VerifyRegisterResponse> {

  return fetcher<VerifyRegisterResponse>(
    "/auth/register/verify",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    locale,
  );
}