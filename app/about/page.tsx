import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Compass, Eye, Gem, Heart, Quote, Target } from "lucide-react";
import { ABOUT_IMAGES, MILESTONES, VALUES } from "@/lib/data";
import { CtaBand, PageHero } from "@/components/sections";
import { GlowDivider, Parallax, Reveal, SectionHeading } from "@/components/motion";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="درباره افرا"
        title="جایی که تخصص، با اعتماد معنا پیدا می‌کند"
        desc="افرا از یک باور ساده شروع شد: معامله ملک نباید قماری پراسترس باشد؛ باید انتخابی آگاهانه، شفاف و امن باشد."
      />

      {/* story */}
      <section className="mx-auto max-w-7xl px-4 md:px-8" aria-label="داستان افرا">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <Parallax speed={0.07} className="rounded-[32px] border border-white/10 light:border-ink/10">
                <Image src={ABOUT_IMAGES.main} alt="معماری مدرن" width={700} height={800} className="h-[420px] w-full object-cover md:h-[520px]" loading="lazy" />
              </Parallax>
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-void/60 via-transparent to-transparent" aria-hidden />
              <figure className="glass absolute bottom-5 right-5 left-5 rounded-2xl p-5">
                <Quote size={20} className="text-afra-magenta" />
                <blockquote className="mt-2 text-[15px] leading-8">
                  «ملک خوب، انتخاب آگاهانه می‌خواهد؛ نه عجله. ما اینجاییم تا انتخاب‌تان آگاهانه باشد.»
                </blockquote>
                <figcaption className="mt-1 text-[13px] text-mist light:text-[#8a8fa0]">— بنیان‌گذار افرا</figcaption>
              </figure>
            </div>
          </Reveal>
          <div className="space-y-5 text-[15px] leading-9 text-mist light:text-[#3c3f4d]">
            <Reveal>
              <h2 className="font-display text-2xl text-white light:text-ink md:text-3xl">داستان ما</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                افرا با تمرکز بر مشاوره تخصصی خرید و فروش در شمال تهران متولد شد؛ زمانی که دیدیم بازار ملک پر از فایل‌های غیرواقعی، قیمت‌های سلیقه‌ای و معامله‌های پرریسک است و جای یک مرجع قابل‌اعتماد خالی است.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                ما از روز اول یک قانون ساده گذاشتیم: <strong className="text-white light:text-ink">فقط فایلی را معرفی می‌کنیم که خودمان حاضریم برای خانواده‌مان بخریم.</strong> همین قانون، افرا را به برندی تبدیل کرد که مشتریانش با خیال راحت به دوستانشان معرفی‌اش می‌کنند.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                امروز افرا ترکیبی است از تیم مشاوران ارشد، شناخت عمیق بازار تهران و یک تجربه دیجیتال مدرن؛ از جست‌وجوی هوشمند تا کشف ملک روی نقشه. اما قلب افرا هنوز همان است: انسانی که کنارتان می‌ایستد تا بهترین تصمیم ملکی عمرتان را بگیرید.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="overflow-hidden rounded-3xl border border-white/10 light:border-ink/10">
                  <Image src={ABOUT_IMAGES.second} alt="ویلای مدرن" width={400} height={300} className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-48" loading="lazy" />
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/10 light:border-ink/10">
                  <Image src={ABOUT_IMAGES.third} alt="شهر در شب" width={400} height={300} className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-48" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <GlowDivider className="mx-auto mt-20 max-w-5xl" />

      {/* mission / vision / philosophy */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-label="ماموریت و فلسفه افرا">
        <SectionHeading
          eyebrow="نگاه ما"
          title="ماموریت، چشم‌انداز و فلسفه ملکی افرا"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Target, title: "ماموریت ما", tone: "magenta", desc: "امن، شفاف و هوشمند کردن هر معامله ملکی؛ از آپارتمان اول یک زوج جوان تا سبد سرمایه‌گذاری یک هولدینگ." },
            { icon: Eye, title: "چشم‌انداز ما", tone: "emerald", desc: "تبدیل شدن به مرجع اول مشاوره هوشمند ملک؛ جایی که همه پیش از هر تصمیم ملکی، اول با افرا مشورت می‌کنند." },
            { icon: Compass, title: "فلسفه ملکی ما", tone: "sunset", desc: "بازار را می‌شناسیم، قیمت واقعی را می‌گوییم و هرگز منفعت کوتاه‌مدت را به اعتماد بلندمدت ترجیح نمی‌دهیم." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="card-surface h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  c.tone === "magenta" ? "bg-grad-magenta text-white shadow-glow" : c.tone === "emerald" ? "bg-grad-emerald text-ink shadow-glow-green" : "bg-grad-sunset text-ink"
                }`}>
                  <c.icon size={26} />
                </span>
                <h3 className="font-display mt-5 text-xl">{c.title}</h3>
                <p className="mt-2 text-sm leading-8 text-mist light:text-[#5b5e70]">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8" aria-label="ارزش‌های افرا">
        <SectionHeading eyebrow="ارزش‌ها" title="چهار اصلی که با آن‌ها کار می‌کنیم" tone="sunset" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="glass group h-full rounded-3xl p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-afra-gold/40">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-afra-gold/10 text-afra-gold transition-transform duration-500 group-hover:scale-110">
                  {i === 0 ? <Eye size={22} /> : i === 1 ? <Gem size={22} /> : i === 2 ? <Target size={22} /> : <Heart size={22} />}
                </span>
                <h3 className="font-display mt-4 text-lg">{v.title}</h3>
                <p className="mt-2 text-[13px] leading-7 text-mist light:text-[#5b5e70]">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-4xl px-4 pb-20 md:px-8" aria-label="مسیر افرا">
        <SectionHeading eyebrow="مسیر ما" title="نقطه‌عطف‌های افرا" tone="emerald" />
        <div className="relative">
          <span className="absolute bottom-4 right-[27px] top-4 w-px bg-gradient-to-b from-afra-magenta via-afra-royal to-afra-emerald" aria-hidden />
          <div className="space-y-5">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05}>
                <div className="relative mr-0 flex gap-5 rounded-3xl">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
                    <span className={`absolute inset-0 rounded-2xl ${i % 3 === 0 ? "bg-grad-magenta shadow-glow" : i % 3 === 1 ? "bg-grad-emerald shadow-glow-green" : "bg-grad-sunset"}`} aria-hidden />
                    <span className="font-display relative text-lg text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">{["۱", "۲", "۳", "۴", "۵"][i]}</span>
                  </span>
                  <div className="card-surface flex-1 rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-0.5 md:p-6">
                    <h3 className="font-display text-lg">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-mist light:text-[#5b5e70]">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/team" className="group inline-flex items-center gap-2 rounded-full hairline px-7 py-3 text-sm font-bold transition hover:border-afra-magenta/60">
            آشنایی با تیم افرا <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
