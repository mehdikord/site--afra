"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const t = TESTIMONIALS[active];

  const go = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive((i + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const id = setInterval(() => go((active + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="relative">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* selector list */}
        <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              onClick={() => go(i)}
              aria-label={`نظر ${item.name}`}
              className={cn(
                "flex flex-1 items-center gap-3 rounded-2xl border p-3 text-right transition-all lg:flex-none",
                i === active
                  ? "border-afra-magenta/50 bg-white/5 shadow-glow light:bg-white light:border-afra-magenta/40"
                  : "border-transparent hover:bg-white/5 light:hover:bg-ink/5"
              )}
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" loading="lazy" />
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-bold">{item.name}</span>
                <span className="block text-xs text-mist light:text-[#8a8fa0]">{item.kind}</span>
              </span>
            </button>
          ))}
        </div>

        {/* stage */}
        <div className="card-surface relative order-1 overflow-hidden rounded-[28px] p-7 md:p-10 lg:order-2">
          <Quote size={90} className="absolute -left-4 -top-4 text-white/5 light:text-ink/5" aria-hidden />
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-afra-magenta/15 blur-[90px]" aria-hidden />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={active}
              initial={{ opacity: 0, x: dir * -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex items-center gap-1" aria-label={`${t.rating} از ۵`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={17} className={i < t.rating ? "fill-afra-gold text-afra-gold" : "text-mist/40"} />
                ))}
              </div>
              <blockquote className="font-display mt-5 text-xl leading-10 md:text-2xl md:leading-[3rem]">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-afra-magenta/60">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span className="block text-sm text-mist light:text-[#5b5e70]">{t.role}</span>
                </span>
                <span className="mr-auto hidden rounded-full bg-grad-emerald px-4 py-1.5 text-xs font-bold text-ink sm:block">
                  {t.kind}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="relative mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="نظرات مشتریان">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`نظر ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn("h-2 rounded-full transition-all", i === active ? "w-8 bg-grad-magenta" : "w-2 bg-white/20 light:bg-ink/15 hover:bg-white/40")}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(active - 1)} aria-label="نظر قبلی" className="flex h-10 w-10 items-center justify-center rounded-full hairline transition hover:border-afra-magenta/60 hover:text-afra-magenta">
                <ChevronRight size={18} />
              </button>
              <button onClick={() => go(active + 1)} aria-label="نظر بعدی" className="flex h-10 w-10 items-center justify-center rounded-full hairline transition hover:border-afra-magenta/60 hover:text-afra-magenta">
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
