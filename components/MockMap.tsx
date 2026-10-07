"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BedDouble, MapPin, Minus, Navigation, Plus, Ruler, X } from "lucide-react";
import { PROPERTIES, type Property } from "@/lib/data";
import { faNum, priceText, cn } from "@/lib/utils";

function MapBackdrop() {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <pattern id="streets" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M8 0H0v8" fill="none" stroke="currentColor" strokeOpacity="0.10" strokeWidth="0.35" />
        </pattern>
        <linearGradient id="river" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#168EEA" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2145FF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#streets)" />
      {/* main roads */}
      <path d="M0 38 C 25 34, 45 42, 70 36 S 95 30, 100 33" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.4" />
      <path d="M12 0 C 16 30, 8 60, 14 100" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" />
      <path d="M55 0 C 52 25, 60 55, 56 100" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      <path d="M0 72 C 30 68, 60 76, 100 70" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      <path d="M0 18 C 30 22, 55 14, 100 20" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.7" />
      <path d="M82 0 C 80 35, 88 65, 84 100" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.7" />
      {/* river / park shapes */}
      <path d="M0 88 C 20 82, 35 92, 55 86 S 85 80, 100 86 L100 100 L0 100 Z" fill="url(#river)" />
      <ellipse cx="66" cy="52" rx="9" ry="6" fill="#00E878" opacity="0.12" />
      <ellipse cx="30" cy="60" rx="7" ry="5" fill="#00E878" opacity="0.1" />
    </svg>
  );
}

export function MockMap({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<Property | null>(null);
  const [zoom, setZoom] = useState(1);

  const markers = useMemo(() => PROPERTIES.filter((p) => p.available), []);

  return (
    <div className={cn("relative overflow-hidden rounded-[28px] border border-white/10 light:border-ink/10 bg-panel light:bg-white shadow-card", compact ? "h-[420px]" : "h-[520px] md:h-[600px]")}>
      <div className="absolute inset-0 text-white light:text-ink">
        <MapBackdrop />
      </div>
      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,10,20,0.55)_100%)] light:bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(246,245,241,0.5)_100%)]" aria-hidden />

      {/* markers layer with zoom */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        {markers.map((p) => {
          const isSel = selected?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(isSel ? null : p)}
              aria-label={`مشاهده ${p.title}`}
              aria-pressed={isSel}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ right: `${p.map.x}%`, top: `${p.map.y}%` }}
            >
              {p.badge === "پیشنهاد افرا" && !isSel && (
                <span className="absolute inset-0 -m-2 rounded-full bg-afra-emerald/30 animate-pulse-ring" aria-hidden />
              )}
              <span
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 backdrop-blur transition-all duration-300 group-hover:scale-125",
                  isSel
                    ? "bg-grad-magenta border-white text-white shadow-glow scale-125"
                    : p.badge === "پیشنهاد افرا"
                      ? "bg-afra-emerald/90 border-white/70 text-ink shadow-glow-green"
                      : "bg-panel/85 border-afra-magenta/50 text-white light:bg-white/90 light:text-ink light:border-afra-magenta/40"
                )}
              >
                <MapPin size={18} />
              </span>
              {/* price tooltip on hover */}
              <span className="pointer-events-none absolute bottom-full right-1/2 mb-2 hidden translate-x-1/2 whitespace-nowrap rounded-xl bg-void/90 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100 md:block border border-white/15">
                {p.district} · {p.transaction}
              </span>
            </button>
          );
        })}
        {/* cluster badge */}
        <div className="absolute hidden md:flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-bold" style={{ right: "44%", top: "52%" }} aria-hidden>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-grad-sunset text-[11px] text-ink">{faNum(3)}</span>
          خوشه شمال
        </div>
      </div>

      {/* zoom controls */}
      <div className="absolute left-4 top-4 flex flex-col gap-2" role="group" aria-label="کنترل بزرگنمایی نقشه">
        {[
          { icon: Plus, label: "بزرگنمایی", fn: () => setZoom((z) => Math.min(1.8, +(z + 0.2).toFixed(1))) },
          { icon: Minus, label: "کوچکنمایی", fn: () => setZoom((z) => Math.max(0.8, +(z - 0.2).toFixed(1))) },
          { icon: Navigation, label: "بازنشانی", fn: () => { setZoom(1); setSelected(null); } },
        ].map((c) => (
          <button
            key={c.label}
            onClick={c.fn}
            aria-label={c.label}
            className="glass flex h-10 w-10 items-center justify-center rounded-xl transition hover:border-afra-magenta/50 hover:text-afra-magenta"
          >
            <c.icon size={17} />
          </button>
        ))}
      </div>

      {/* legend */}
      <div className="glass absolute right-4 top-4 hidden items-center gap-3 rounded-2xl px-4 py-2.5 text-xs text-mist light:text-[#5b5e70] sm:flex">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-afra-emerald shadow-glow-green" /> پیشنهاد افرا</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-afra-magenta shadow-glow" /> فایل منتخب</span>
      </div>

      {/* preview card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass-strong absolute inset-x-3 bottom-3 overflow-hidden rounded-3xl shadow-card sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[340px]"
          >
            <div className="relative h-40 sm:h-44">
              <Image src={selected.images[0]} alt={selected.title} fill sizes="340px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" aria-hidden />
              <button
                onClick={() => setSelected(null)}
                aria-label="بستن پیش‌نمایش"
                className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-void/60 text-white backdrop-blur border border-white/20 transition hover:bg-afra-magenta"
              >
                <X size={15} />
              </button>
              <div className="absolute bottom-3 right-3 flex gap-2">
                <span className="rounded-full bg-void/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur border border-white/15">{selected.transaction}</span>
                <span className="rounded-full bg-void/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur border border-white/15">{selected.type}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-[15px]">{selected.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-mist light:text-[#5b5e70]">
                <MapPin size={12} className="text-afra-ember" /> {selected.location}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs text-mist light:text-[#5b5e70]">
                <span className="flex items-center gap-1"><Ruler size={13} /> {faNum(selected.area)} متر</span>
                {selected.rooms > 0 && <span className="flex items-center gap-1"><BedDouble size={13} /> {faNum(selected.rooms)} خوابه</span>}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-display text-[15px] text-grad-magenta">{priceText(selected)}</p>
                <Link
                  href={`/properties/${selected.id}`}
                  className="btn-sheen flex items-center gap-1 rounded-full bg-grad-magenta px-4 py-2 text-xs font-bold text-white shadow-glow"
                >
                  مشاهده ملک <ArrowLeft size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <p className="glass pointer-events-none absolute bottom-4 right-1/2 hidden translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-xs text-mist light:text-[#5b5e70] md:flex">
          <MapPin size={14} className="text-afra-magenta" />
          روی نشانگرها بزنید تا پیش‌نمایش ملک را ببینید
        </p>
      )}
    </div>
  );
}
