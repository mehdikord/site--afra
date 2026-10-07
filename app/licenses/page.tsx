import { Award, BadgeCheck, FileBadge, Handshake, Medal, ShieldCheck, Star } from "lucide-react";
import { CtaBand, PageHero } from "@/components/sections";
import { Reveal, SectionHeading } from "@/components/motion";

const LICENSES = [
  { icon: FileBadge, title: "پروانه کسب مشاور املاک", desc: "مجوز رسمی فعالیت در حوزه مشاوره و واسطه‌گری ملکی. (متن نمایشی — جایگزین شود)", tone: "magenta" },
  { icon: Handshake, title: "عضویت اتحادیه مشاوران املاک", desc: "عضویت فعال و پایبندی به آیین‌نامه‌های صنفی. (متن نمایشی — جایگزین شود)", tone: "emerald" },
  { icon: ShieldCheck, title: "گواهی صلاحیت حرفه‌ای", desc: "احراز صلاحیت تخصصی تیم مشاوران ارشد. (متن نمایشی — جایگزین شود)", tone: "sunset" },
];

const CERTS = [
  { icon: BadgeCheck, title: "گواهی کارشناسی و ارزیابی ملک", desc: "توانایی ارائه گزارش رسمی کارشناسی قیمت و فنی. (نمایشی)" },
  { icon: Star, title: "نشان اعتماد مشتریان", desc: "کسب رضایت حداکثری در نظرسنجی‌های دوره‌ای. (نمایشی)" },
  { icon: Medal, title: "برند مشاور برتر منطقه", desc: "انتخاب به‌عنوان مشاور مرجع در نظرسنجی محلی. (نمایشی)" },
  { icon: Award, title: "تقدیرنامه خدمات شفاف", desc: "تقدیر برای شفافیت در اطلاع‌رسانی و قراردادها. (نمایشی)" },
];

const TONE_BG: Record<string, string> = {
  magenta: "bg-grad-magenta text-white shadow-glow",
  emerald: "bg-grad-emerald text-ink shadow-glow-green",
  sunset: "bg-grad-sunset text-ink",
};

export default function LicensesPage() {
  return (
    <>
      <PageHero
        eyebrow="شفافیت افرا"
        title="مجوزها، گواهی‌ها و افتخارات"
        desc="اعتماد با حرف ساخته نمی‌شود؛ با سند. این صفحه را به مدارک و افتخارات افرا اختصاص داده‌ایم."
      />

      {/* licenses */}
      <section className="mx-auto max-w-7xl px-4 md:px-8" aria-label="مجوزها">
        <SectionHeading align="start" eyebrow="مجوزهای فعالیت" title="مجوزهای رسمی افرا" tone="emerald" />
        <div className="grid gap-5 md:grid-cols-3">
          {LICENSES.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.08}>
              <article className="card-surface group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-afra-gold/60 to-transparent" aria-hidden />
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${TONE_BG[l.tone]}`}>
                  <l.icon size={30} />
                </span>
                <h3 className="font-display mt-5 text-xl">{l.title}</h3>
                <p className="mt-2 text-sm leading-8 text-mist light:text-[#5b5e70]">{l.desc}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-dashed border-white/10 pt-4 text-[13px] text-mist light:text-[#8a8fa0] light:border-ink/10">
                  <ShieldCheck size={16} className="text-afra-emerald" />
                  تصویر مدرک پس از تأیید نهایی در این بخش قرار می‌گیرد
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* certificates */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-label="گواهی‌ها و افتخارات">
        <SectionHeading eyebrow="افتخارات" title="گواهی‌ها و افتخارات افرا" desc="هر افتخار، روایتی از یک اعتماد است؛ اعتمادی که مشتریان به ما سپرده‌اند." tone="sunset" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <article className="glass group h-full rounded-3xl p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-afra-gold/50 hover:shadow-card">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-afra-gold/20 to-afra-ember/20 text-afra-gold ring-1 ring-afra-gold/30 transition-transform duration-500 group-hover:scale-110">
                  <c.icon size={26} />
                </span>
                <h3 className="font-display mt-4 text-[17px]">{c.title}</h3>
                <p className="mt-2 text-[13px] leading-7 text-mist light:text-[#5b5e70]">{c.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card-surface mt-8 flex flex-col items-center gap-4 rounded-[28px] p-8 text-center md:flex-row md:text-right">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-grad-magenta text-white shadow-glow">
              <Award size={26} />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-xl">تعهد شفافیت افرا</h3>
              <p className="mt-1.5 text-sm leading-8 text-mist light:text-[#5b5e70]">
                تمامی مدارک، مجوزها و سوابق افرا پیش از هر همکاری رسمی، برای رؤیت و راستی‌آزمایی در اختیار شما قرار می‌گیرد. اگر سندی را خواستید و ندیدید، حق دارید همکاری را متوقف کنید.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
