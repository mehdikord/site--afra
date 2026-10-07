"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ChevronDown, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import { HERO_IMAGES, PROPERTIES } from "@/lib/data";
import { Magnetic } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

function Headline() {
  const reduce = useReducedMotion();
  const words = "خانه‌ای برای انتخاب‌های هوشمندانه".split(" ");
  return (
    <h1 className="font-display text-[42px] leading-[1.35] sm:text-6xl lg:text-7xl lg:leading-[1.25]" aria-label="خانه‌ای برای انتخاب‌های هوشمندانه">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 -mb-2 align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : "115%", opacity: reduce ? 1 : 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 + i * 0.09, ease }}
          >
            {i >= words.length - 2 ? <span className="text-grad-magenta">{w}</span> : w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative -mt-20 md:-mt-24 flex min-h-[100svh] items-center overflow-hidden" aria-label="معرفی افرا">
      {/* layered background */}
      <motion.div style={reduce ? undefined : { y: bgY, scale: bgScale }} className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGES.main}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/55 to-void" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-l from-void/70 via-transparent to-transparent" aria-hidden />
      {/* signature glows */}
      <div className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-afra-magenta/25 blur-[140px] animate-drift" aria-hidden />
      <div className="absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-afra-royal/25 blur-[140px] animate-drift" style={{ animationDelay: "-6s" }} aria-hidden />
      <div className="absolute right-1/3 top-10 h-56 w-56 rounded-full bg-afra-emerald/12 blur-[110px]" aria-hidden />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8 pt-28 pb-24">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm text-white/90">
              <Sparkles size={15} className="text-afra-gold" />
              مشاوره هوشمند ملک — خرید، فروش، اجاره و سرمایه‌گذاری
            </span>
          </motion.div>

          <div className="mt-6 text-white">
            <Headline />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-[15px] leading-8 text-white/75 md:text-lg md:leading-9"
          >
            افرا با ترکیب شناخت عمیق بازار، فایل‌های منتخب و همراهی تخصصی، مسیر پیدا کردن، خرید، فروش و سرمایه‌گذاری در ملک را سریع‌تر، شفاف‌تر و مطمئن‌تر می‌کند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/search"
                className="btn-sheen inline-flex items-center gap-2 rounded-full bg-grad-magenta px-7 py-3.5 text-[15px] font-bold text-white shadow-glow transition-transform hover:scale-[1.04] active:scale-95"
              >
                <Search size={18} />
                جستجوی ملک
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition hover:border-afra-emerald/60 hover:shadow-glow-green"
              >
                دریافت مشاوره
                <ArrowLeft size={18} />
              </Link>
            </Magnetic>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/70"
          >
            {["فایل‌های منتخب و واقعی", "کارشناسی شفاف قیمت", "امنیت حقوقی معامله"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-afra-emerald" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* floating preview cards (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
          className="pointer-events-none absolute left-8 top-1/2 hidden w-72 -translate-y-1/2 xl:block"
          aria-hidden
        >
          <div className="glass animate-float rounded-3xl p-3 shadow-card">
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <Image src={HERO_IMAGES.card1} alt="" fill sizes="300px" className="object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-grad-emerald px-3 py-1 text-[11px] font-bold text-ink">پیشنهاد افرا</span>
            </div>
            <div className="p-2">
              <p className="text-sm font-bold text-white">پنت‌هاوس نیاوران</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-white/60">
                <MapPin size={12} /> نیاوران، خیابان بهار
              </p>
            </div>
          </div>
          <div className="glass animate-float mt-4 mr-10 rounded-2xl p-4 shadow-card" style={{ animationDelay: "-3.5s" }}>
            <p className="text-[11px] text-white/60">فایل‌های فعال امروز</p>
            <p className="font-display mt-1 text-2xl text-white">
              {PROPERTIES.filter((p) => p.available).length * 14 + 32} <span className="text-sm font-normal text-afra-emerald">فایل منتخب</span>
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 right-1/2 z-10 flex translate-x-1/2 flex-col items-center gap-1 text-white/60 transition hover:text-white"
        aria-label="اسکرول به بخش بعد"
      >
        <span className="text-[11px]">کشف کنید</span>
        <motion.span animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
