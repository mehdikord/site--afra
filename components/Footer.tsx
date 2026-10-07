import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { Logo, ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/nav";
import { SERVICES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 light:border-ink/10">
      {/* animated background */}
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-afra-magenta/15 blur-[120px] animate-drift" aria-hidden />
      <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-afra-royal/15 blur-[120px] animate-drift" style={{ animationDelay: "-7s" }} aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-afra-magenta/60 via-50% to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-28 md:pb-10 pt-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-mist light:text-[#5b5e70]">
              افرا؛ مشاوره هوشمند ملک برای انتخاب‌های هوشمندانه و معامله‌های مطمئن. خرید، فروش، رهن و اجاره، سرمایه‌گذاری و ساخت‌وساز.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, label: "اینستاگرام" },
                { icon: Send, label: "تلگرام" },
                { icon: Linkedin, label: "لینکدین" },
                { icon: Mail, label: "ایمیل" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="/contact"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full hairline text-mist transition hover:border-afra-magenta/60 hover:text-white hover:shadow-glow light:text-[#5b5e70] light:hover:text-ink"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle />
              <span className="text-xs text-mist light:text-[#8a8fa0]">حالت نمایش</span>
            </div>
          </div>

          {/* nav */}
          <nav aria-label="دسترسی سریع">
            <h3 className="font-display text-base">دسترسی سریع</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-mist transition hover:text-white hover:pr-1 light:text-[#5b5e70] light:hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/licenses" className="text-mist transition hover:text-white hover:pr-1 light:text-[#5b5e70] light:hover:text-ink">
                  مجوزها و افتخارات
                </Link>
              </li>
            </ul>
          </nav>

          {/* services */}
          <nav aria-label="خدمات افرا">
            <h3 className="font-display text-base">خدمات افرا</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href="/services" className="text-mist transition hover:text-white hover:pr-1 light:text-[#5b5e70] light:hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="font-display text-base">تماس با افرا</h3>
            <ul className="mt-4 space-y-3 text-sm text-mist light:text-[#5b5e70]">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-afra-emerald" /> <span dir="ltr">۰۲۱ ــ ــ ــ ــ ــ ــ ــ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-afra-magenta" /> <span dir="ltr">hello@afra.example</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-afra-ember" />
                تهران، خیابان ولیعصر، بالاتر از پارک ساعی (نشانی نمایشی)
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="text-afra-cyan" /> شنبه تا پنجشنبه، ۹ صبح تا ۹ شب
              </li>
            </ul>
            <Link
              href="/contact"
              className="btn-sheen mt-6 inline-flex items-center gap-2 rounded-full bg-grad-emerald px-6 py-2.5 text-sm font-bold text-ink shadow-glow-green transition-transform hover:scale-[1.03]"
            >
              دریافت مشاوره رایگان
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-mist light:text-[#8a8fa0] md:flex-row light:border-ink/10">
          <p>© ۱۴۰۵ املاک افرا — AFRA. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-5">
            <Link href="/licenses" className="transition hover:text-white light:hover:text-ink">قوانین و مقررات</Link>
            <Link href="/licenses" className="transition hover:text-white light:hover:text-ink">حریم خصوصی</Link>
            <span className="hidden items-center gap-1.5 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-afra-emerald shadow-glow-green" />
              نسخه نمایشی
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
