import localFont from "next/font/local";

// ==================== English ====================

export const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/english/poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const wulkan = localFont({
  src: [
    {
      path: "../../public/fonts/english/wulkan/Wulkan Display-normal-400-100.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/english/wulkan/Wulkan Display-normal-600-100.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-wulkan",
  display: "swap",
});

// ==================== Persian ====================

export const rozname = localFont({
  src: [
    {
      path: "../../public/fonts/persian/rozname/Far_Rooznameh.ttf",
      weight: "400",
      style: "normal",
    },
  ],

  variable: "--font-rozname",
  display: "swap",
});

// export const ordibehesht = localFont({
//   src: [
//     {
//       path: "../../public/fonts/persian/ordibehesht/Ordibehesht.TTF",
//       weight: "400",
//       style: "normal",
//     },
//   ],
//   variable: "--font-ordibehesht",
//   display: "swap",
// });