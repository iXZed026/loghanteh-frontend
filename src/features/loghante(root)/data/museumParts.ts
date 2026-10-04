export interface IMuseumPart {
  id: number;

  name: {
    en: string;
    fa: string;
  };

  description: {
    en: string;
    fa: string;
  };

  href: string;
  imageURL: string;
}

export const museumParts: IMuseumPart[] = [
  {
    id: 1,
    name: {
      en: "Chocolate Coffee",
      fa: "قهوه شکلات",
    },
    description: {
      en: "This is a test description",
      fa: "این یک متن تستی برای دیسکریپشن است",
    },
    href: "/chocolate-coffee",
    imageURL: "/images/loghanteh-cafe.jpg",
  },

  {
    id: 2,
    name: {
      en: "Tehran Alef",
      fa: "تهران الف",
    },
    description: {
      en: "This is a test description",
      fa: "این یک متن تستی برای دیسکریپشن است",
    },
    href: "/tehran-alef",
    imageURL: "/images/loghanteh-cafe.jpg",
  },

  {
    id: 3,
    name: {
      en: "Loghanteh Palace",
      fa: "موزه قصر",
    },
    description: {
      en: "This is a test description",
      fa: "این یک متن تستی برای دیسکریپشن است",
    },
    href: "/palace",
    imageURL: "/images/loghanteh-cafe.jpg",
  },

  {
    id: 4,
    name: {
      en: "Loghanteh Cafe",
      fa: "کافه لقانطه",
    },
    description: {
      en: "This is a test description",
      fa: "این یک متن تستی برای دیسکریپشن است",
    },
    href: "/cafe",
    imageURL: "/images/loghanteh-cafe.jpg",
  },

  {
    id: 5,
    name: {
      en: "National Museum of Iranian Trade Houses",
      fa: "موزه ملی تجارتخانه ایران",
    },
    description: {
      en: "This is a test description",
      fa: "این یک متن تستی برای دیسکریپشن است",
    },
    href: "/trade-houses",
    imageURL: "/images/loghanteh-cafe.jpg",
  },

  {
    id: 6,
    name: {
      en: "National Museum of Entrepreneurs",
      fa: "موزه ملی کارآفرینان",
    },
    description: {
      en: "This is a test description",
      fa: "این یک متن تستی برای دیسکریپشن است",
    },
    href: "/entrepreneurs",
    imageURL: "/images/loghanteh-cafe.jpg",
  },
];