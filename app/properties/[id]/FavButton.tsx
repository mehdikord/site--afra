"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/providers";
import { cn } from "@/lib/utils";

export function FavButton({ id }: { id: string }) {
  const { isFav, toggleFav } = useFavorites();
  const fav = isFav(id);
  return (
    <button
      onClick={() => toggleFav(id)}
      aria-pressed={fav}
      aria-label={fav ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={cn(
        "flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-bold transition active:scale-95",
        fav
          ? "border-transparent bg-afra-magenta text-white shadow-glow"
          : "hairline hover:border-afra-magenta/60"
      )}
    >
      <Heart size={16} fill={fav ? "currentColor" : "none"} />
      {fav ? "در علاقه‌مندی‌ها" : "علاقه‌مندی"}
    </button>
  );
}
