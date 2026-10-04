interface ITicketRule {
    id: number;
    rulesText: {
        en: string;
        fa: string;
    };
}

export const ticketRules: ITicketRule[] = [
    {
        id: 1,
        rulesText: {
            en: "Please read the payment and tour rules carefully before completing your purchase.",
            fa: "لطفاً پیش از پرداخت، قوانین و شرایط بازدید را به دقت مطالعه کنید."
        }
    },
    {
        id: 2,
        rulesText: {
            en: "After payment, ticket cancellation or changing the visit time will be subject to the museum's terms and conditions.",
            fa: "پس از پرداخت، لغو یا تغییر زمان بلیت مطابق با شرایط و قوانین مجموعه خواهد بود."
        }
    },
    {
        id: 3,
        rulesText: {
            en: "Please arrive at the museum at the scheduled time and follow all visit rules and regulations.",
            fa: "لطفاً در زمان تعیین‌شده برای بازدید در مجموعه حضور داشته باشید و قوانین مربوط به بازدید را رعایت کنید."
        }
    }
];