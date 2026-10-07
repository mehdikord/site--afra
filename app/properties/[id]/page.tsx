import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, BedDouble, Building2, Calendar, Car,
  CheckCircle2, Compass, Eye, Flame, Layers, MapPin, Package,
  Ruler, Snowflake, Sprout, Wrench,
} from "lucide-react";
import { PROPERTIES } from "@/lib/data";
import { faNum, formatToman, priceText } from "@/lib/utils";
import { Gallery } from "@/components/Gallery";
import { BadgePill, PropertyCard } from "@/components/PropertyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { MockMap } from "@/components/MockMap";
import { Reveal } from "@/components/motion";
import { FavButton } from "./FavButton";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PROPERTIES.find((x) => x.id === id);
  return { title: p ? `${p.title} | املاک افرا` : "ملک | املاک افرا" };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PROPERTIES.find((x) => x.id === id);
  if (!p) notFound();

  const related = PROPERTIES.filter((x) => x.id !== p.id && (x.district === p.district || x.type === p.type)).slice(0, 3);
  const fillRelated = related.length >= 3 ? related : [...related, ...PROPERTIES.filter((x) => x.id !== p.id && !related.includes(x))].slice(0, 3);

  const specs = [
    { icon: Ruler, label: "متراژ", value: `${faNum(p.area)} متر مربع` },
    { icon: BedDouble, label: "تعداد خواب", value: p.rooms > 0 ? `${faNum(p.rooms)} خوابه` : "—" },
    { icon: Layers, label: "طبقه", value: p.type === "زمین" || p.type === "ویلا" ? "—" : faNum(p.floor) },
    { icon: Building2, label: "طبقات ساختمان", value: p.buildingFloors > 0 ? faNum(p.buildingFloors) : "—" },
    { icon: Car, label: "پارکینگ", value: p.parking > 0 ? `${faNum(p.parking)} واحد` : "ندارد" },
    { icon: Package, label: "انباری", value: p.storage ? "دارد" : "ندارد" },
    { icon: ArrowLeft, label: "آسانسور", value: p.elevator ? "دارد" : "ندارد" },
    { icon: Calendar, label: "سن بنا", value: p.age === 0 ? "نوساز" : `${faNum(p.age)} سال` },
    { icon: Flame, label: "گرمایش", value: p.heating },
    { icon: Snowflake, label: "سرمایش", value: p.cooling },
    { icon: Eye, label: "چشم‌انداز", value: p.view },
    { icon: Wrench, label: "وضعیت بازسازی", value: p.renovation },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 pt-6 text-[13px] text-mist light:text-[#8a8fa0]" aria-label="مسیر">
        <Link href="/" className="transition hover:text-white light:hover:text-ink">خانه</Link>
        <ArrowLeft size={13} />
        <Link href="/properties" className="transition hover:text-white light:hover:text-ink">املاک</Link>
        <ArrowLeft size={13} />
        <span className="text-white light:text-ink">{p.title}</span>
      </nav>

      {/* title row */}
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <BadgePill badge={p.badge} />
            <span className="rounded-full hairline px-3 py-1 text-[11px]">{p.transaction}</span>
            <span className="rounded-full hairline px-3 py-1 text-[11px]">{p.type}</span>
            <span className="rounded-full hairline px-3 py-1 font-mono text-[11px]" dir="ltr">کد: {p.code}</span>
          </div>
          <h1 className="font-display mt-3 text-3xl md:text-[40px] md:leading-[1.4]">{p.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-mist light:text-[#5b5e70] md:text-[15px]">
            <MapPin size={16} className="text-afra-ember" /> {p.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FavButton id={p.id} />
          <Link href="/search" className="flex h-11 items-center gap-2 rounded-full hairline px-5 text-sm font-bold transition hover:border-afra-magenta/60">
            <ArrowRight size={16} /> بازگشت
          </Link>
        </div>
      </div>

      <div className="mt-6"><Gallery images={p.images} title={p.title} /></div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* price banner */}
          <Reveal>
            <div className="card-surface flex flex-wrap items-center justify-between gap-4 rounded-[24px] p-6">
              <div>
                <p className="text-[13px] text-mist light:text-[#8a8fa0]">{p.priceLabel}</p>
                <p className="font-display mt-1 text-3xl text-grad-magenta md:text-4xl">{priceText(p)}</p>
                {p.transaction === "اجاره" && p.deposit && (
                  <p className="mt-1 text-[13px] text-mist light:text-[#5b5e70]">
                    ودیعه: <span className="font-bold text-white light:text-ink">{formatToman(p.deposit)}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-5 text-center">
                <div>
                  <p className="font-display text-xl">{faNum(p.area)}</p>
                  <p className="text-xs text-mist light:text-[#8a8fa0]">متر مربع</p>
                </div>
                <span className="h-10 w-px bg-white/10 light:bg-ink/10" aria-hidden />
                <div>
                  <p className="font-display text-xl">{p.rooms > 0 ? faNum(p.rooms) : "—"}</p>
                  <p className="text-xs text-mist light:text-[#8a8fa0]">خوابه</p>
                </div>
                <span className="h-10 w-px bg-white/10 light:bg-ink/10" aria-hidden />
                <div>
                  <p className="font-display text-xl">{p.age === 0 ? "نوساز" : faNum(p.age)}</p>
                  <p className="text-xs text-mist light:text-[#8a8fa0]">سن بنا</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* description */}
          <Reveal>
            <div className="card-surface rounded-[24px] p-6 md:p-8">
              <h2 className="font-display text-xl">درباره این ملک</h2>
              <p className="mt-3 text-[15px] leading-9 text-mist light:text-[#3c3f4d]">{p.description}</p>
            </div>
          </Reveal>

          {/* specs */}
          <Reveal>
            <div className="card-surface rounded-[24px] p-6 md:p-8">
              <h2 className="font-display text-xl">مشخصات کامل</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3.5 light:bg-ink/[0.04]">
                    <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <s.icon size={18} className="text-afra-magenta" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] text-mist light:text-[#8a8fa0]">{s.label}</p>
                      <p className="truncate text-sm font-bold">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* facilities */}
          <Reveal>
            <div className="card-surface rounded-[24px] p-6 md:p-8">
              <h2 className="font-display text-xl">امکانات</h2>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {p.facilities.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px]">
                    <CheckCircle2 size={18} className="shrink-0 text-afra-emerald" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* map */}
          <Reveal>
            <div>
              <h2 className="font-display mb-4 flex items-center gap-2 text-xl">
                <Compass size={20} className="text-afra-ember" /> موقعیت روی نقشه
              </h2>
              <MockMap compact />
              <p className="mt-2 flex items-center gap-1.5 text-[13px] text-mist light:text-[#8a8fa0]">
                <Sprout size={14} /> موقعیت تقریبی نمایش داده می‌شود؛ آدرس دقیق در بازدید اعلام می‌گردد.
              </p>
            </div>
          </Reveal>
        </div>

        {/* sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <InquiryForm propertyTitle={p.title} />
          <div className="card-surface rounded-[24px] p-6">
            <h3 className="font-display text-[15px]">ترجیح می‌دهید صحبت کنید؟</h3>
            <p className="mt-1.5 text-[13px] leading-6 text-mist light:text-[#5b5e70]">مشاوران افرا همه‌روزه از ۹ صبح تا ۹ شب پاسخ‌گویند.</p>
            <div className="mt-4 grid gap-2">
              <a href="tel:+982100000000" className="btn-sheen rounded-2xl bg-grad-emerald py-3 text-center text-sm font-bold text-ink shadow-glow-green">
                تماس با مشاور این فایل
              </a>
              <Link href="/contact" className="glass rounded-2xl py-3 text-center text-sm font-bold transition hover:border-afra-magenta/50">
                درخواست مشاوره عمومی
              </Link>
            </div>
          </div>
          <div className="glass rounded-[24px] p-6">
            <div className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-afra-emerald/60">
                <Image src="/images/photo-1573496359142-b8d87734a5a2.jpg" alt="مشاور فایل" fill sizes="56px" className="object-cover" loading="lazy" />
              </span>
              <div>
                <p className="text-sm font-bold">کارشناس این فایل</p>
                <p className="text-[13px] text-mist light:text-[#5b5e70]">سارا محمدی · مشاور ارشد</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[13px] text-mist light:text-[#5b5e70]">
              کد فایل را هنگام تماس اعلام کنید: <span className="font-mono font-bold text-white light:text-ink" dir="ltr">{p.code}</span>
            </div>
          </div>
        </aside>
      </div>

      {/* related */}
      <section className="mt-16" aria-label="املاک مشابه">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl md:text-3xl">املاک مشابه</h2>
          <Link href="/properties" className="group hidden items-center gap-2 text-sm font-bold md:inline-flex">
            مشاهده همه <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fillRelated.map((r, i) => (
            <PropertyCard key={r.id} property={r} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
