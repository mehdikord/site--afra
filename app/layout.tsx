import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/Navbar";
import { MobileDock } from "@/components/MobileDock";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "املاک افرا — AFRA | مشاوره هوشمند ملک",
  description:
    "افرا؛ برند مشاوره هوشمند املاک. خرید، فروش، رهن و اجاره، سرمایه‌گذاری و ساخت‌وساز با انتخاب‌های هوشمندانه و معامله‌های مطمئن.",
  keywords: ["املاک", "افرا", "مشاوره ملک", "خرید آپارتمان", "سرمایه‌گذاری ملکی", "رهن و اجاره"],
  openGraph: {
    title: "املاک افرا — AFRA",
    description: "خانه‌ای برای انتخاب‌های هوشمندانه",
    locale: "fa_IR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0A14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-afra-magenta focus:px-5 focus:py-2 focus:text-white"
          >
            پرش به محتوای اصلی
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileDock />
        </Providers>
      </body>
    </html>
  );
}
