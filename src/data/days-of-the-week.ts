interface IDayOfTheWeek {
  id: number;

  dayOTWeek: {
    en: string;
    fa: string;
  };

  dayOTWeekNumber: number;
}

export const DayOfTheWeek: IDayOfTheWeek[] = [
  {
    id: 1,
    dayOTWeek: {
      en: "Saturday",
      fa: "شنبه",
    },
    dayOTWeekNumber: 1,
  },
  {
    id: 2,
    dayOTWeek: {
      en: "Sunday",
      fa: "یکشنبه",
    },
    dayOTWeekNumber: 2,
  },
  {
    id: 3,
    dayOTWeek: {
      en: "Monday",
      fa: "دوشنبه",
    },
    dayOTWeekNumber: 3,
  },
  {
    id: 4,
    dayOTWeek: {
      en: "Tuesday",
      fa: "سه‌شنبه",
    },
    dayOTWeekNumber: 4,
  },
  {
    id: 5,
    dayOTWeek: {
      en: "Wednesday",
      fa: "چهارشنبه",
    },
    dayOTWeekNumber: 5,
  },
  {
    id: 6,
    dayOTWeek: {
      en: "Thursday",
      fa: "پنجشنبه",
    },
    dayOTWeekNumber: 6,
  },
  {
    id: 7,
    dayOTWeek: {
      en: "Friday",
      fa: "جمعه",
    },
    dayOTWeekNumber: 7,
  },
];