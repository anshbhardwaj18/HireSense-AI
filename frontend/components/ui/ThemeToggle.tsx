"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch - render nothing on server
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Reserve space to avoid layout shift
    return (
      <div
        className="h-9 w-9 rounded-lg"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white light:border-slate-200 light:bg-slate-100 light:text-slate-500 light:hover:bg-slate-200 light:hover:text-slate-900"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun
          size={17}
          className="transition-transform duration-300 hover:rotate-12"
        />
      ) : (
        <Moon
          size={17}
          className="transition-transform duration-300 hover:-rotate-12"
        />
      )}
    </button>
  );
}