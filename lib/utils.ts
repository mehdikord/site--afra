import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function faNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

export function formatPrice(n: number): string {
  return faNum(n.toLocaleString("en-US"));
}

export function priceText(p: Property): string {
  if (p.transaction === "رهن" && p.deposit) return formatToman(p.deposit);
  if (p.transaction === "اجاره") {
    const dep = p.deposit ? `${formatToman(p.deposit)} + ` : "";
    return `${dep}${formatToman(p.price)}`;
  }
  return formatToman(p.price);
}

/** Format a Toman price compactly, e.g. 18500000000 -> "۱۸٫۵ میلیارد تومان" */
export function formatToman(n: number): string {
  if (n >= 1_000_000_000) {
    const b = n / 1_000_000_000;
    const str = Number.isInteger(b) ? String(b) : b.toFixed(1);
    return `${faNum(str)} میلیارد تومان`;
  }
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const str = Number.isInteger(m) ? String(m) : m.toFixed(1);
    return `${faNum(str)} میلیون تومان`;
  }
  return `${formatPrice(n)} تومان`;
}
