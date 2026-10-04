export interface ILanguage {
  id: number;

  code: string;

  name: {
    en: string;
    fa: string;
  };
}

export const languages: ILanguage[] = [
  {
    id: 1,
    code: "en",

    name: {
      en: "English",
      fa: "انگلیسی",
    },
  },

  {
    id: 2,
    code: "fa",

    name: {
      en: "Persian",
      fa: "فارسی",
    },
  },
];