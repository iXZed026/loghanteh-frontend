export type ConferenceHallIcon =
    | 'capacity'
    | 'area'
    | 'layout'

export interface ConferenceHall {
    id: number

    key: string

    title: {
        en: string
        fa: string
    }

    description: {
        en: string
        fa: string
    }

    capacity: {
        icon: ConferenceHallIcon
        label: {
            en: string
            fa: string
        }
        count: number
    }

    area: {
        icon: ConferenceHallIcon
        label: {
            en: string
            fa: string
        }
        count: number
    }

    layout: {
        icon: ConferenceHallIcon
        label: {
            en: string
            fa: string
        }
        layout: {
            en: string
            fa: string
        }
    }

    href: string

    imageURL: string[]
}

export const conferenceHalls: ConferenceHall[] = [
    {
        id: 1,
        key: 'farrokhi-yazdi-conference-hall',

        title: {
            en: 'Farrokhi Yazdi Conference Hall',
            fa: 'سالن همایش فرخی یزدی',
        },

        description: {
            en: 'A beautiful and spacious venue suitable for conferences, ceremonies and special events.',
            fa: 'فضایی زیبا و بزرگ مناسب برای برگزاری همایش‌ها، مراسم و رویدادهای ویژه.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 300,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 1200,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Theater',
                fa: 'تئاتر',
            },
        },

        href: '/conference-hall/1',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 2,
        key: 'fathali-shahi-garden',

        title: {
            en: 'Fathali Shahi Garden',
            fa: 'باغ فتحعلی‌شاهی',
        },

        description: {
            en: 'A modern conference hall designed for large events and professional gatherings.',
            fa: 'سالن همایشی مدرن برای رویدادهای بزرگ و گردهمایی‌های حرفه‌ای.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 500,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 1500,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Theater',
                fa: 'تئاتر',
            },
        },

        href: '/conference-hall/2',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 3,
        key: 'jelokhan',

        title: {
            en: 'Jelokhan',
            fa: 'جلوخان',
        },

        description: {
            en: 'An elegant space suitable for ceremonies, conferences and private events.',
            fa: 'فضایی مجلل مناسب برای مراسم، همایش‌ها و رویدادهای خصوصی.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 250,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 900,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Classroom',
                fa: 'کلاسی',
            },
        },

        href: '/conference-hall/3',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 4,
        key: 'nizamieh-garden',

        title: {
            en: 'Nizamieh Garden',
            fa: 'باغ نظامیه',
        },

        description: {
            en: 'A unique Persian-inspired venue for memorable events and ceremonies.',
            fa: 'فضایی منحصربه‌فرد با الهام از معماری باغ ایرانی برای مراسم و رویدادهای به‌یادماندنی.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 200,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 800,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Banquet',
                fa: 'ضیافت',
            },
        },

        href: '/conference-hall/4',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 5,
        key: 'nizamieh-hall',

        title: {
            en: 'Nizamieh Hall',
            fa: 'سالن نظامیه',
        },

        description: {
            en: 'A distinctive hall combining historical atmosphere with modern facilities.',
            fa: 'سالن ویژه‌ای که فضای تاریخی را با امکانات مدرن ترکیب کرده است.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 180,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 700,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'U-Shape',
                fa: 'U شکل',
            },
        },

        href: '/conference-hall/5',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 6,
        key: 'loghanteh-cafe-museum',

        title: {
            en: 'Loghanteh Cafe Museum',
            fa: 'موزه کافه لقانطه',
        },

        description: {
            en: 'A comfortable venue for meetings, workshops and private gatherings.',
            fa: 'فضایی مناسب برای جلسات، کارگاه‌ها و گردهمایی‌های خصوصی.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 150,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 600,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Boardroom',
                fa: 'جلسه‌ای',
            },
        },

        href: '/conference-hall/6',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 7,
        key: 'palace-porch',

        title: {
            en: 'Palace Porch',
            fa: 'ایوان کاخ',
        },

        description: {
            en: 'A premium space designed for formal ceremonies and high-profile events.',
            fa: 'فضایی ویژه برای مراسم رسمی و رویدادهای خاص.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 220,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 850,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Theater',
                fa: 'تئاتر',
            },
        },

        href: '/conference-hall/7',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 8,
        key: 'art-kooshk',

        title: {
            en: 'Art Kooshk',
            fa: 'کوشک هنر',
        },

        description: {
            en: 'A cultural venue suitable for exhibitions, presentations and special events.',
            fa: 'فضایی فرهنگی مناسب برای نمایشگاه‌ها، ارائه‌ها و رویدادهای ویژه.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 160,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 650,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Open Space',
                fa: 'فضای باز',
            },
        },

        href: '/conference-hall/8',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 9,
        key: 'pish-khan',

        title: {
            en: 'Pish Khan',
            fa: 'پیشخوان',
        },

        description: {
            en: 'A professional space designed for executive meetings and business events.',
            fa: 'فضایی حرفه‌ای برای جلسات مدیریتی و رویدادهای تجاری.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 100,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 400,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Boardroom',
                fa: 'جلسه‌ای',
            },
        },

        href: '/conference-hall/9',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 10,
        key: 'mirror-solitude',

        title: {
            en: 'Mirror Solitude',
            fa: 'خلوت آینه',
        },

        description: {
            en: 'A flexible venue suitable for workshops, meetings and cultural programs.',
            fa: 'فضایی منعطف مناسب برای کارگاه‌ها، جلسات و برنامه‌های فرهنگی.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 120,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 450,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Classroom',
                fa: 'کلاسی',
            },
        },

        href: '/conference-hall/10',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },

    {
        id: 11,
        key: 'gallery',

        title: {
            en: 'Gallery',
            fa: 'گالری',
        },

        description: {
            en: 'A large outdoor venue suitable for ceremonies and large-scale events.',
            fa: 'فضایی بزرگ و روباز مناسب برای مراسم و رویدادهای بزرگ.',
        },

        capacity: {
            icon: 'capacity',
            label: {
                en: 'Capacity',
                fa: 'ظرفیت',
            },
            count: 600,
        },

        area: {
            icon: 'area',
            label: {
                en: 'Area',
                fa: 'مساحت',
            },
            count: 2500,
        },

        layout: {
            icon: 'layout',
            label: {
                en: 'Layout',
                fa: 'چیدمان',
            },
            layout: {
                en: 'Open Space',
                fa: 'فضای باز',
            },
        },

        href: '/conference-hall/11',

        imageURL: [
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
            '/images/loghanteh-cafe.jpg',
        ],
    },
]
