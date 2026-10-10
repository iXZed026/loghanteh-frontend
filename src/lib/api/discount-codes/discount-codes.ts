import { fetcher } from "../fetcher";

export interface DiscountCodeData {
    discountCodeId: number;
    code: string;
    discountPercent: string;
    maxDiscountAmount: string;
    usageLimit: number;
    usedCount: number;
    startAt: string;
    expiresAt: string;
    isActive: boolean;
    createdAt: string;
}

export interface DiscountCodeResponse {
    data: DiscountCodeData;
    message: string;
    success: boolean;
}

export async function getDiscountCode(
    code: string,
    locale?: string,
): Promise<DiscountCodeResponse> {
    return fetcher<DiscountCodeResponse>(
        `/discount-codes/${code}`,
        {
            method: "GET",
        },
        locale,
    );
}