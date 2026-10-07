import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Phone } from "lucide-react";
import { TEAM } from "@/lib/data";
import { CtaBand, PageHero } from "@/components/sections";
import { Magnetic, Reveal } from "@/components/motion";

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="تیم املاک افرا"
        title="آدم‌هایی که پشت هر معامله امن ایستاده‌اند"
        desc="مشاوران افرا بر اساس سه معیار انتخاب می‌شوند: تخصص واقعی در بازار، صداقت در گفتار و تعهد به منفعت مشتری."
      />

      <div className="mx-auto max-w-7xl space-y-6 px-4 md:px-8">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={0.05}>
            <article className="card-surface group grid overflow-hidden rounded-[28px] transition-all duration-500 hover:shadow-card md:grid-cols-[300px_1fr]">
              <div className="relative h-72 overflow-hidden md:h-full md:min-h-[320px]">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width:768px)100vw,300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={i > 1 ? "lazy" : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-void/40" aria-hidden />
                <span className="glass absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white">
                  <BadgeCheck size={14} className="text-afra-emerald" /> مشاور تأییدشده افرا
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="text-[13px] font-medium text-afra-magenta">{m.role}</p>
                <h2 className="font-display mt-1.5 text-2xl md:text-3xl">{m.name}</h2>
                <p className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-afra-emerald/10 px-4 py-1.5 text-[13px] font-medium text-afra-emerald light:text-[#00914e]">
                  تخصص: {m.specialty}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-8 text-mist light:text-[#3c3f4d]">{m.bio}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a
                      href="tel:+982100000000"
                      className="btn-sheen inline-flex items-center gap-2 rounded-full bg-grad-magenta px-6 py-3 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.03]"
                    >
                      <Phone size={16} /> تماس با {m.name.split(" ")[0]}
                    </a>
                  </Magnetic>
                  <Link href="/contact" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:border-afra-emerald/50">
                    درخواست مشاوره <ArrowLeft size={16} />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {/* join us */}
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[28px] p-8 text-center md:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-afra-royal/20 blur-[90px]" aria-hidden />
            <h2 className="font-display relative text-2xl md:text-3xl">می‌خواهید بخشی از تیم افرا باشید؟</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-8 text-mist light:text-[#5b5e70]">
              اگر بازار ملک را عمیق می‌شناسید و صداقت برایتان اصل است، رزومه‌تان را برای ما بفرستید. (بخش نمایشی و قابل ویرایش)
            </p>
            <Link href="/contact" className="btn-sheen relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-ink transition hover:scale-[1.03] light:bg-ink light:text-white">
              ارسال درخواست همکاری <ArrowLeft size={16} />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-20">
        <CtaBand />
      </div>
    </>
  );
}
