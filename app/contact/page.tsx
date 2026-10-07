"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2, Clock, Instagram, Linkedin, Loader2, Mail,
  MapPin, Phone, Send, Smartphone,
} from "lucide-react";
import { PageHero } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const MOBILE_RE = /^09\d{9}$/;
const toEn = (s: string) => s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[\s-]/g, "");

const INFO = [
  { icon: Phone, label: "تلفن ثابت", value: "۰۲۱ ــ ــ ــ ــ ــ ــ ــ", dir: "ltr" as const, color: "text-afra-emerald" },
  { icon: Smartphone, label: "موبایل / واتساپ", value: "۰۹۱۲ ــ ــ ــ ــ ــ ــ", dir: "ltr" as const, color: "text-afra-magenta" },
  { icon: Mail, label: "ایمیل", value: "hello@afra.example", dir: "ltr" as const, color: "text-afra-cyan" },
  { icon: Clock, label: "ساعات کاری", value: "شنبه تا پنجشنبه، ۹ صبح تا ۹ شب", dir: "rtl" as const, color: "text-afra-ember" },
];

const SUBJECTS = ["مشاوره خرید", "مشاوره فروش", "رهن و اجاره", "سرمایه‌گذاری", "ساخت‌وساز", "سایر موضوعات"];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "نام را کامل وارد کنید";
    if (!MOBILE_RE.test(toEn(mobile))) errs.mobile = "شماره موبایل معتبر وارد کنید";
    if (message.trim().length < 10) errs.message = "پیام باید حداقل ۱۰ حرف باشد";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1400);
  };

  const inputCls = (bad?: string) =>
    cn(
      "w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-[15px] outline-none transition placeholder:text-mist/60 light:bg-ink/[0.04] light:placeholder:text-[#9aa0b0]",
      bad ? "border-afra-flame/70" : "border-white/10 focus:border-afra-magenta/60 light:border-ink/10"
    );

  return (
    <>
      <PageHero
        eyebrow="تماس با افرا"
        title="بیایید صحبت کنیم"
        desc="سؤال، درخواست بازدید یا نیاز به مشاوره دارید؟ فرم را پر کنید یا مستقیم تماس بگیرید؛ همان روز پاسخ می‌گیرید."
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* info column */}
          <div className="space-y-4">
            <Reveal>
              <div className="card-surface rounded-[28px] p-6 md:p-7">
                <h2 className="font-display text-lg">راه‌های ارتباطی</h2>
                <div className="mt-5 space-y-4">
                  {INFO.map((c) => (
                    <div key={c.label} className="flex items-center gap-4">
                      <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                        <c.icon size={20} className={c.color} />
                      </span>
                      <div>
                        <p className="text-xs text-mist light:text-[#8a8fa0]">{c.label}</p>
                        <p className="mt-0.5 font-bold" dir={c.dir}>{c.value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                      <MapPin size={20} className="text-afra-flame" />
                    </span>
                    <div>
                      <p className="text-xs text-mist light:text-[#8a8fa0]">نشانی دفتر</p>
                      <p className="mt-0.5 text-sm font-bold leading-7">تهران، خیابان ولیعصر، بالاتر از پارک ساعی (نشانی نمایشی)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-2.5 border-t border-white/10 pt-5 light:border-ink/10">
                  {[
                    { icon: Instagram, label: "اینستاگرام افرا" },
                    { icon: Send, label: "تلگرام افرا" },
                    { icon: Linkedin, label: "لینکدین افرا" },
                  ].map((s) => (
                    <a key={s.label} href="#" aria-label={s.label} onClick={(e) => e.preventDefault()} className="flex h-11 w-11 items-center justify-center rounded-full hairline text-mist transition hover:border-afra-magenta/60 hover:text-afra-magenta light:text-[#5b5e70]">
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {/* map placeholder */}
              <div className="relative h-64 overflow-hidden rounded-[28px] border border-white/10 light:border-ink/10" aria-label="نقشه دفتر افرا (نمایشی)">
                <div className="grid-bg absolute inset-0 bg-panel light:bg-white" aria-hidden />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    <span className="absolute -top-2 h-14 w-14 rounded-full bg-afra-magenta/30 animate-pulse-ring" aria-hidden />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-grad-magenta text-white shadow-glow">
                      <MapPin size={26} />
                    </span>
                    <p className="glass mt-3 rounded-full px-5 py-2 text-[13px] font-bold">دفتر مرکزی افرا — تهران</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* form column */}
          <Reveal delay={0.05}>
            <div className="card-surface relative overflow-hidden rounded-[28px] p-6 shadow-card md:p-9">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-afra-royal/20 blur-[90px]" aria-hidden />
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative py-14 text-center" role="status">
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-grad-emerald shadow-glow-green"
                    >
                      <CheckCircle2 size={36} className="text-ink" />
                    </motion.span>
                    <h3 className="font-display mt-5 text-2xl">پیام شما رسید</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-mist light:text-[#5b5e70]">
                      کارشناسان افرا پیام‌تان را بررسی می‌کنند و در ساعات کاری همان روز با شما تماس می‌گیرند.
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setName(""); setMobile(""); setMessage(""); }}
                      className="mt-6 rounded-full hairline px-6 py-2.5 text-sm font-bold transition hover:border-afra-magenta/60"
                    >
                      ارسال پیام جدید
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="relative">
                    <h2 className="font-display text-xl md:text-2xl">فرم درخواست مشاوره</h2>
                    <p className="mt-1.5 text-[13px] text-mist light:text-[#5b5e70]">پاسخ‌گویی در ساعات کاری، معمولاً در کمتر از ۳ ساعت.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-medium">نام و نام خانوادگی</label>
                        <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="نام شما" className={inputCls(errors.name)} autoComplete="name" />
                        {errors.name && <p className="mt-1.5 text-xs text-afra-flame" role="alert">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-mobile" className="mb-1.5 block text-[13px] font-medium">شماره موبایل</label>
                        <input id="c-mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="۰۹۱۲۳۴۵۶۷۸۹" inputMode="tel" dir="ltr" className={cn(inputCls(errors.mobile), "text-left tracking-wider")} autoComplete="tel" />
                        {errors.mobile && <p className="mt-1.5 text-xs text-afra-flame" role="alert">{errors.mobile}</p>}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="mb-1.5 block text-[13px] font-medium" id="subject-label">موضوع</span>
                      <div className="flex flex-wrap gap-2" role="group" aria-labelledby="subject-label">
                        {SUBJECTS.map((s) => (
                          <button
                            type="button" key={s} onClick={() => setSubject(s)} aria-pressed={subject === s}
                            className={cn(
                              "rounded-full px-4 py-2 text-[13px] font-medium transition",
                              subject === s ? "bg-grad-magenta text-white shadow-glow" : "hairline text-mist light:text-[#3c3f4d]"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="c-msg" className="mb-1.5 block text-[13px] font-medium">پیام شما</label>
                      <textarea id="c-msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="درباره نیازتان بنویسید؛ مثلاً بودجه، محله مدنظر یا نوع ملک…" className={cn(inputCls(errors.message), "resize-none")} />
                      {errors.message && <p className="mt-1.5 text-xs text-afra-flame" role="alert">{errors.message}</p>}
                    </div>
                    <button
                      type="submit" disabled={status === "sending"}
                      className="btn-sheen mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-magenta py-4 text-[15px] font-bold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
                    >
                      {status === "sending" ? (<><Loader2 size={18} className="animate-spin" /> در حال ارسال…</>) : (<><Send size={17} /> ارسال پیام و درخواست مشاوره</>)}
                    </button>
                    <p className="mt-3 text-center text-xs text-mist light:text-[#8a8fa0]">با ارسال فرم، با تماس کارشناسان افرا موافقت می‌کنید.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
