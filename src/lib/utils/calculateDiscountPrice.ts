export interface CalculateDiscountPriceParams {
    price: number;
    discountPercent: number | string;
    maxDiscountAmount?: number | string | null;
}

export interface CalculateDiscountPriceResult {
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
}

export function calculateDiscountPrice({
    price,
    discountPercent,
    maxDiscountAmount,
}: CalculateDiscountPriceParams): CalculateDiscountPriceResult {
    const safePrice = Math.max(0, Number(price) || 0);
    const safeDiscountPercent = Math.min(
        100,
        Math.max(0, Number(discountPercent) || 0),
    );

    const calculatedDiscount =
        safePrice * (safeDiscountPercent / 100);

    const maxDiscount =
        maxDiscountAmount === null ||
        maxDiscountAmount === undefined
            ? calculatedDiscount
            : Math.max(0, Number(maxDiscountAmount) || 0);

    const discountAmount = Math.min(
        calculatedDiscount,
        maxDiscount,
        safePrice,
    );

    const finalPrice = Math.max(
        0,
        safePrice - discountAmount,
    );

    return {
        originalPrice: safePrice,
        discountAmount,
        finalPrice,
    };
}