"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/* ------------------------------- theme ------------------------------- */
type Theme = "dark" | "light";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("afra-theme") as Theme | null) : null;
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", next === "light");
      localStorage.setItem("afra-theme", next);
      return next;
    });
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{mounted ? children : <div className="invisible">{children}</div>}</ThemeCtx.Provider>;
}

/* ----------------------------- favorites ----------------------------- */
const FavCtx = createContext<{
  favs: string[];
  toggleFav: (id: string) => void;
  isFav: (id: string) => boolean;
}>({ favs: [], toggleFav: () => {}, isFav: () => false });

export function useFavorites() {
  return useContext(FavCtx);
}

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("afra-favs");
      if (raw) setFavs(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleFav = (id: string) => {
    setFavs((f) => {
      const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
      localStorage.setItem("afra-favs", JSON.stringify(next));
      return next;
    });
  };
  const isFav = (id: string) => favs.includes(id);

  return <FavCtx.Provider value={{ favs, toggleFav, isFav }}>{children}</FavCtx.Provider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ThemeProvider>
  );
}
