import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Заказать минивэн с водителем межгород от 60 руб/км — ЗаказМинивена.ru",
  description:
    "Минивэн с водителем на 7 мест: межгородние поездки и трансфер в аэропорт по России. Фиксированная цена от 60 руб/км, детское кресло бесплатно, без предоплаты. Звоните +7 (918) 587-54-54.",
  keywords:
    "заказать минивэн, минивэн с водителем, такси минивэн, трансфер минивэн, минивэн межгород, групповой трансфер, минивэн 7 мест, трансфер аэропорт минивэн, минивэн с детским креслом",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Минивэн с водителем межгород — от 60 руб/км | ЗаказМинивена.ru",
    description:
      "Комфортные поездки на минивэне 7 мест для семьи и компании. Фиксированная цена, детское кресло, встреча с табличкой.",
    url: "https://zakazminivena.ru",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
          ym(79701640,'init',{webvisor:true,clickmap:true,referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/79701640"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
