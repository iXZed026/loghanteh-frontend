"use client"

import CafeMenusFilters from '../CafeMenusFilters'
import CafeMenuItem from '../CafeMenuItem'
import { cn } from '@/lib/utils/cn'
import { useSearchParams } from 'next/navigation'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { cafeMenusContainerVariant, MuseumCardVariant, MuseumsCardContainerVariant } from '@/features/loghante(root)/animations/loghante.variants'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'

export interface ICafeMenu {
    id: number;
    name: {
        en: string;
        fa: string;
    };
    price: number;
    category: "food" | "hot-drinks" | "cold-drinks" | "cake-dessert";
    image: string;
}

function CafeMenusSections() {


    const cafeMenuMenuT =
        useTranslations("cafeMenu.menu")

    const locale = useLocale();

    const searchParams = useSearchParams()

    const activeFilter =
        searchParams.get("filter") || "food"



    const cafeMenus: ICafeMenu[] = [
        // Food
        {
            id: 1,
            name: {
                en: "Classic Burger",
                fa: "برگر کلاسیک"
            },
            price: 450000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 2,
            name: {
                en: "Chicken Sandwich",
                fa: "ساندویچ مرغ"
            },
            price: 380000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 3,
            name: {
                en: "Beef Burger",
                fa: "برگر گوشت"
            },
            price: 520000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 4,
            name: {
                en: "Club Sandwich",
                fa: "ساندویچ کلاب"
            },
            price: 420000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 5,
            name: {
                en: "Pizza Margherita",
                fa: "پیتزا مارگریتا"
            },
            price: 580000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 6,
            name: {
                en: "Pasta Carbonara",
                fa: "پاستا کربونارا"
            },
            price: 490000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 7,
            name: {
                en: "Pasta Alfredo",
                fa: "پاستا آلفردو"
            },
            price: 510000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 8,
            name: {
                en: "Caesar Salad",
                fa: "سالاد سزار"
            },
            price: 280000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 9,
            name: {
                en: "Greek Salad",
                fa: "سالاد یونانی"
            },
            price: 250000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 10,
            name: {
                en: "Spaghetti Bolognese",
                fa: "اسپاگتی بولونیز"
            },
            price: 460000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 11,
            name: {
                en: "Cheese Pizza",
                fa: "پیتزا پنیر"
            },
            price: 420000,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },

        // Cold Drinks
        {
            id: 12,
            name: {
                en: "Iced Latte",
                fa: "لیت سرد"
            },
            price: 180000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 13,
            name: {
                en: "Iced Americano",
                fa: "آمریکانو سرد"
            },
            price: 150000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 14,
            name: {
                en: "Iced Cappuccino",
                fa: "کاپوچینو سرد"
            },
            price: 190000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 15,
            name: {
                en: "Iced Mocha",
                fa: "موکا سرد"
            },
            price: 210000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 16,
            name: {
                en: "Fresh Lemonade",
                fa: "لیموناد تازه"
            },
            price: 120000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 17,
            name: {
                en: "Orange Juice",
                fa: "آب پرتقال تازه"
            },
            price: 110000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 18,
            name: {
                en: "Iced Caramel Macchiato",
                fa: "ماکیاتو کارامل سرد"
            },
            price: 230000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 19,
            name: {
                en: "Strawberry Smoothie",
                fa: "اسموتی توت‌فرنگی"
            },
            price: 160000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 20,
            name: {
                en: "Mango Smoothie",
                fa: "اسموتی انبه"
            },
            price: 170000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 21,
            name: {
                en: "Iced Tea",
                fa: "چای سرد"
            },
            price: 90000,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },

        // Hot Drinks
        {
            id: 22,
            name: {
                en: "Americano",
                fa: "آمریکانو"
            },
            price: 140000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 23,
            name: {
                en: "Cappuccino",
                fa: "کاپوچینو"
            },
            price: 170000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 24,
            name: {
                en: "Latte",
                fa: "لیت"
            },
            price: 180000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 25,
            name: {
                en: "Mocha",
                fa: "موکا"
            },
            price: 200000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 26,
            name: {
                en: "Espresso",
                fa: "اسپرسو"
            },
            price: 120000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 27,
            name: {
                en: "Caramel Macchiato",
                fa: "ماکیاتو کارامل"
            },
            price: 220000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 28,
            name: {
                en: "Hot Chocolate",
                fa: "شکلات داغ"
            },
            price: 190000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 29,
            name: {
                en: "White Mocha",
                fa: "موکای سفید"
            },
            price: 210000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 30,
            name: {
                en: "Chai Latte",
                fa: "چای لیت"
            },
            price: 160000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 31,
            name: {
                en: "Herbal Tea",
                fa: "چای گیاهی"
            },
            price: 100000,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },

        // Cake & Dessert
        {
            id: 32,
            name: {
                en: "Chocolate Cake",
                fa: "کیک شکلاتی"
            },
            price: 250000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 33,
            name: {
                en: "Cheesecake",
                fa: "چیزکیک"
            },
            price: 280000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 34,
            name: {
                en: "Tiramisu",
                fa: "تیرامیسو"
            },
            price: 300000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 35,
            name: {
                en: "Carrot Cake",
                fa: "کیک هویج"
            },
            price: 240000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 36,
            name: {
                en: "Red Velvet Cake",
                fa: "کیک مخمل قرمز"
            },
            price: 270000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 37,
            name: {
                en: "Brownie",
                fa: "براونی"
            },
            price: 200000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 38,
            name: {
                en: "Apple Pie",
                fa: "پای سیب"
            },
            price: 230000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 39,
            name: {
                en: "Lemon Tart",
                fa: "تارت لیمو"
            },
            price: 220000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 40,
            name: {
                en: "Chocolate Mousse",
                fa: "موس شکلاتی"
            },
            price: 260000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 41,
            name: {
                en: "Panna Cotta",
                fa: "پانا کوتا"
            },
            price: 250000,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
    ];

    const filteredMenus =
        cafeMenus.filter(
            menu => menu.category === activeFilter
        )

    return (
        <div className='min-h-screen'>
            {/* Tile */}
            <div className='py-10 text-center'>
                <h5 className='font-wulkan md:text-5xl text-3xl font-bold mb-5'>
                    {
                        cafeMenuMenuT("title")
                    }
                </h5>
            </div>

            {/* Filters */}
            <CafeMenusFilters />

            {/* Menus items */}
            <StaggerWrapper
                key={activeFilter}
                variants={cafeMenusContainerVariant}
                once
                className={cn(
                    "grid grid-cols-12 lg:gap-10 gap-3 mb-15",
                )}
            >
                {filteredMenus.map(menu => (
                    <CafeMenuItem
                        key={menu.id}
                        name={getLocalizedValue(menu.name, locale)}
                        price={menu.price}
                        image={menu.image}
                    />
                ))}
            </StaggerWrapper>
        </div>
    )
}

export default CafeMenusSections