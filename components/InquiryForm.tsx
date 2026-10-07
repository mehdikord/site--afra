"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_RE = /^09\d{9}$/;

export function InquiryForm({ propertyTitle }: { propertyTitle: string }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "نام را کامل وارد کنید";
    if (!MOBILE_RE.test(mobile.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\s/g, "")))
      errs.mobile = "شماره موبایل معتبر وارد کنید (مثل ۰۹۱۲۳۴۵۶۷۸۹)";
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
    <div className="card-surface relative overflow-hidden rounded-[28px] p-6 shadow-card md:p-8">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-afra-magenta/20 blur-[80px]" aria-hidden />
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative py-8 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-grad-emerald shadow-glow-green"
            >
              <CheckCircle2 size={36} className="text-ink" />
            </motion.span>
            <h3 className="font-display mt-5 text-2xl">درخواست شما ثبت شد</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-mist light:text-[#5b5e70]">
              مشاوران افرا به‌زودی درباره «{propertyTitle}» با شما تماس می‌گیرند. سپاس از اعتمادتان.
            </p>
            <button
              onClick={() => { setStatus("idle"); setName(""); setMobile(""); setNote(""); }}
              className="mt-6 rounded-full hairline px-6 py-2.5 text-sm font-bold transition hover:border-afra-magenta/60"
            >
              ثبت درخواست جدید
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            noValidate
            className="relative"
          >
            <h3 className="font-display text-xl">ثبت درخواست برای این ملک</h3>
            <p className="mt-1.5 text-[13px] text-mist light:text-[#5b5e70]">اطلاعات‌تان محرمانه می‌ماند؛ فقط برای همین درخواست استفاده می‌شود.</p>
            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="inq-name" className="mb-1.5 block text-[13px] font-medium">نام و نام خانوادگی</label>
                <input id="inq-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً سارا محمدی" className={inputCls(errors.name)} autoComplete="name" />
                {errors.name && <p className="mt-1.5 text-xs text-afra-flame" role="alert">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="inq-mobile" className="mb-1.5 block text-[13px] font-medium">شماره موبایل</label>
                <input
                  id="inq-mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  inputMode="tel" dir="ltr" className={cn(inputCls(errors.mobile), "text-left tracking-wider")} autoComplete="tel"
                />
                {errors.mobile && <p className="mt-1.5 text-xs text-afra-flame" role="alert">{errors.mobile}</p>}
              </div>
              <div>
                <label htmlFor="inq-note" className="mb-1.5 block text-[13px] font-medium">توضیح کوتاه <span className="text-mist light:text-[#8a8fa0]">(اختیاری)</span></label>
                <textarea
                  id="inq-note" value={note} onChange={(e) => setNote(e.target.value)} rows={3}
                  placeholder="زمان بازدید مدنظرتان یا سوالی که دارید…" className={cn(inputCls(), "resize-none")}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-sheen flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-magenta py-4 text-[15px] font-bold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
              >
                {status === "sending" ? (
                  <><Loader2 size={18} className="animate-spin" /> در حال ثبت…</>
                ) : (
                  <><Send size={17} /> ثبت درخواست بازدید / مشاوره</>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
