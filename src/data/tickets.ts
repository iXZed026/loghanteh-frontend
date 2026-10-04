export interface ITicket {
  id: number;

  ticketType: {
    en: string;
    fa: string;
  };

  href: string;
}

export const tickets: ITicket[] = [
  {
    id: 1,
    ticketType: {
      en: "Museums Tour",
      fa: "تور موزه ها",
    },
    href: "/museums-tour",
  },

  {
    id: 2,
    ticketType: {
      en: "Cinema & Theater",
      fa: "سینما و تئاتر",
    },
    href: "/cinema-and-theater",
  },

  {
    id: 3,
    ticketType: {
      en: "Events & Courses",
      fa: "رویداد ها و دوره ها",
    },
    href: "/events-and-courses",
  },
];