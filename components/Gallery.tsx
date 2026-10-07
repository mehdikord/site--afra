"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { faNum, cn } from "@/lib/utils";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const prev = useCallback(() => setActive((a) => (a - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((a) => (a + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, next, prev]);

  // touch swipe
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-[28px]">
        <div
          className="relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-[28px] border border-white/10 light:border-ink/10 md:aspect-[16/8]"
          onClick={() => setFullscreen(true)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (dx > 50) prev();
            if (dx < -50) next();
            setTouchX(null);
          }}
          role="button"
          tabIndex={0}
          aria-label="باز کردن نمایش تمام‌صفحه تصاویر"
          onKeyDown={(e) => e.key === "Enter" && setFullscreen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image src={images[active]} alt={`${title} — تصویر ${faNum(active + 1)}`} fill sizes="100vw" className="object-cover" priority={active === 0} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" aria-hidden />

          {/* arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="تصویر قبلی"
            className="glass absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:border-afra-magenta/60 hover:text-afra-magenta"
          >
            <ChevronRight size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="تصویر بعدی"
            className="glass absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:border-afra-magenta/60 hover:text-afra-magenta"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="glass rounded-full px-4 py-1.5 text-xs font-bold text-white">
              {faNum(active + 1)} / {faNum(images.length)}
            </span>
          </div>
          <span className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/80">
            <Expand size={14} /> نمایش تمام‌صفحه
          </span>
        </div>

        {/* thumbnails */}
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label="تصاویر ملک">
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`تصویر ${faNum(i + 1)}`}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border-2 transition-all md:h-24 md:w-40",
                i === active ? "border-afra-magenta shadow-glow" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill sizes="160px" className="object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* fullscreen viewer */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl"
            onClick={() => setFullscreen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="نمایش تمام‌صفحه تصاویر"
          >
            <button
              onClick={() => setFullscreen(false)}
              aria-label="بستن"
              className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-afra-magenta"
            >
              <X size={20} />
            </button>
            <span className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
              {faNum(active + 1)} / {faNum(images.length)}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="تصویر قبلی"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-afra-magenta md:right-8"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="تصویر بعدی"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-afra-magenta md:left-8"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative h-[75vh] w-full max-w-5xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[active]} alt={`${title} — تصویر ${faNum(active + 1)}`} fill sizes="100vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
