"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Home, Phone, Search, LayoutGrid } from "lucide-react";
import { useFavorites } from "./providers";
import { faNum } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/properties", label: "املاک", icon: LayoutGrid },
  { href: "/search", label: "جستجو", icon: Search, fab: true },
  { href: "/search?favorites=1", label: "علاقه‌ها", icon: Heart, badge: true },
  { href: "/contact", label: "تماس", icon: Phone },
];

export function MobileDock() {
  const pathname = usePathname();
  const { favs } = useFavorites();

  return (
    <nav
      aria-label="ناوبری موبایل"
      className="fixed inset-x-3 bottom-3 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass-strong relative flex items-center justify-around rounded-3xl px-2 py-2 shadow-card">
        <span className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-l from-transparent via-afra-magenta/80 to-transparent" aria-hidden />
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]) && (item.href !== "/search?favorites=1");
          const Icon = item.icon;
          if (item.fab) {
            return (
              <Link key={item.href} href={item.href} aria-label={item.label} className="relative -mt-8 flex flex-col items-center">
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="btn-sheen flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-magenta text-white shadow-glow"
                >
                  <Icon size={22} strokeWidth={2.4} />
                </motion.span>
                <span className={cn("mt-1 text-[11px] font-medium", active ? "text-white light:text-ink" : "text-mist light:text-[#8a8fa0]")}>{item.label}</span>
              </Link>
            );
          }
          return (
            <Link key={item.href + item.label} href={item.href} aria-label={item.label} className="relative flex flex-col items-center gap-1 px-3 py-1.5">
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute -top-2 h-1 w-8 rounded-full bg-grad-magenta shadow-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">
                <Icon size={21} className={active ? "text-white light:text-ink" : "text-mist light:text-[#8a8fa0]"} strokeWidth={active ? 2.4 : 2} />
                {item.badge && favs.length > 0 && (
                  <span className="absolute -left-2.5 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-afra-flame px-1 text-[10px] font-bold text-white">
                    {faNum(favs.length)}
                  </span>
                )}
              </span>
              <span className={cn("text-[11px] font-medium", active ? "text-white light:text-ink" : "text-mist light:text-[#8a8fa0]")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
