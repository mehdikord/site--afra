import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Award, BadgeCheck, BedDouble, Building2, Compass, FileCheck2,
  Gem, Handshake, HeartHandshake, KeyRound, LineChart, MapPin, Ruler,
  Search, ShieldCheck, SlidersHorizontal, Sparkles, Star,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { GlowDivider, Magnetic, Parallax, Reveal, SectionHeading, Tilt } from "@/components/motion";
import { MockMap } from "@/components/MockMap";
import { PropertyCard } from "@/components/PropertyCard";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand, ServiceCard } from "@/components/sections";
import { ABOUT_IMAGES, HERO_IMAGES, PROPERTIES, SERVICES, TEAM } from "@/lib/data";
import { faNum } from "@/lib/utils";

const WHY = [
  { icon: BadgeCheck, title: "تخصص و تجربه", desc: "تیمی از مشاوران ارشد با شناخت عمیق محله‌به‌محله تهران.", tone: "magenta" },
  { icon: Gem, title: "فایل‌های منتخب و متنوع", desc: "فقط فایل‌های واقعی، کارشناسی‌شده و به‌روز؛ بدون فایل صوری.", tone: "emerald" },
  { icon: HeartHandshake, title: "مشاوره حرفه‌ای", desc: "گوش دادن واقعی به نیاز شما و پیشنهاد متناسب، نه فروش اجباری.", tone: "sunset" },
  { icon: LineChart, title: "شناخت بازار", desc: "تحلیل قیمت و روند بازار برای خرید در بهترین نقطه.", tone: "magenta" },
  { icon: FileCheck2, title: "شفافیت", desc: "قیمت واقعی، سند شفاف و گزارش کارشناسی پیش از هر تصمیم.", tone: "emerald" },
  { icon: ShieldCheck, title: "امنیت معامله", desc: "بررسی حقوقی کامل و همراهی تا لحظه انتقال سند.", tone: "sunset" },
] as const;

const TONE_DOT: Record<string, string> = {
  magenta: "bg-afra-magenta shadow-glow",
  emerald: "bg-afra-emerald shadow-glow-green",
  sunset: "bg-afra-ember",
};

export default function HomePage() {
  const featured = PROPERTIES.filter((p) => p.featured);

  return (
    <>
      <Hero />

      {/* ------------------------------ intro ------------------------------ */}
      <section id="intro" className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28" aria-label="معرفی افرا">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="start"
              eyebrow="املاک افرا — AFRA"
              title="مشاوره‌ای که ملک را به انتخاب هوشمندانه تبدیل می‌کند"
            />
            <Reveal delay={0.15}>
              <p className="-mt-6 max-w-xl text-[15px] leading-9 text-mist light:text-[#5b5e70]">
                افرا یک آژانس سنتی نیست؛ یک برند مشاوره هوشمند املاک است. ما داده بازار، شناخت محله و تجربه معامله را کنار هم می‌گذاریم تا شما سریع‌تر انتخاب کنید، شفاف‌تر بخرید و با خیال راحت سند بزنید؛ از آپارتمان اول تا سبد سرمایه‌گذاری.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: KeyRound, label: "خرید و فروش" },
                  { icon: Building2, label: "رهن و اجاره" },
                  { icon: LineChart, label: "سرمایه‌گذاری" },
                ].map((c) => (
                  <div key={c.label} className="card-surface rounded-2xl p-4 text-center transition hover:-translate-y-1">
                    <c.icon size={22} className="mx-auto text-afra-magenta" />
                    <p className="mt-2 text-[13px] font-bold">{c.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/about" className="group mt-8 inline-flex items-center gap-2 text-[15px] font-bold">
                بیشتر با افرا آشنا شوید
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-magenta text-white shadow-glow transition-transform group-hover:-translate-x-1">
                  <ArrowLeft size={17} />
                </span>
              </Link>
            </Reveal>
          </div>

          {/* layered imagery */}
          <div className="relative hidden lg:block" aria-hidden>
            <Tilt max={4}>
              <div className="relative">
                <Parallax speed={0.08} className="rounded-[32px] border border-white/10 light:border-ink/10">
                  <Image src={HERO_IMAGES.card2} alt="" width={640} height={760} className="h-[540px] w-full object-cover" loading="lazy" />
                </Parallax>
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="glass animate-float absolute -right-6 top-10 rounded-2xl p-4 shadow-card">
                  <p className="flex items-center gap-2 text-sm font-bold"><ShieldCheck size={16} className="text-afra-emerald" /> امنیت معامله</p>
                  <p className="mt-1 text-xs text-mist light:text-[#8a8fa0]">بررسی حقوقی تا روز سند</p>
                </div>
                <div className="glass animate-float absolute -left-6 bottom-24 rounded-2xl p-4 shadow-card" style={{ animationDelay: "-3.5s" }}>
                  <p className="flex items-center gap-2 text-sm font-bold"><Sparkles size={16} className="text-afra-gold" /> کشف هوشمند ملک</p>
                  <p className="mt-1 text-xs text-mist light:text-[#8a8fa0]">جست‌وجوی دقیق، انتخاب سریع</p>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* ------------------------- smart search teaser ------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24" aria-label="جستجوی هوشمند ملک">
        <SectionHeading
          eyebrow="جستجوی هوشمند"
          title="ملک ایده‌آل‌تان را در چند ثانیه پیدا کنید"
          desc="نوع معامله، بودجه، متراژ و محله را مشخص کنید؛ موتور جست‌وجوی افرا از میان فایل‌های منتخب، بهترین گزینه‌ها را پیش رویتان می‌گذارد."
        />
        <Reveal delay={0.1}>
          <div className="card-surface relative mx-auto max-w-4xl overflow-hidden rounded-[28px] p-6 shadow-card md:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-afra-magenta/20 blur-[90px]" aria-hidden />
            <div className="relative grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <label className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 light:bg-ink/[0.04]">
                <Search size={20} className="shrink-0 text-afra-magenta" />
                <span className="sr-only">جست‌وجوی محله یا نام ملک</span>
                <input
                  type="search"
                  placeholder="محله، نام پروژه یا کد فایل… (مثلاً نیاوران)"
                  className="w-full bg-transparent text-[15px] outline-none placeholder:text-mist/60 light:placeholder:text-[#9aa0b0]"
                />
              </label>
              <div className="flex gap-2" role="group" aria-label="نوع معامله">
                {["خرید", "رهن و اجاره"].map((t, i) => (
                  <Link
                    key={t}
                    href={`/search?type=${i === 0 ? "buy" : "rent"}`}
                    className={i === 0
                      ? "flex-1 rounded-2xl bg-grad-magenta px-6 py-4 text-center text-[15px] font-bold text-white shadow-glow md:flex-none"
                      : "glass flex-1 rounded-2xl px-6 py-4 text-center text-[15px] font-bold md:flex-none"}
                  >
                    {t}
                  </Link>
                ))}
              </div>
              <Link href="/search" className="btn-sheen flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-[15px] font-bold text-ink transition hover:scale-[1.02] light:bg-ink light:text-white">
                <SlidersHorizontal size={18} /> فیلتر پیشرفته
              </Link>
            </div>
            <div className="relative mt-5 flex flex-wrap items-center gap-2 text-[13px]">
              <span className="text-mist light:text-[#8a8fa0]">جست‌وجوهای پرتکرار:</span>
              {["پنت‌هاوس نیاوران", "آپارتمان سعادت‌آباد", "ویلای زعفرانیه", "دفتر الهیه"].map((q) => (
                <Link key={q} href="/search" className="rounded-full border border-white/10 px-4 py-1.5 text-mist transition hover:border-afra-magenta/60 hover:text-white light:border-ink/10 light:text-[#5b5e70] light:hover:text-ink">
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* --------------------------- featured listings --------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-24" aria-label="فایل‌های منتخب">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="start" eyebrow="فایل‌های منتخب" title="پیشنهادهای این هفته افرا" />
          <Reveal delay={0.15}>
            <Link href="/properties" className="group mb-10 hidden items-center gap-2 rounded-full hairline px-6 py-3 text-sm font-bold transition hover:border-afra-magenta/60 md:inline-flex">
              مشاهده همه املاک <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
        <Reveal className="mt-8 text-center md:hidden">
          <Link href="/properties" className="btn-sheen inline-flex items-center gap-2 rounded-full bg-grad-magenta px-7 py-3 text-sm font-bold text-white shadow-glow">
            مشاهده همه املاک <ArrowLeft size={16} />
          </Link>
        </Reveal>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" tone="emerald" />

      {/* ------------------------------- services ------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24" aria-label="خدمات افرا">
        <SectionHeading
          eyebrow="خدمات تخصصی"
          title="هر نیازی در دنیای ملک دارید، افرا پاسخش را دارد"
          desc="از خرید اول تا ساخت‌وساز حرفه‌ای؛ شش خدمت تخصصی که با یک استاندارد مشترک ارائه می‌شوند: شفافیت، تخصص و امنیت."
          tone="emerald"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* -------------------------------- why afra -------------------------------- */}
      <section className="relative overflow-hidden py-20 md:py-24" aria-label="چرا افرا">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-panel/60 to-transparent light:via-white/70" aria-hidden />
        <div className="absolute right-1/2 top-0 h-72 w-[600px] translate-x-1/2 rounded-full bg-afra-royal/15 blur-[130px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="چرا افرا"
            title="انتخاب هوشمندانه‌تر، معامله مطمئن‌تر"
            desc="افرا را نه با شعار، که با استانداردهای کاری‌اش بشناسید؛ اصولی که در هر معامله رعایت می‌کنیم."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <div className="card-surface group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <span className="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
                      <w.icon size={24} className={w.tone === "magenta" ? "text-afra-magenta" : w.tone === "emerald" ? "text-afra-emerald" : "text-afra-ember"} />
                    </span>
                    <div>
                      <h3 className="font-display text-[17px]">{w.title}</h3>
                      <span className={`mt-2 block h-1 w-10 rounded-full ${TONE_DOT[w.tone]} transition-all duration-500 group-hover:w-16`} aria-hidden />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-mist light:text-[#5b5e70]">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* qualitative metrics strip */}
          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "پاسخ‌گویی سریع", value: "همان روز", tone: "text-grad-magenta" },
                { label: "کارشناسی", value: "پیش از هر معامله", tone: "text-grad-emerald" },
                { label: "همراهی حقوقی", value: "تا روز سند", tone: "text-grad-sunset" },
                { label: "فایل‌ها", value: "منتخب و واقعی", tone: "text-grad-magenta" },
              ].map((m) => (
                <div key={m.label} className="glass rounded-3xl p-5 text-center">
                  <p className={`font-display text-xl md:text-2xl ${m.tone}`}>{m.value}</p>
                  <p className="mt-1.5 text-[13px] text-mist light:text-[#5b5e70]">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ map discovery ------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-24" aria-label="کشف ملک روی نقشه">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              align="start"
              eyebrow="کشف روی نقشه"
              title="شهر را بگردید، ملک را پیدا کنید"
              desc="فایل‌های منتخب افرا را مستقیم روی نقشه ببینید؛ روی هر نشانگر بزنید، پیش‌نمایش بگیرید و وارد جزئیات شوید."
              tone="sunset"
            />
            <Reveal delay={0.15}>
              <ul className="-mt-4 space-y-3">
                {[
                  { icon: Compass, text: "مرور تصویری فایل‌ها بر اساس موقعیت" },
                  { icon: MapPin, text: "نشانگرهای ویژه برای پیشنهادهای افرا" },
                  { icon: Search, text: "پیش‌نمایش سریع و ورود به صفحه ملک" },
                ].map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-[15px]">
                    <span className="glass flex h-10 w-10 items-center justify-center rounded-xl">
                      <f.icon size={18} className="text-afra-ember" />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/search" className="group mt-7 inline-flex items-center gap-2 text-[15px] font-bold">
                رفتن به جستجوی پیشرفته
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-sunset text-ink transition-transform group-hover:-translate-x-1">
                  <ArrowLeft size={17} />
                </span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MockMap compact />
          </Reveal>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" tone="sunset" />

      {/* ------------------------------ testimonials ------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24" aria-label="رضایت مشتریان">
        <SectionHeading
          eyebrow="اعتماد مشتریان"
          title="حرف‌های کسانی که با افرا معامله کردند"
          desc="رضایت، برای ما یک عدد نیست؛ مجموعه‌ای از تجربه‌های واقعی است."
          tone="emerald"
        />
        <Testimonials />
      </section>

      {/* --------------------------------- team --------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-24" aria-label="تیم افرا">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="start" eyebrow="تیم افرا" title="مشاورانی که کنار شما می‌ایستند" />
          <Reveal delay={0.15}>
            <Link href="/team" className="group mb-10 hidden items-center gap-2 rounded-full hairline px-6 py-3 text-sm font-bold transition hover:border-afra-magenta/60 md:inline-flex">
              آشنایی با تیم <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <Link href="/team" className="card-surface group block overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
                <div className="relative aspect-[4/4.4] overflow-hidden">
                  <Image src={m.image} alt={m.name} fill sizes="(max-width:768px)50vw,25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-medium text-afra-emerald">{m.role}</p>
                    <h3 className="font-display mt-1 text-lg text-white">{m.name}</h3>
                    <p className="mt-1 text-xs text-white/70">{m.specialty}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------- licenses strip --------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-24" aria-label="مجوزها و افتخارات">
        <Reveal>
          <div className="card-surface relative overflow-hidden rounded-[28px] p-8 md:p-10">
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-afra-gold/15 blur-[90px]" aria-hidden />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-grad-sunset text-ink">
                  <Award size={26} />
                </span>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl">مجوزها، گواهی‌ها و افتخارات افرا</h2>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-mist light:text-[#5b5e70]">
                    شفافیت از خود ما شروع می‌شود؛ مجوزهای فعالیت، گواهی‌های تخصصی و افتخارات افرا را ببینید.
                  </p>
                </div>
              </div>
              <Magnetic>
                <Link href="/licenses" className="btn-sheen inline-flex shrink-0 items-center gap-2 rounded-full bg-grad-sunset px-7 py-3 text-[15px] font-bold text-ink transition-transform hover:scale-[1.04]">
                  مشاهده افتخارات <ArrowLeft size={17} />
                </Link>
              </Magnetic>
            </div>
            <div className="relative mt-7 flex flex-wrap gap-2.5">
              {["پروانه کسب مشاور املاک", "عضویت اتحادیه", "گواهی کارشناسی", "نشان اعتماد مشتریان"].map((b) => (
                <span key={b} className="glass flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px]">
                  <Star size={13} className="fill-afra-gold text-afra-gold" /> {b} <span className="text-mist light:text-[#8a8fa0]">(نمایشی)</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------ about teaser ------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-24" aria-label="داستان افرا">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <Parallax speed={0.06} className="rounded-3xl border border-white/10 light:border-ink/10">
                <Image src={ABOUT_IMAGES.main} alt="معماری مدرن" width={400} height={520} className="h-64 w-full object-cover md:h-80" loading="lazy" />
              </Parallax>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-3xl border border-white/10 light:border-ink/10">
                  <Image src={HERO_IMAGES.skyline} alt="خط آسمان شهر" width={400} height={300} className="h-36 w-full object-cover md:h-44" loading="lazy" />
                </div>
                <div className="glass rounded-3xl p-5">
                  <Handshake size={22} className="text-afra-magenta" />
                  <p className="font-display mt-2 text-lg">فلسفه افرا</p>
                  <p className="mt-1 text-[13px] leading-6 text-mist light:text-[#5b5e70]">ملک خوب، انتخاب آگاهانه می‌خواهد؛ نه عجله.</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="start"
              eyebrow="داستان ما"
              title="افرا از کجا شروع شد و به کجا می‌رود؟"
              desc="از یک دفتر کوچک با یک باور بزرگ شروع کردیم: معامله ملک باید هم هوشمندانه باشد، هم انسانی. امروز افرا ترکیبی از مشاوره تخصصی و تجربه دیجیتال مدرن است."
            />
            <Reveal delay={0.15}>
              <div className="-mt-4 flex flex-wrap gap-3">
                <Link href="/about" className="btn-sheen inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-ink transition hover:scale-[1.03] light:bg-ink light:text-white">
                  خواندن داستان افرا <ArrowLeft size={16} />
                </Link>
                <Link href="/properties" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition hover:border-afra-magenta/60">
                  <BedDouble size={17} className="text-afra-magenta" /> مرور املاک
                </Link>
                <Link href="/search" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition hover:border-afra-emerald/60">
                  <Ruler size={17} className="text-afra-emerald" /> جست‌وجوی متراژی
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
