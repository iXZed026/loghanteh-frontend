import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";
import { poppins, rozname, wulkan } from "@/font";
import Header from "@/features/loghante(root)/components/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { ProfileProvider } from "@/contexts/ProfileProvider";
import { TicketPaymentProvider } from "@/features/loghante(root)/context/TicketPaymentContext";
import { HallProvider } from "@/features/loghante(root)/halls/context/HallProvider";


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  const messages = await getMessages();


  const direction = locale === "fa" ? "rtl" : "ltr";
  const font = locale === "fa"
    ? `${rozname.variable} text-lg font-semibold`
    : `${poppins.variable} ${wulkan.variable}`
  // ${ordibehesht.variable}
  return (
    <html
      lang={locale}
      dir={direction}
    >
      <body
        className={`${font}`}
        cz-shortcut-listen="true"
      >
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
      </body>
    </html>
  );
}



