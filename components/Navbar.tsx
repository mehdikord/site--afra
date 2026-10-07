"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, Sparkles, X } from "lucide-react";
import { Logo, ThemeToggle } from "./ThemeToggle";
import { useFavorites } from "./providers";
import { faNum } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { NAV_LINKS } from "@/lib/nav";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favs } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong shadow-card py-2" : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Logo />

          {/* desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-white light:text-ink" : "text-mist hover:text-white light:text-[#5b5e70] light:hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 light:bg-ink/[0.06] border border-white/10 light:border-ink/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                  {active && <span className="absolute -bottom-0.5 right-1/2 h-1 w-6 translate-x-1/2 rounded-full bg-grad-magenta" aria-hidden />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/search"
              aria-label="جستجو"
              className="hidden h-10 w-10 items-center justify-center rounded-full hairline text-mist transition hover:text-white hover:border-afra-magenta/50 light:text-[#5b5e70] light:hover:text-ink sm:flex"
            >
              <Search size={18} />
            </Link>
            <Link
              href="/search?favorites=1"
              aria-label="علاقه‌مندی‌ها"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full hairline text-mist transition hover:text-white hover:border-afra-magenta/50 light:text-[#5b5e70] light:hover:text-ink sm:flex"
            >
              <Heart size={18} />
              {favs.length > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-grad-magenta px-1 text-[11px] font-bold text-white shadow-glow">
                  {faNum(favs.length)}
                </span>
              )}
            </Link>
            <Link
              href="/contact"
              className="btn-sheen hidden items-center gap-2 rounded-full bg-grad-magenta px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 md:inline-flex"
            >
              <Sparkles size={16} />
              مشاوره رایگان
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className="flex h-10 w-10 items-center justify-center rounded-full hairline lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* mobile dropdown (top) */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong overflow-hidden lg:hidden"
              aria-label="منوی موبایل"
            >
              <div className="space-y-1 px-4 py-4">
                {NAV_LINKS.map((l, i) => (
                  <motion.div key={l.href} initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <Link
                      href={l.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-[15px] font-medium transition",
                        pathname === l.href ? "bg-grad-magenta text-white shadow-glow" : "text-mist hover:bg-white/5 hover:text-white light:text-[#3c3f4d] light:hover:bg-ink/5"
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="flex items-center gap-3 px-4 pt-3">
                  <ThemeToggle />
                  <Link href="/contact" className="btn-sheen flex flex-1 items-center justify-center gap-2 rounded-full bg-grad-magenta px-5 py-3 text-sm font-bold text-white shadow-glow">
                    <Sparkles size={16} />
                    مشاوره رایگان
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      <div className="h-20 md:h-24" aria-hidden />
    </>
  );
}
