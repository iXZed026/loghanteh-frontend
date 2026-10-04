export interface ICafesAndFoods {
    id: number;

    name: {
        en: string;
        fa: string;
    };

    description: {
        en: string;
        fa: string;
    };

    href: string;
    imageURL: string;
}

export const cafesAndFoods: ICafesAndFoods[] = [
    {
        id: 1,
        name: {
            en: "Conference hall Cafe",
            fa: "کافه سالن همایش"
        },
        description: {
            en: "Tasty street food and snacks, available throughout the day.",
            fa: "غذاهای خیابانی خوشمزه و میان‌وعده‌ها، در تمام طول روز موجود است."
        },
        href: "/",
        imageURL: "",
    },
    {
        id: 2,
        name: {
            en: "Loghanteh Cafe Museum",
            fa: "کافه موزه لوغانته"
        },
        description: {
            en: "Tasty street food and snacks, available throughout the day.",
            fa: "غذاهای خیابانی خوشمزه و میان‌وعده‌ها، در تمام طول روز موجود است."
        },
        href: "/",
        imageURL: "",
    },
    {
        id: 3,
        name: {
            en: "Food Truck",
            fa: "فود تراک"
        },
        description: {
            en: "Tasty street food and snacks, available throughout the day.",
            fa: "غذاهای خیابانی خوشمزه و میان‌وعده‌ها، در تمام طول روز موجود است."
        },
        href: "/",
        imageURL: "",
    },
]