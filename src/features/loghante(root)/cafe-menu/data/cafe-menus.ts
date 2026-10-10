export type CafeMenuCategory =
    | 'food'
    | 'hot-drinks'
    | 'cold-drinks'
    | 'cake-dessert'

export interface CafeMenuItemData {
    id: number
    category: CafeMenuCategory
    name: {
        en: string
        fa: string
    }
    price: number
    image: string
}

export interface CafeMenuData {
    id: number
    name: {
        en: string
        fa: string
    }
    about: {
        title: {
            en: string
            fa: string
        }
        description: {
            en: string
            fa: string
        }
        image: string
    }
    menus: CafeMenuItemData[]
}

const CAFE_IMAGE = '/images/loghanteh-cafe.jpg'

export const cafeMenus: CafeMenuData[] = [
    {
        id: 1,

        name: {
            en: 'Conference Hall Cafe',
            fa: 'کافه سالن کنفرانس',
        },

        about: {
            title: {
                en: 'A Cafe for Great Conversations',
                fa: 'کافه‌ای برای گفت‌وگوهای ماندگار',
            },

            description: {
                en: 'A relaxing cafe located next to the Conference Hall, offering a selection of fresh meals, hot drinks, cold beverages, and desserts for visitors and guests.',
                fa: 'کافه‌ای آرام در کنار سالن کنفرانس که مجموعه‌ای از غذاهای تازه، نوشیدنی‌های گرم و سرد و دسرهای متنوع را برای بازدیدکنندگان و مهمانان ارائه می‌دهد.',
            },

            image: CAFE_IMAGE,
        },

        menus: [
            {
                id: 101,
                category: 'food',
                name: {
                    en: 'Classic Beef Burger',
                    fa: 'برگر کلاسیک گوشت',
                },
                price: 280000,
                image: CAFE_IMAGE,
            },
            {
                id: 102,
                category: 'food',
                name: {
                    en: 'Chicken Sandwich',
                    fa: 'ساندویچ مرغ',
                },
                price: 220000,
                image: CAFE_IMAGE,
            },
            {
                id: 103,
                category: 'hot-drinks',
                name: {
                    en: 'Americano',
                    fa: 'آمریکانو',
                },
                price: 95000,
                image: CAFE_IMAGE,
            },
            {
                id: 104,
                category: 'hot-drinks',
                name: {
                    en: 'Cappuccino',
                    fa: 'کاپوچینو',
                },
                price: 120000,
                image: CAFE_IMAGE,
            },
            {
                id: 105,
                category: 'cold-drinks',
                name: {
                    en: 'Fresh Lemonade',
                    fa: 'لیموناد تازه',
                },
                price: 110000,
                image: CAFE_IMAGE,
            },
            {
                id: 106,
                category: 'cake-dessert',
                name: {
                    en: 'Chocolate Cake',
                    fa: 'کیک شکلاتی',
                },
                price: 145000,
                image: CAFE_IMAGE,
            },
        ],
    },

    {
        id: 2,

        name: {
            en: 'Loghanteh Cafe Museum',
            fa: 'کافه موزه لغنطه',
        },

        about: {
            title: {
                en: 'Taste the Museum',
                fa: 'طعم متفاوت در قلب موزه',
            },

            description: {
                en: 'Loghanteh Cafe Museum brings together the atmosphere of the museum with carefully selected food, coffee, refreshing drinks, and desserts.',
                fa: 'کافه موزه لغنطه تجربه‌ای متفاوت از ترکیب فضای موزه با غذاهای منتخب، قهوه، نوشیدنی‌های تازه و دسرهای متنوع را ارائه می‌دهد.',
            },

            image: CAFE_IMAGE,
        },

        menus: [
            {
                id: 201,
                category: 'food',
                name: {
                    en: 'Museum Special Pasta',
                    fa: 'پاستای ویژه موزه',
                },
                price: 260000,
                image: CAFE_IMAGE,
            },
            {
                id: 202,
                category: 'food',
                name: {
                    en: 'Grilled Chicken Plate',
                    fa: 'بشقاب مرغ گریل',
                },
                price: 310000,
                image: CAFE_IMAGE,
            },
            {
                id: 203,
                category: 'hot-drinks',
                name: {
                    en: 'Persian Tea',
                    fa: 'چای ایرانی',
                },
                price: 70000,
                image: CAFE_IMAGE,
            },
            {
                id: 204,
                category: 'hot-drinks',
                name: {
                    en: 'Latte',
                    fa: 'لاته',
                },
                price: 130000,
                image: CAFE_IMAGE,
            },
            {
                id: 205,
                category: 'cold-drinks',
                name: {
                    en: 'Iced Coffee',
                    fa: 'آیس کافی',
                },
                price: 150000,
                image: CAFE_IMAGE,
            },
            {
                id: 206,
                category: 'cold-drinks',
                name: {
                    en: 'Fresh Orange Juice',
                    fa: 'آب پرتقال تازه',
                },
                price: 125000,
                image: CAFE_IMAGE,
            },
            {
                id: 207,
                category: 'cake-dessert',
                name: {
                    en: 'Cheesecake',
                    fa: 'چیزکیک',
                },
                price: 160000,
                image: CAFE_IMAGE,
            },
        ],
    },

    {
        id: 3,

        name: {
            en: 'Food Truck',
            fa: 'فود تراک',
        },

        about: {
            title: {
                en: 'Good Food on the Go',
                fa: 'غذای خوشمزه، همیشه همراه شما',
            },

            description: {
                en: 'Our Food Truck offers quick, fresh, and delicious meals and drinks for visitors looking for a casual bite on the go.',
                fa: 'فود تراک لغنطه غذاها و نوشیدنی‌های تازه، سریع و خوشمزه‌ای را برای بازدیدکنندگانی که به دنبال یک وعده راحت و سریع هستند ارائه می‌کند.',
            },

            image: CAFE_IMAGE,
        },

        menus: [
            {
                id: 301,
                category: 'food',
                name: {
                    en: 'Crispy Chicken Burger',
                    fa: 'برگر مرغ سوخاری',
                },
                price: 240000,
                image: CAFE_IMAGE,
            },
            {
                id: 302,
                category: 'food',
                name: {
                    en: 'Loaded Fries',
                    fa: 'سیب‌زمینی ویژه',
                },
                price: 180000,
                image: CAFE_IMAGE,
            },
            {
                id: 303,
                category: 'hot-drinks',
                name: {
                    en: 'Espresso',
                    fa: 'اسپرسو',
                },
                price: 85000,
                image: CAFE_IMAGE,
            },
            {
                id: 304,
                category: 'cold-drinks',
                name: {
                    en: 'Iced Tea',
                    fa: 'آیس تی',
                },
                price: 95000,
                image: CAFE_IMAGE,
            },
            {
                id: 305,
                category: 'cold-drinks',
                name: {
                    en: 'Mango Smoothie',
                    fa: 'اسموتی انبه',
                },
                price: 145000,
                image: CAFE_IMAGE,
            },
            {
                id: 306,
                category: 'cake-dessert',
                name: {
                    en: 'Brownie',
                    fa: 'براونی',
                },
                price: 120000,
                image: CAFE_IMAGE,
            },
        ],
    },
]
