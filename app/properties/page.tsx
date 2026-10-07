"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PROPERTIES, PROPERTY_TYPES, TRANSACTION_TYPES } from "@/lib/data";
import { faNum, cn } from "@/lib/utils";
import { PageHero } from "@/components/sections";
import { PropertyCard } from "@/components/PropertyCard";

export default function PropertiesPage() {
  const [query, setQuery] = useState("");
  const [tx, setTx] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim();
    return PROPERTIES.filter((p) => {
      if (q && !(p.title + p.location + p.district + p.code).includes(q)) return false;
      if (tx && p.transaction !== tx) return false;
      if (type && p.type !== type) return false;
      return true;
    });
  }, [query, tx, type]);

  return (
    <>
      <PageHero
        eyebrow="فایل‌های افرا"
        title="املاک منتخب افرا"
        desc="هر فایل پیش از انتشار، کارشناسی و راستی‌آزمایی می‌شود؛ آنچه می‌بینید واقعی و به‌روز است."
      />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* filter bar */}
        <div className="card-surface rounded-[24px] p-4 shadow-card md:p-5">
          <label className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3.5 light:bg-ink/[0.04]">
            <Search size={19} className="shrink-0 text-afra-magenta" />
            <span className="sr-only">جست‌وجو در املاک</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="جست‌وجو در عنوان، محله یا کد فایل…"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-mist/60 light:placeholder:text-[#9aa0b0]"
            />
          </label>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="نوع معامله">
              <button
                onClick={() => setTx(null)}
                aria-pressed={tx === null}
                className={cn("shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition", tx === null ? "bg-grad-magenta text-white shadow-glow" : "hairline text-mist light:text-[#3c3f4d]")}
              >
                همه معاملات
              </button>
              {TRANSACTION_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTx(tx === t ? null : t)}
                  aria-pressed={tx === t}
                  className={cn("shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition", tx === t ? "bg-grad-magenta text-white shadow-glow" : "hairline text-mist light:text-[#3c3f4d]")}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="نوع ملک">
              <button
                onClick={() => setType(null)}
                aria-pressed={type === null}
                className={cn("shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition", type === null ? "bg-grad-emerald text-ink shadow-glow-green" : "hairline text-mist light:text-[#3c3f4d]")}
              >
                همه انواع
              </button>
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(type === t ? null : t)}
                  aria-pressed={type === t}
                  className={cn("shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition", type === t ? "bg-grad-emerald text-ink shadow-glow-green" : "hairline text-mist light:text-[#3c3f4d]")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-mist light:text-[#5b5e70]">
          <span className="font-display text-xl text-white light:text-ink">{faNum(results.length)}</span> ملک
        </p>

        {results.length === 0 ? (
          <div className="card-surface mt-4 rounded-[24px] p-12 text-center">
            <h3 className="font-display text-xl">موردی یافت نشد</h3>
            <p className="mt-2 text-sm text-mist light:text-[#5b5e70]">فیلترها را تغییر دهید یا عبارت دیگری جست‌وجو کنید.</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
