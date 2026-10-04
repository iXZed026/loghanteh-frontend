import { fetcher } from "./fetcher";

export interface ICreateCustomerRequestData {
    fullName: string;
    companyName: string;
    emailOrPhone: string;
    requestTitle: string;
    description: string;
}

export interface CreateCustomerRequestResponse {
    data: null;
    message: string;
    success: boolean;
}

export async function createCustomerRequest(
    data: ICreateCustomerRequestData,
    locale: string,
): Promise<CreateCustomerRequestResponse> {

    return fetcher<CreateCustomerRequestResponse>(
        "/customer-requests",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
        locale,
    );
}