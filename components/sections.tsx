"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Building2, ClipboardCheck, FileSignature, KeyRound,
  ShieldCheck, Sparkles, TrendingUp, Phone,
} from "lucide-react";
import type { Service } from "@/lib/data";
import { Magnetic, Reveal, Tilt, WordReveal } from "./motion";
import { cn } from "@/lib/utils";

const ICONS: Record<string, any> = { KeyRound, TrendingUp, FileSignature, Building2, ClipboardCheck, ShieldCheck };

const ACCENTS: Record<Service["accent"], { ring: string; glow: string; icon: string; chip: string }> = {
  magenta: {
    ring: "hover:border-afra-magenta/50",
    glow: "group-hover:bg-afra-magenta/15",
    icon: "bg-grad-magenta text-white shadow-glow",
    chip: "bg-afra-magenta/10 text-afra-magenta light:text-[#b000a6]",
  },
  emerald: {
    ring: "hover:border-afra-emerald/50",
    glow: "group-hover:bg-afra-emerald/15",
    icon: "bg-grad-emerald text-ink shadow-glow-green",
    chip: "bg-afra-emerald/10 text-afra-emerald light:text-[#00914e]",
  },
  sunset: {
    ring: "hover:border-afra-ember/50",
    glow: "group-hover:bg-afra-ember/15",
    icon: "bg-grad-sunset text-ink",
    chip: "bg-afra-ember/10 text-afra-ember light:text-[#c25a00]",
  },
};

/* ------------------------- sub-page hero header ------------------------ */
export function PageHero({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-10 md:pb-16 md:pt-16" aria-label={title}>
      <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_20%,#000,transparent)]" aria-hidden />
      <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-afra-magenta/20 blur-[120px] animate-drift" aria-hidden />
      <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-afra-royal/20 blur-[120px] animate-drift" style={{ animationDelay: "-7s" }} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs md:text-sm text-mist light:text-[#5b5e70]">
            <span className="h-2 w-2 rounded-full bg-afra-magenta shadow-glow animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
        <WordReveal as="h1" text={title} className="font-display mt-5 text-4xl md:text-6xl" />
        {desc && (
          <Reveal delay={0.25}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-mist light:text-[#5b5e70] md:text-base md:leading-9">{desc}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ CTA band ------------------------------ */
export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8" aria-label="دریافت مشاوره">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-[32px] border border-white/10 light:border-ink/10">
          <div className="absolute inset-0 bg-gradient-to-l from-[#241040] via-panel to-[#101c4e] light:from-[#f3e4f7] light:via-white light:to-[#e2e8ff]" aria-hidden />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-afra-magenta/30 blur-[100px] animate-drift" aria-hidden />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-afra-royal/30 blur-[100px] animate-drift" style={{ animationDelay: "-6s" }} aria-hidden />
          <div className="absolute bottom-0 left-1/3 h-40 w-96 rounded-full bg-afra-emerald/15 blur-[100px]" aria-hidden />
          <div className="relative grid items-center gap-8 p-8 md:grid-cols-[1.5fr_1fr] md:p-14">
            <div>
              <p className="flex items-center gap-2 text-sm text-afra-gold">
                <Sparkles size={16} /> مشاوره اول، رایگان و بدون تعهد
              </p>
              <h2 className="font-display mt-3 text-3xl leading-snug md:text-[44px] md:leading-[1.5]">
                یک گفت‌وگو تا <span className="text-grad-magenta">انتخاب هوشمندانه</span> فاصله دارید
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-8 text-mist light:text-[#5b5e70] md:text-base">
                مشاوران ارشد افرا در کمتر از چند ساعت با شما تماس می‌گیرند؛ نیازتان را می‌شنوند و بهترین مسیر معامله را پیشنهاد می‌دهند.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/contact" className="btn-sheen inline-flex items-center gap-2 rounded-full bg-grad-magenta px-7 py-3.5 text-[15px] font-bold text-white shadow-glow transition-transform hover:scale-[1.04]">
                    دریافت مشاوره رایگان <ArrowLeft size={18} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a href="tel:+982100000000" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold transition hover:border-afra-emerald/60">
                    <Phone size={17} className="text-afra-emerald" /> تماس مستقیم
                  </a>
                </Magnetic>
              </div>
            </div>
            <div className="hidden justify-center md:flex" aria-hidden>
              <div className="relative">
                <div className="glass animate-float rounded-3xl p-6 shadow-card">
                  <p className="text-xs text-mist light:text-[#8a8fa0]">میانگین زمان پاسخ‌گویی</p>
                  <p className="font-display mt-2 text-4xl">کمتر از <span className="text-grad-emerald">۳ ساعت</span></p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10 light:bg-ink/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-grad-emerald"
                    />
                  </div>
                  <p className="mt-2 text-xs text-mist light:text-[#8a8fa0]">رضایت از کیفیت پاسخ‌گویی</p>
                </div>
                <div className="glass animate-float absolute -bottom-6 -right-8 rounded-2xl px-5 py-3 shadow-card" style={{ animationDelay: "-3s" }}>
                  <p className="flex items-center gap-2 text-sm font-bold"><ShieldCheck size={16} className="text-afra-emerald" /> معامله امن</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------- service card ---------------------------- */
export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = ICONS[service.icon] ?? KeyRound;
  const a = ACCENTS[service.accent];
  return (
    <Tilt max={5}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn("card-surface group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card md:p-7", a.ring)}
      >
        <div className={cn("absolute -left-16 -top-16 h-48 w-48 rounded-full blur-[80px] transition-all duration-500", a.glow)} aria-hidden />
        <div className={cn("relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6", a.icon)}>
          <Icon size={26} />
        </div>
        <h3 className="font-display relative mt-5 text-lg md:text-xl">{service.title}</h3>
        <p className={cn("relative mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium", a.chip)}>{service.short}</p>
        <p className="relative mt-3 text-sm leading-7 text-mist light:text-[#5b5e70]">{service.desc}</p>
        <ul className="relative mt-4 space-y-2">
          {service.points.map((pt) => (
            <li key={pt} className="flex items-center gap-2 text-[13px] text-mist light:text-[#3c3f4d]">
              <span className={cn("h-1.5 w-1.5 rounded-full", service.accent === "magenta" ? "bg-afra-magenta" : service.accent === "emerald" ? "bg-afra-emerald" : "bg-afra-ember")} />
              {pt}
            </li>
          ))}
        </ul>
        <Link href="/contact" className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white transition group-hover:gap-3 light:text-ink" aria-label={`درخواست ${service.title}`}>
          درخواست مشاوره <ArrowLeft size={16} className="text-afra-magenta" />
        </Link>
      </motion.article>
    </Tilt>
  );
}
