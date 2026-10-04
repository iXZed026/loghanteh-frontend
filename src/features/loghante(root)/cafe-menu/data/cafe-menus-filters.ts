interface ICafeMenusFilters {
    id: number;
    name: {
        en: string;
        fa: string;
    };
    slug: string;
}

export const cafeMenusFilters: ICafeMenusFilters[] = [
    {
        id: 1,
        name: {
            en: "Food",
            fa: "غذا"
        },
        slug: "food",
    },
    {
        id: 2,
        name: {
            en: "Hot drinks",
            fa: "نوشیدنی‌های گرم"
        },
        slug: "hot-drinks",
    },
    {
        id: 3,
        name: {
            en: "Cold drinks",
            fa: "نوشیدنی‌های سرد"
        },
        slug: "cold-drinks",
    },
    {
        id: 4,
        name: {
            en: "Cake & Dessert",
            fa: "کیک و دسر"
        },
        slug: "cake-dessert",
    },
];