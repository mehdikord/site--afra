"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* Scroll reveal wrapper */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered word reveal for headings */
export function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const reduce = useReducedMotion();
  const MTag = (motion as any)[Tag] ?? motion.span;
  return (
    <MTag className={cn("inline-block", className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 -mb-1 align-bottom" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 1 : 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MTag>
  );
}

/* Magnetic hover for premium CTAs */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      animate={{ x: reduce ? 0 : pos.x, y: reduce ? 0 : pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* Subtle 3D tilt card */
export function Tilt({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transformPerspective: 900 }}
      animate={{ rotateX: reduce ? 0 : t.rx, rotateY: reduce ? 0 : t.ry }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setT({ rx: -py * max, ry: px * max });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
    >
      {children}
    </motion.div>
  );
}

/* Parallax image on scroll */
export function Parallax({ children, speed = 0.15, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y, scale: 1 + speed }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* Count-up free metric shimmer line */
export function GlowDivider({ className, tone = "magenta" }: { className?: string; tone?: "magenta" | "emerald" | "sunset" }) {
  const grad =
    tone === "magenta"
      ? "from-transparent via-afra-magenta/70 to-transparent"
      : tone === "emerald"
        ? "from-transparent via-afra-emerald/70 to-transparent"
        : "from-transparent via-afra-ember/70 to-transparent";
  return <div className={cn("h-px w-full bg-gradient-to-l", grad, className)} aria-hidden />;
}

/* Section heading block */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  tone = "magenta",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "center" | "start";
  tone?: "magenta" | "emerald" | "sunset";
}) {
  const dot = tone === "magenta" ? "bg-afra-magenta shadow-glow" : tone === "emerald" ? "bg-afra-emerald shadow-glow-green" : "bg-afra-ember";
  return (
    <div className={cn("mb-10 md:mb-14", align === "center" ? "text-center mx-auto max-w-2xl" : "text-start max-w-2xl")}>
      <Reveal>
        <span className={cn("inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs md:text-sm text-mist light:text-[#5b5e70]")}>
          <span className={cn("h-2 w-2 rounded-full animate-pulse", dot)} />
          {eyebrow}
        </span>
      </Reveal>
      <WordReveal as="h2" text={title} className="font-display mt-5 text-3xl md:text-5xl" delay={0.1} />
      {desc && (
        <Reveal delay={0.2}>
          <p className="mt-4 text-sm md:text-lg leading-8 text-mist light:text-[#5b5e70]">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

/* In-view trigger hook export */
export { useInView };
