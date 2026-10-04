export interface WorkshopCloseUp {
    title: {
        en: string;
        fa: string;
    };
    description: {
        en: string;
        fa: string;
    };
    url: string;
}

export interface WorkshopAndStudio {
    id: number;
    title: {
        en: string;
        fa: string;
    };
    description: {
        en: string;
        fa: string;
    };
    video: string;
    closeUps: WorkshopCloseUp[];
}

export const workshopAndStudios: WorkshopAndStudio[] = [
    {
        id: 1,
        title: {
            en: "Chocolate making workshop",
            fa: "کارگاه شکلات‌سازی",
        },
        description: {
            en: "A hands-on workshop where you can discover the art of making delicious chocolate and learn about traditional and modern chocolate-making techniques.",
            fa: "کارگاهی برای آشنایی با هنر شکلات‌سازی که در آن با روش‌های سنتی و مدرن تهیه شکلات آشنا می‌شوید و تجربه‌ای جذاب و متفاوت خواهید داشت.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "Discover a warm and inviting space where creativity and craftsmanship come together.",
                    fa: "فضایی گرم و دلنشین که در آن خلاقیت و هنر دست در کنار یکدیگر قرار گرفته‌اند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Art of Chocolate Making",
                    fa: "هنر شکلات‌سازی",
                },
                description: {
                    en: "Explore the fascinating process of transforming simple ingredients into beautifully crafted chocolate.",
                    fa: "با فرآیند جذاب تبدیل مواد اولیه ساده به شکلات‌هایی زیبا و خوش‌طعم آشنا شوید.",
                },
                url: "/",
            },
            {
                title: {
                    en: "A Taste of Creativity",
                    fa: "طعم خلاقیت",
                },
                description: {
                    en: "Experience the creativity, precision, and passion behind every handcrafted piece of chocolate.",
                    fa: "خلاقیت، دقت و اشتیاقی را تجربه کنید که پشت هر قطعه شکلات دست‌ساز قرار دارد.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 2,
        title: {
            en: "Coffee roasting workshop",
            fa: "کارگاه برشته‌کاری قهوه",
        },
        description: {
            en: "Discover the world of coffee roasting and learn how carefully selected coffee beans are transformed into rich and aromatic coffee.",
            fa: "با دنیای برشته‌کاری قهوه آشنا شوید و ببینید چگونه دانه‌های منتخب قهوه به قهوه‌ای خوش‌عطر و غنی تبدیل می‌شوند.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "Discover a welcoming space dedicated to the art and culture of coffee.",
                    fa: "فضایی دلنشین که به هنر و فرهنگ قهوه اختصاص یافته است.",
                },
                url: "/",
            },
            {
                title: {
                    en: "From Bean to Roast",
                    fa: "از دانه تا برشته‌کاری",
                },
                description: {
                    en: "Follow the journey of coffee beans and discover how roasting brings out their unique character and aroma.",
                    fa: "مسیر دانه‌های قهوه را دنبال کنید و با تأثیر فرآیند برشته‌کاری بر عطر و ویژگی‌های منحصربه‌فرد آن‌ها آشنا شوید.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Craft of Coffee",
                    fa: "هنر قهوه",
                },
                description: {
                    en: "Learn about the details and craftsmanship that make every cup of coffee a unique experience.",
                    fa: "با جزئیات و مهارتی آشنا شوید که هر فنجان قهوه را به تجربه‌ای منحصربه‌فرد تبدیل می‌کند.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 3,
        title: {
            en: "Sculpture Workshop",
            fa: "کارگاه مجسمه‌سازی",
        },
        description: {
            en: "Explore the creative process of sculpture and discover how ideas are transformed into expressive three-dimensional artworks.",
            fa: "با فرآیند خلاقانه مجسمه‌سازی آشنا شوید و ببینید چگونه ایده‌ها به آثار هنری سه‌بعدی و بیانگر تبدیل می‌شوند.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "A creative environment where artists can explore ideas and bring them to life.",
                    fa: "محیطی خلاقانه که هنرمندان در آن می‌توانند ایده‌های خود را کشف کرده و به آن‌ها جان ببخشند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Shaping an Idea",
                    fa: "شکل دادن به یک ایده",
                },
                description: {
                    en: "Discover how imagination, technique, and patience come together to create a sculpture.",
                    fa: "ببینید چگونه تخیل، مهارت و صبر در کنار یکدیگر یک مجسمه را شکل می‌دهند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Language of Sculpture",
                    fa: "زبان مجسمه",
                },
                description: {
                    en: "Experience the unique way sculptures communicate ideas, emotions, and stories without words.",
                    fa: "با شیوه منحصربه‌فرد مجسمه‌ها برای بیان ایده‌ها، احساسات و داستان‌ها بدون استفاده از کلمات آشنا شوید.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 4,
        title: {
            en: "Pipe production workshop",
            fa: "کارگاه تولید پیپ",
        },
        description: {
            en: "Discover the craftsmanship behind pipe making and explore the detailed process of shaping, refining, and finishing each piece.",
            fa: "با هنر و مهارت ساخت پیپ آشنا شوید و مراحل دقیق شکل‌دهی، پرداخت و تکمیل هر قطعه را کشف کنید.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "A carefully designed space where traditional craftsmanship meets contemporary creativity.",
                    fa: "فضایی با طراحی خاص که در آن هنر و مهارت سنتی با خلاقیت معاصر ترکیب شده است.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Making of a Pipe",
                    fa: "ساخت یک پیپ",
                },
                description: {
                    en: "Explore the careful process of shaping and refining materials to create a distinctive handcrafted pipe.",
                    fa: "با فرآیند دقیق شکل‌دهی و پرداخت مواد برای ساخت یک پیپ دست‌ساز و منحصربه‌فرد آشنا شوید.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Craftsmanship in Every Detail",
                    fa: "هنر در هر جزئیات",
                },
                description: {
                    en: "Every detail reflects patience, precision, and the experience of skilled craftsmanship.",
                    fa: "هر جزئیات نشان‌دهنده صبر، دقت و تجربه یک هنرمند ماهر است.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 5,
        title: {
            en: "Exquisite boxes workshop",
            fa: "کارگاه ساخت جعبه‌های نفیس",
        },
        description: {
            en: "Discover the art of creating exquisite handcrafted boxes, where fine materials, precision, and artistic details come together.",
            fa: "با هنر ساخت جعبه‌های نفیس و دست‌ساز آشنا شوید؛ جایی که متریال باکیفیت، دقت و جزئیات هنری در کنار یکدیگر قرار می‌گیرند.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "A refined environment created for appreciating traditional craftsmanship and artistic details.",
                    fa: "محیطی ظریف و چشم‌نواز برای تجربه هنرهای سنتی و توجه به جزئیات هنری.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Art of Fine Boxes",
                    fa: "هنر جعبه‌سازی نفیس",
                },
                description: {
                    en: "Explore how carefully selected materials and precise craftsmanship create elegant and functional boxes.",
                    fa: "ببینید چگونه انتخاب دقیق مواد اولیه و مهارت در ساخت، جعبه‌هایی زیبا و کاربردی خلق می‌کند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Details That Matter",
                    fa: "جزئیاتی که اهمیت دارند",
                },
                description: {
                    en: "From the smallest details to the final finish, every element is carefully considered.",
                    fa: "از کوچک‌ترین جزئیات تا پرداخت نهایی، هر بخش با دقت و ظرافت طراحی و اجرا می‌شود.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 6,
        title: {
            en: "Hyperreal Sculpture Workshop",
            fa: "کارگاه مجسمه‌سازی هایپررئال",
        },
        description: {
            en: "Explore the fascinating world of hyperreal sculpture, where extraordinary attention to detail brings lifelike figures and forms to life.",
            fa: "با دنیای شگفت‌انگیز مجسمه‌سازی هایپررئال آشنا شوید؛ جایی که توجه فوق‌العاده به جزئیات، فرم‌هایی نزدیک به واقعیت خلق می‌کند.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "Step into a creative space where observation and craftsmanship come together to recreate reality.",
                    fa: "وارد فضایی خلاقانه شوید که در آن مشاهده دقیق و مهارت هنری برای بازآفرینی واقعیت در کنار هم قرار گرفته‌اند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Bringing Reality to Life",
                    fa: "جان بخشیدن به واقعیت",
                },
                description: {
                    en: "Discover the techniques used to capture realistic expressions, textures, and human details.",
                    fa: "با تکنیک‌هایی آشنا شوید که برای بازآفرینی حالت‌های چهره، بافت‌ها و جزئیات انسانی به کار می‌روند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Every Detail Matters",
                    fa: "هر جزئیاتی اهمیت دارد",
                },
                description: {
                    en: "Hyperreal sculpture requires extraordinary patience and precision, with every small detail contributing to the final result.",
                    fa: "مجسمه‌سازی هایپررئال به صبر و دقت زیادی نیاز دارد و هر جزئیات کوچک در نتیجه نهایی تأثیرگذار است.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 7,
        title: {
            en: "Jewelry workshop",
            fa: "کارگاه جواهرسازی",
        },
        description: {
            en: "Discover the creative and precise process of jewelry making, from shaping materials to creating refined and unique pieces.",
            fa: "با فرآیند خلاقانه و دقیق جواهرسازی آشنا شوید؛ از شکل‌دهی مواد اولیه تا ساخت قطعاتی ظریف و منحصربه‌فرد.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "A refined creative space where traditional jewelry craftsmanship meets artistic expression.",
                    fa: "فضایی هنری و ظریف که در آن مهارت سنتی جواهرسازی با بیان هنری ترکیب می‌شود.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Art of Jewelry Making",
                    fa: "هنر جواهرسازی",
                },
                description: {
                    en: "Explore the detailed process of transforming raw materials into elegant jewelry pieces.",
                    fa: "با فرآیند دقیق تبدیل مواد اولیه به قطعات ظریف و زیبای جواهر آشنا شوید.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Crafted with Precision",
                    fa: "ساخته‌شده با دقت",
                },
                description: {
                    en: "Every piece is shaped with patience and precision to create a distinctive and lasting work.",
                    fa: "هر قطعه با صبر و دقت شکل می‌گیرد تا اثری متمایز و ماندگار خلق شود.",
                },
                url: "/",
            },
        ],
    },

    {
        id: 8,
        title: {
            en: "Royal Ware Workshop",
            fa: "کارگاه ساخت ظروف سلطنتی",
        },
        description: {
            en: "Discover the craftsmanship behind elegant royal ware and explore the artistic details that make each piece distinctive.",
            fa: "با هنر و مهارت ساخت ظروف سلطنتی آشنا شوید و جزئیات هنری‌ای را کشف کنید که هر قطعه را متمایز می‌کنند.",
        },
        video: "",
        closeUps: [
            {
                title: {
                    en: "A Warm Space Inside Loghanteh",
                    fa: "فضایی گرم و دلنشین در لوگنته",
                },
                description: {
                    en: "A refined space where history, craftsmanship, and artistic heritage come together.",
                    fa: "فضایی ظریف که در آن تاریخ، هنر دست و میراث هنری در کنار یکدیگر قرار گرفته‌اند.",
                },
                url: "/",
            },
            {
                title: {
                    en: "The Art of Royal Ware",
                    fa: "هنر ساخت ظروف سلطنتی",
                },
                description: {
                    en: "Explore the artistic process behind creating elegant pieces inspired by history and traditional craftsmanship.",
                    fa: "با فرآیند هنری ساخت قطعات ظریف و باشکوه با الهام از تاریخ و هنرهای سنتی آشنا شوید.",
                },
                url: "/",
            },
            {
                title: {
                    en: "Elegance in Every Detail",
                    fa: "ظرافت در هر جزئیات",
                },
                description: {
                    en: "Careful craftsmanship and attention to detail give every piece its unique character and elegance.",
                    fa: "مهارت دقیق و توجه به جزئیات به هر قطعه شخصیت و ظرافتی منحصربه‌فرد می‌بخشد.",
                },
                url: "/",
            },
        ],
    },
];