import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "../Session/SessionProvider";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://mosqtime.com"),
  title: "Mosqtime.com - Mosque digital clock software For Free",
  description:
    "MosqTime offers a free and open-source digital clock software specifically designed for mosques. Easily display accurate prayer times on smart TVs and other digital displays. Customize your mosque's timetable to ensure timely prayers and enhance the worship experience. Our user-friendly software supports multiple languages and is perfect for mosques worldwide. Whether you're in Saudi Arabia, Pakistan, Indonesia, or any other country, MosqTime provides a reliable and modern solution for your mosque's needs. Set up your mosque prayer time display effortlessly with MosqTime.",
  // keywords: [
  //   "mosque digital clock software",
  //   "free mosque prayer time display",
  //   "open-source mosque timetable software",
  //   "free masjid azan clock",
  //   "digital namaz clock for mosque",
  //   "mosque prayer schedule display",
  //   "free mosque prayer time solution",
  //   "smart TV prayer time display",
  //   "mosque LED display software",
  //   "masjid digital timetable",
  //   "free mosque clock app",
  //   "masjid smart TV prayer times",
  //   "mosque digital azan timer",
  //   "mosque LED clock for prayer times",
  //   "how to set up digital prayer times for mosques",
  //   "free software for displaying prayer times in mosques",
  //   "open-source digital mosque clock for smart TVs",
  //   "easy mosque prayer time display software",
  //   "free digital azan clock for masjids",
  //   "customizable mosque prayer time display software",
  //   "digital clock for mosques",
  //   "mosque prayer time software",
  //   "free mosque timetable display",
  //   "mosque digital prayer times",
  //   "need free mosque prayer time display",
  //   "best free mosque clock software",
  //   "solve prayer time display for mosques",
  //   "digital solution for mosque prayer times",
  //   "prayer time app for mosques",
  //   "mosque technology solutions",
  //   "digital signage for mosques",
  //   "mosque management software",
  //   "free masjid technology tools",
  //   "mosque display systems",
  //   "mosque tv"
  // ],
  openGraph: {
    title:
      "Free Mosque Prayer Time Display Software | Open-Source Digital Clock for Mosques",
    description:
      "Discover the best free mosque prayer time display software at mosqtime.com. Our open-source digital clock solutions for mosques offer customizable, easy-to-use prayer schedule displays for smart TVs and LED screens. Enhance your mosques technology with our innovative, free software for accurate and attractive prayer time management.",
    type: "website",
    locale: "en_US",
    url: "https://mosqtime.com/",
    siteName: "MosqTime",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 620,
        alt: "MosqTime - Free Mosque Prayer Time Display Software",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </head>
      <body>
        <StoreProvider>
          <SessionProvider>{children}</SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
