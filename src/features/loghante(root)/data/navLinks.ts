import { IMuseumPart, museumParts } from "./museumParts";

export interface INavLink {
  id: number;

  name: {
    en: string;
    fa: string;
  };

  path: string;

  museumParts?: IMuseumPart[];
}

export const navLinks: INavLink[] = [
  {
    id: 1,
    name: {
      en: "Home Page",
      fa: "صفحه اصلی",
    },
    path: "#hero",
  },

  {
    id: 2,
    name: {
      en: "Shop",
      fa: "فروشگاه",
    },
    path: "#shop",
  },

  {
    id: 3,
    name: {
      en: "About Museum",
      fa: "درباره موزه",
    },
    path: "#about",
  },

  {
    id: 4,
    name: {
      en: "Events & Courses",
      fa: "رویداد ها و دوره ها",
    },
    path: "#events-and-courses",
  },

  {
    id: 5,
    name: {
      en: "Museum Parts",
      fa: "مجموعه ها",
    },
    path: "#museum-parts",
    museumParts,
  },

  {
    id: 6,
    name: {
      en: "Cinema & Theaters",
      fa: "سینما و تئاتر",
    },
    path: "#cinema-and-theaters",
  },

  {
    id: 7,
    name: {
      en: "Cafe Menus",
      fa: "منو کافه ها",
    },
    path: "#cafes-and-foods",
  },

  {
    id: 8,
    name: {
      en: "Conference Hall Reservation",
      fa: "رزرو سالن کنفرانس",
    },
    path: "#conference-hall-reservation",
  },

  {
    id: 9,
    name: {
      en: "Virtual Tour",
      fa: "تور مجازی",
    },
    path: "#virtual-tour",
  },

  {
    id: 10,
    name: {
      en: "Contact Us",
      fa: "تماس با ما",
    },
    path: "#footer",
  },

  // {
  //   id: 11,
  //   name: {
  //     en: "Work With Us",
  //     fa: "همکاری با ما",
  //   },
  //   path: "#work-with-us",
  // },
];