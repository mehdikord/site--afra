"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import type { Badge, Property } from "@/lib/data";
import { faNum, priceText, cn } from "@/lib/utils";
import { useFavorites } from "./providers";

const BADGE_STYLES: Record<Exclude<Badge, null>, string> = {
  "ویژه": "bg-grad-magenta text-white shadow-glow",
  "پیشنهاد افرا": "bg-grad-emerald text-ink shadow-glow-green",
  "جدید": "bg-white/90 text-ink backdrop-blur",
  "فوری": "bg-grad-sunset text-ink",
};

export function BadgePill({ badge }: { badge: Badge }) {
  if (!badge) return null;
  return (
    <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur", BADGE_STYLES[badge])}>
      {badge}
    </span>
  );
}

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const p = property;
  const { isFav, toggleFav } = useFavorites();
  const fav = isFav(p.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
    >
      <Link href={`/properties/${p.id}`} className="block" aria-label={p.title}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={p.images[0]}
            alt={p.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" aria-hidden />
          {/* top row */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <div className="flex flex-col items-start gap-2">
              <BadgePill badge={p.badge} />
              {!p.available && (
                <span className="rounded-full bg-void/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur border border-white/20">
                  رزرو شده
                </span>
              )}
            </div>
          </div>
          {/* bottom chips on image */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
            <span className="rounded-full bg-void/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur border border-white/15">
              {p.transaction}
            </span>
            <span className="rounded-full bg-void/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur border border-white/15">
              {p.type}
            </span>
          </div>
        </div>
      </Link>

      {/* favorite */}
      <button
        onClick={() => toggleFav(p.id)}
        aria-label={fav ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        aria-pressed={fav}
        className={cn(
          "absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all active:scale-90",
          fav ? "bg-afra-magenta text-white shadow-glow" : "bg-void/50 text-white border border-white/20 hover:border-afra-magenta/60"
        )}
      >
        <Heart size={17} fill={fav ? "currentColor" : "none"} />
      </button>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[17px] leading-7">
              <Link href={`/properties/${p.id}`} className="transition-colors hover:text-afra-magenta">
                {p.title}
              </Link>
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-mist light:text-[#5b5e70]">
              <MapPin size={14} className="text-afra-ember" />
              {p.location}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-white/5 px-2 py-1 font-mono text-[11px] text-mist light:bg-ink/5 light:text-[#8a8fa0]" dir="ltr">
            {p.code}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[13px] text-mist light:text-[#5b5e70]">
          <span className="flex items-center gap-1.5">
            <Ruler size={15} className="text-afra-cyan" /> {faNum(p.area)} متر
          </span>
          {p.rooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={15} className="text-afra-emerald" /> {faNum(p.rooms)} خوابه
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Bath size={15} className="text-afra-magenta" /> {p.age === 0 ? "نوساز" : `${faNum(p.age)} ساله`}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 light:border-ink/10">
          <div>
            <p className="text-[11px] text-mist light:text-[#8a8fa0]">{p.priceLabel}</p>
            <p className="font-display mt-0.5 text-[17px] text-grad-magenta">{priceText(p)}</p>
          </div>
          <Link
            href={`/properties/${p.id}`}
            className="group/btn flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold text-white bg-white/10 border border-white/15 transition hover:bg-grad-magenta hover:border-transparent hover:shadow-glow light:bg-ink light:text-white light:hover:bg-grad-magenta"
          >
            مشاهده
            <ArrowLeft size={15} className="transition-transform group-hover/btn:-translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
