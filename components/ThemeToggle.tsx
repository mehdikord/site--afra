"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./providers";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "تغییر به حالت تیره" : "تغییر به حالت روشن"}
      className={cn(
        "relative flex h-10 w-[68px] items-center rounded-full p-1 transition-colors duration-500",
        "bg-white/10 border border-white/15 light:bg-ink/5 light:border-ink/10",
        className
      )}
    >
      {/* track glow */}
      <span
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500",
          isLight ? "opacity-100 bg-gradient-to-l from-afra-gold/25 to-afra-ember/25" : "bg-gradient-to-l from-afra-magenta/25 to-afra-royal/25 opacity-100"
        )}
        aria-hidden
      />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
          isLight ? "bg-gradient-to-br from-afra-gold to-afra-ember text-ink" : "bg-gradient-to-br from-afra-magenta to-afra-royal text-white shadow-glow"
        )}
        style={{ x: 0 }}
        animate={{ x: isLight ? -26 : 0 }}
      >
        {isLight ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
      </motion.span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5 text-mist light:text-[#8a8fa0]">
        <Moon size={13} />
        <Sun size={13} />
      </span>
    </button>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/" className="group flex items-center gap-3" aria-label="املاک افرا">
      <span className="relative flex h-11 w-11 items-center justify-center">
        <span className="absolute inset-0 rounded-2xl bg-grad-magenta opacity-90 shadow-glow transition-transform duration-500 group-hover:rotate-[10deg]" aria-hidden />
        <span className="absolute inset-0 rounded-2xl bg-grad-emerald opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60" aria-hidden />
        <span className="font-display relative text-xl text-white">ا</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight">
            افرا <span className="text-grad-magenta text-sm font-bold align-middle">AFRA</span>
          </span>
          <span className="mt-1 text-[11px] tracking-[0.2em] text-mist light:text-[#8a8fa0]">مشاوره هوشمند ملک</span>
        </span>
      )}
    </a>
  );
}
