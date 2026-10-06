import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "@/app/globals.css";

import { Analytics } from '@vercel/analytics/next';

import { poppins, rozname, wulkan } from "@/font";

import Header from "@/features/loghante(root)/components/header/Header";
import Footer from "@/components/shared/footer/Footer";

import { ProfileProvider } from "@/contexts/ProfileProvider";
import { TicketPaymentProvider } from "@/features/loghante(root)/context/TicketPaymentContext";
import { HallProvider } from "@/features/loghante(root)/halls/context/HallProvider";

const SITE_URL = "https://loghanteh-frontend.vercel.app";

const SITE_NAME = "Loghanteh";

const SITE_DESCRIPTION =
  "Discover museums, cultural events, cinema, theater, and educational experiences at Loghanteh. Explore, book tickets, and experience culture in a modern way.";

const SOCIAL_IMAGE = "/images/loghanteh-cafe.jpg";
const LOGO_IMAGE = "/images/Loghanteh-logo.svg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isPersian = locale === "fa";

  const title = isPersian
    ? "لُقنطه | تجربه‌ای متفاوت از فرهنگ و هنر"
    : "Loghanteh | Discover Culture, Art & Experiences";

  const description = isPersian
    ? "موزه‌ها، رویدادهای فرهنگی، سینما، تئاتر و تجربه‌های آموزشی را در لُقنطه کشف کنید و بلیت خود را آنلاین رزرو کنید."
    : SITE_DESCRIPTION;

  const localeUrl = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },

    description,

    applicationName: SITE_NAME,

    keywords: [
      "Loghanteh",
      "Loghante",
      "museum",
      "museums",
      "culture",
      "art",
      "cultural events",
      "cinema",
      "theater",
      "courses",
      "museum tickets",
      "event tickets",
      "online ticket booking",
      "Iran culture",
      "Iran museums",
    ],

    authors: [
      {
        name: "Loghanteh",
        url: SITE_URL,
      },
    ],

    creator: "Loghanteh",
    publisher: "Loghanteh",

    category: "Culture and Entertainment",

    alternates: {
      canonical: localeUrl,

      languages: {
        en: `${SITE_URL}/en`,
        fa: `${SITE_URL}/fa`,
        "x-default": `${SITE_URL}/en`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    icons: {
      icon: [
        {
          url: LOGO_IMAGE,
          type: "image/svg+xml",
        },
      ],
      shortcut: LOGO_IMAGE,
    },

    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: localeUrl,
      locale: isPersian ? "fa_IR" : "en_US",
      alternateLocale: isPersian ? ["en_US"] : ["fa_IR"],

      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "Loghanteh - Culture, Art and Experiences",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: SOCIAL_IMAGE,
          alt: "Loghanteh - Culture, Art and Experiences",
        },
      ],
    },

    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },

    referrer: "origin-when-cross-origin",

    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-title": SITE_NAME,
      "theme-color": "#5c2127",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  const direction = locale === "fa" ? "rtl" : "ltr";

  const font =
    locale === "fa"
      ? `${rozname.variable} text-lg font-semibold`
      : `${poppins.variable} ${wulkan.variable}`;

  return (
    <html lang={locale} dir={direction}>
      <body className={font} cz-shortcut-listen="true">
        <NextIntlClientProvider messages={messages}>
          <ProfileProvider>
            <TicketPaymentProvider>
              <Header />

              <HallProvider>
                <div className="min-h-screen">
                  {children}
                </div>
              </HallProvider>

              <Footer />
            </TicketPaymentProvider>
          </ProfileProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}