"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, BedDouble, Heart, LayoutGrid, List, MapPin, RotateCcw,
  Ruler, Search, SlidersHorizontal, X,
} from "lucide-react";
import { DISTRICTS, PROPERTIES, PROPERTY_TYPES, TRANSACTION_TYPES, type Property } from "@/lib/data";
import { faNum, priceText, cn } from "@/lib/utils";
import { PageHero } from "@/components/sections";
import { BadgePill, PropertyCard } from "@/components/PropertyCard";
import { MockMap } from "@/components/MockMap";
import { useFavorites } from "@/components/providers";

type SortKey = "newest" | "cheap" | "expensive" | "area";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "جدیدترین" },
  { key: "cheap", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
  { key: "area", label: "بزرگ‌ترین متراژ" },
];

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-grad-magenta shadow-glow" : "bg-white/15 light:bg-ink/15"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow", on ? "right-1" : "right-[26px]")}
      />
    </button>
  );
}

function RowCard({ p }: { p: Property }) {
  const { isFav, toggleFav } = useFavorites();
  const fav = isFav(p.id);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="card-surface group grid overflow-hidden rounded-3xl transition-shadow hover:shadow-card sm:grid-cols-[240px_1fr]"
    >
      <Link href={`/properties/${p.id}`} className="relative block h-52 sm:h-full sm:min-h-[210px]" aria-label={p.title}>
        <Image src={p.images[0]} alt={p.title} fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute right-3 top-3"><BadgePill badge={p.badge} /></div>
      </Link>
      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-mist light:text-[#8a8fa0]">
              <span className="rounded-full bg-white/8 px-2.5 py-0.5 light:bg-ink/5">{p.transaction}</span>
              <span className="rounded-full bg-white/8 px-2.5 py-0.5 light:bg-ink/5">{p.type}</span>
              <span dir="ltr" className="font-mono">{p.code}</span>
            </div>
            <h3 className="font-display mt-2 text-lg">
              <Link href={`/properties/${p.id}`} className="transition-colors hover:text-afra-magenta">{p.title}</Link>
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-mist light:text-[#5b5e70]">
              <MapPin size={14} className="text-afra-ember" /> {p.location}
            </p>
          </div>
          <button
            onClick={() => toggleFav(p.id)}
            aria-label={fav ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition active:scale-90",
              fav ? "border-afra-magenta bg-afra-magenta text-white shadow-glow" : "hairline text-mist hover:text-afra-magenta light:text-[#5b5e70]"
            )}
          >
            <Heart size={17} fill={fav ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-mist light:text-[#5b5e70]">
          <span className="flex items-center gap-1.5"><Ruler size={15} className="text-afra-cyan" /> {faNum(p.area)} متر</span>
          {p.rooms > 0 && <span className="flex items-center gap-1.5"><BedDouble size={15} className="text-afra-emerald" /> {faNum(p.rooms)} خوابه</span>}
          <span>{p.age === 0 ? "نوساز" : `سن بنا ${faNum(p.age)} سال`}</span>
          <span>{p.elevator ? "آسانسور دارد" : "بدون آسانسور"}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <p className="text-[11px] text-mist light:text-[#8a8fa0]">{p.priceLabel}</p>
            <p className="font-display text-lg text-grad-magenta">{priceText(p)}</p>
          </div>
          <Link href={`/properties/${p.id}`} className="group/btn flex items-center gap-1.5 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-bold transition hover:bg-grad-magenta hover:shadow-glow light:bg-ink light:text-white">
            مشاهده جزئیات <ArrowLeft size={15} className="transition-transform group-hover/btn:-translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function SearchPageInner() {
  const params = useSearchParams();
  const { isFav } = useFavorites();

  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState(150); // میلیارد
  const [minArea, setMinArea] = useState(50);
  const [rooms, setRooms] = useState<number | null>(null);
  const [parking, setParking] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [storage, setStorage] = useState(false);
  const [age, setAge] = useState<string>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [onlyFavs, setOnlyFavs] = useState(params.get("favorites") === "1");
  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const toggleIn = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const reset = () => {
    setQuery(""); setTransactions([]); setTypes([]); setDistricts([]);
    setMaxBudget(150); setMinArea(50); setRooms(null);
    setParking(false); setElevator(false); setStorage(false);
    setAge("all"); setOnlyAvailable(true); setOnlyFavs(false);
  };

  const results = useMemo(() => {
    const q = query.trim();
    let list = PROPERTIES.filter((p) => {
      if (q && !(p.title + p.location + p.district + p.code).includes(q)) return false;
      if (transactions.length && !transactions.includes(p.transaction)) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (districts.length && !districts.includes(p.district)) return false;
      const budgetBase = p.transaction === "فروش" || p.transaction === "مشارکت در فروش" ? p.price : (p.deposit ?? 0);
      if (budgetBase > maxBudget * 1_000_000_000) return false;
      if (p.area < minArea && p.type !== "زمین") return false;
      if (rooms !== null && p.rooms < rooms) return false;
      if (parking && p.parking < 1) return false;
      if (elevator && !p.elevator) return false;
      if (storage && !p.storage) return false;
      if (age === "new" && p.age !== 0) return false;
      if (age === "5" && p.age > 5) return false;
      if (age === "10" && p.age > 10) return false;
      if (onlyAvailable && !p.available) return false;
      if (onlyFavs && !isFav(p.id)) return false;
      return true;
    });
    const priceOf = (p: Property) => (p.transaction === "فروش" || p.transaction === "مشارکت در فروش" ? p.price : (p.deposit ?? p.price));
    if (sort === "newest") list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    if (sort === "cheap") list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "expensive") list.sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === "area") list.sort((a, b) => b.area - a.area);
    return list;
  }, [query, transactions, types, districts, maxBudget, minArea, rooms, parking, elevator, storage, age, onlyAvailable, onlyFavs, sort, isFav]);

  const activeCount =
    transactions.length + types.length + districts.length + (rooms !== null ? 1 : 0) +
    (parking ? 1 : 0) + (elevator ? 1 : 0) + (storage ? 1 : 0) + (age !== "all" ? 1 : 0) +
    (maxBudget < 150 ? 1 : 0) + (minArea > 50 ? 1 : 0) + (query ? 1 : 0);

  const filtersPanel = (
    <div className="space-y-6">
      {/* transaction */}
      <div>
        <p className="mb-3 text-sm font-bold">نوع معامله</p>
        <div className="flex flex-wrap gap-2">
          {TRANSACTION_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => toggleIn(transactions, t, setTransactions)}
              aria-pressed={transactions.includes(t)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition",
                transactions.includes(t)
                  ? "bg-grad-magenta text-white shadow-glow"
                  : "hairline text-mist hover:border-afra-magenta/50 hover:text-white light:text-[#3c3f4d] light:hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* type */}
      <div>
        <p className="mb-3 text-sm font-bold">نوع ملک</p>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => toggleIn(types, t, setTypes)}
              aria-pressed={types.includes(t)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition",
                types.includes(t)
                  ? "bg-grad-emerald text-ink shadow-glow-green"
                  : "hairline text-mist hover:border-afra-emerald/50 hover:text-white light:text-[#3c3f4d] light:hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* district */}
      <div>
        <p className="mb-3 text-sm font-bold">محله</p>
        <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pl-1">
          {DISTRICTS.map((d) => (
            <button
              key={d}
              onClick={() => toggleIn(districts, d, setDistricts)}
              aria-pressed={districts.includes(d)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition",
                districts.includes(d)
                  ? "bg-grad-sunset text-ink"
                  : "hairline text-mist hover:border-afra-ember/50 hover:text-white light:text-[#3c3f4d] light:hover:text-ink"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* budget */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold">سقف بودجه</p>
          <span className="rounded-full bg-afra-magenta/10 px-3 py-1 text-xs font-bold text-afra-magenta light:text-[#b000a6]">
            {maxBudget >= 150 ? "بدون سقف" : `تا ${faNum(maxBudget)} میلیارد`}
          </span>
        </div>
        <input
          type="range" min={5} max={150} step={5} value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          style={{ ["--fill" as any]: `${((maxBudget - 5) / 145) * 100}%` }}
          className="w-full" aria-label="سقف بودجه به میلیارد تومان"
        />
        <div className="mt-1 flex justify-between text-[11px] text-mist light:text-[#8a8fa0]">
          <span>{faNum(5)} میلیارد</span><span>{faNum(150)} میلیارد</span>
        </div>
      </div>

      {/* area */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold">حداقل متراژ</p>
          <span className="rounded-full bg-afra-emerald/10 px-3 py-1 text-xs font-bold text-afra-emerald light:text-[#00914e]">
            از {faNum(minArea)} متر
          </span>
        </div>
        <input
          type="range" min={50} max={600} step={10} value={minArea}
          onChange={(e) => setMinArea(Number(e.target.value))}
          style={{ ["--fill" as any]: `${((minArea - 50) / 550) * 100}%` }}
          className="w-full" aria-label="حداقل متراژ"
        />
      </div>

      {/* rooms */}
      <div>
        <p className="mb-3 text-sm font-bold">تعداد خواب</p>
        <div className="flex gap-2">
          {[{ v: null, l: "همه" }, { v: 1, l: "+۱" }, { v: 2, l: "+۲" }, { v: 3, l: "+۳" }, { v: 4, l: "+۴" }].map((r) => (
            <button
              key={r.l}
              onClick={() => setRooms(r.v)}
              aria-pressed={rooms === r.v}
              className={cn(
                "h-10 flex-1 rounded-xl text-sm font-bold transition",
                rooms === r.v ? "bg-white text-ink light:bg-ink light:text-white" : "hairline text-mist light:text-[#3c3f4d]"
              )}
            >
              {r.l}
            </button>
          ))}
        </div>
      </div>

      {/* age */}
      <div>
        <p className="mb-3 text-sm font-bold">سن بنا</p>
        <div className="flex flex-wrap gap-2">
          {[{ v: "all", l: "همه" }, { v: "new", l: "نوساز" }, { v: "5", l: "تا ۵ سال" }, { v: "10", l: "تا ۱۰ سال" }].map((a) => (
            <button
              key={a.v}
              onClick={() => setAge(a.v)}
              aria-pressed={age === a.v}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition",
                age === a.v ? "bg-white text-ink light:bg-ink light:text-white" : "hairline text-mist light:text-[#3c3f4d]"
              )}
            >
              {a.l}
            </button>
          ))}
        </div>
      </div>

      {/* facilities toggles */}
      <div className="space-y-3">
        {[
          { label: "پارکینگ", on: parking, set: setParking },
          { label: "آسانسور", on: elevator, set: setElevator },
          { label: "انباری", on: storage, set: setStorage },
          { label: "فقط فایل‌های موجود", on: onlyAvailable, set: setOnlyAvailable },
          { label: "فقط علاقه‌مندی‌های من", on: onlyFavs, set: setOnlyFavs },
        ].map((t) => (
          <div key={t.label} className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 light:bg-ink/[0.04]">
            <span className="text-sm font-medium">{t.label}</span>
            <Toggle on={t.on} onClick={() => t.set(!t.on)} label={t.label} />
          </div>
        ))}
      </div>

      <button onClick={reset} className="flex w-full items-center justify-center gap-2 rounded-2xl hairline py-3 text-sm font-bold text-mist transition hover:border-afra-flame/60 hover:text-afra-flame light:text-[#5b5e70]">
        <RotateCcw size={16} /> حذف همه فیلترها
      </button>
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="جستجوی هوشمند ملک"
        title="دقیق جست‌وجو کنید، سریع انتخاب کنید"
        desc="فیلترهای حرفه‌ای افرا را ترکیب کنید و از میان فایل‌های منتخب، گزینه‌ای را پیدا کنید که واقعاً به کارتان می‌آید."
      />

      <div className="mx-auto max-w-7xl px-4 pb-4 md:px-8">
        {/* search bar */}
        <div className="card-surface flex flex-col gap-3 rounded-[24px] p-4 shadow-card md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-white/5 px-5 py-3.5 light:bg-ink/[0.04]">
            <Search size={20} className="shrink-0 text-afra-magenta" />
            <span className="sr-only">جست‌وجو</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="جست‌وجوی محله، عنوان یا کد فایل…"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-mist/60 light:placeholder:text-[#9aa0b0]"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="پاک کردن جست‌وجو" className="text-mist hover:text-white light:hover:text-ink">
                <X size={17} />
              </button>
            )}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setShowMap(!showMap)}
              aria-pressed={showMap}
              className={cn("flex-1 rounded-2xl px-5 py-3.5 text-sm font-bold transition md:flex-none", showMap ? "bg-grad-emerald text-ink shadow-glow-green" : "hairline")}
            >
              {showMap ? "بستن نقشه" : "نمایش روی نقشه"}
            </button>
            <button
              onClick={() => setMobileFilters(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-grad-magenta px-5 py-3.5 text-sm font-bold text-white shadow-glow md:flex-none lg:hidden"
            >
              <SlidersHorizontal size={17} /> فیلترها
              {activeCount > 0 && <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] text-ink">{faNum(activeCount)}</span>}
            </button>
          </div>
        </div>

        {/* map */}
        <AnimatePresence>
          {showMap && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden">
              <div className="pt-4"><MockMap compact /></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* sidebar */}
          <aside className="hidden lg:block" aria-label="فیلترهای جست‌وجو">
            <div className="card-surface sticky top-24 rounded-[24px] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display flex items-center gap-2 text-lg">
                  <SlidersHorizontal size={19} className="text-afra-magenta" /> فیلترها
                </h2>
                {activeCount > 0 && <span className="rounded-full bg-grad-magenta px-3 py-1 text-xs font-bold text-white">{faNum(activeCount)} فعال</span>}
              </div>
              {filtersPanel}
            </div>
          </aside>

          {/* results */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-mist light:text-[#5b5e70]">
                <span className="font-display text-xl text-white light:text-ink">{faNum(results.length)}</span> ملک پیدا شد
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5" role="group" aria-label="مرتب‌سازی">
                  {SORTS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSort(s.key)}
                      aria-pressed={sort === s.key}
                      className={cn(
                        "hidden rounded-full px-4 py-2 text-[13px] font-medium transition sm:block",
                        sort === s.key ? "bg-white text-ink light:bg-ink light:text-white" : "hairline text-mist light:text-[#5b5e70]"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    aria-label="مرتب‌سازی"
                    className="rounded-full hairline bg-transparent px-4 py-2 text-[13px] sm:hidden"
                  >
                    {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                </div>
                <div className="glass flex rounded-full p-1" role="group" aria-label="نوع نمایش">
                  <button onClick={() => setView("grid")} aria-label="نمایش شبکه‌ای" aria-pressed={view === "grid"} className={cn("flex h-9 w-9 items-center justify-center rounded-full transition", view === "grid" ? "bg-grad-magenta text-white shadow-glow" : "text-mist light:text-[#8a8fa0]")}>
                    <LayoutGrid size={17} />
                  </button>
                  <button onClick={() => setView("list")} aria-label="نمایش فهرستی" aria-pressed={view === "list"} className={cn("flex h-9 w-9 items-center justify-center rounded-full transition", view === "list" ? "bg-grad-magenta text-white shadow-glow" : "text-mist light:text-[#8a8fa0]")}>
                    <List size={17} />
                  </button>
                </div>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="card-surface rounded-[24px] p-12 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-afra-magenta/10 text-afra-magenta">
                  <Search size={28} />
                </span>
                <h3 className="font-display mt-5 text-xl">ملکی با این مشخصات پیدا نشد</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-mist light:text-[#5b5e70]">
                  فیلترها را کمی بازتر کنید یا با مشاوران افرا در میان بگذارید تا فایل مناسب را برایتان پیدا کنند.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button onClick={reset} className="rounded-full hairline px-6 py-2.5 text-sm font-bold transition hover:border-afra-magenta/60">حذف فیلترها</button>
                  <Link href="/contact" className="btn-sheen rounded-full bg-grad-magenta px-6 py-2.5 text-sm font-bold text-white shadow-glow">درخواست مشاوره</Link>
                </div>
              </div>
            ) : view === "grid" ? (
              <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {results.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div layout className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {results.map((p) => <RowCard key={p.id} p={p} />)}
                </AnimatePresence>
              </motion.div>
            )}

            {results.length > 0 && (
              <p className="mt-6 rounded-2xl bg-afra-emerald/8 px-5 py-3 text-center text-[13px] text-mist light:text-[#5b5e70] border border-afra-emerald/20">
                نتایج نمایشی است؛ برای فایل‌های به‌روز با مشاوران افرا در تماس باشید.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* mobile filters drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-sm lg:hidden"
              aria-hidden
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-panel p-6 pb-10 light:bg-white lg:hidden"
              role="dialog" aria-label="فیلترهای جست‌وجو"
            >
              <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-white/20 light:bg-ink/15" aria-hidden />
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-lg">فیلترها {activeCount > 0 && <span className="text-sm text-afra-magenta">({faNum(activeCount)} فعال)</span>}</h2>
                <button onClick={() => setMobileFilters(false)} aria-label="بستن فیلترها" className="flex h-9 w-9 items-center justify-center rounded-full hairline">
                  <X size={18} />
                </button>
              </div>
              {filtersPanel}
              <button
                onClick={() => setMobileFilters(false)}
                className="btn-sheen sticky bottom-0 mt-6 w-full rounded-2xl bg-grad-magenta py-4 text-[15px] font-bold text-white shadow-glow"
              >
                نمایش {faNum(results.length)} نتیجه
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-mist">در حال بارگذاری جست‌وجو…</div>}>
      <SearchPageInner />
    </Suspense>
  );
}
