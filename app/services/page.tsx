import Link from "next/link";
import { ArrowLeft, MessagesSquare, Route, SearchCheck, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { CtaBand, PageHero, ServiceCard } from "@/components/sections";
import { GlowDivider, Reveal, SectionHeading } from "@/components/motion";

const PROCESS = [
  { icon: MessagesSquare, title: "۱ · شناخت نیاز", desc: "در یک گفت‌وگوی شفاف، بودجه، هدف و اولویت‌های شما را دقیق می‌شناسیم." },
  { icon: SearchCheck, title: "۲ · معرفی گزینه‌ها", desc: "فایل‌های واقعی و کارشناسی‌شده‌ای که با نیاز شما هم‌خوان‌اند معرفی می‌شوند." },
  { icon: ShieldCheck, title: "۳ · بررسی و مذاکره", desc: "کارشناسی فنی، حقوقی و قیمتی انجام و بهترین شرایط مذاکره می‌شود." },
  { icon: Route, title: "۴ · همراهی تا سند", desc: "در تمام مراحل قرارداد، پرداخت و انتقال سند کنارتان هستیم." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="خدمات تخصصی افرا"
        title="شش خدمت، یک استاندارد: اعتماد"
        desc="هر خدمتی که از افرا می‌گیرید — از خرید اول تا مشارکت در ساخت — با همان دقت، شفافیت و همراهی ارائه می‌شود."
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>

      <GlowDivider className="mx-auto mt-20 max-w-5xl" tone="emerald" />

      {/* process */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-label="فرایند همکاری">
        <SectionHeading
          eyebrow="فرایند همکاری"
          title="مسیر شما با افرا، قدم‌به‌قدم"
          desc="فرایندی ساده و شفاف که در هر مرحله می‌دانید چه اتفاقی می‌افتد و قدم بعدی چیست."
          tone="emerald"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-surface group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-afra-emerald/40">
                <span className="font-display pointer-events-none absolute -left-2 -top-5 text-[90px] leading-none text-white/[0.04] light:text-ink/[0.05]" aria-hidden>
                  {i + 1}
                </span>
                <span className="glass relative flex h-14 w-14 items-center justify-center rounded-2xl">
                  <p.icon size={24} className="text-afra-emerald" />
                </span>
                <h3 className="font-display relative mt-4 text-lg">{p.title}</h3>
                <p className="relative mt-2 text-sm leading-7 text-mist light:text-[#5b5e70]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8 text-center">
          <Link href="/contact" className="btn-sheen inline-flex items-center gap-2 rounded-full bg-grad-emerald px-8 py-3.5 text-[15px] font-bold text-ink shadow-glow-green transition-transform hover:scale-[1.03]">
            شروع گفت‌وگو با افرا <ArrowLeft size={17} />
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
