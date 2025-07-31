'use client'
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, PcCase } from "lucide-react";

const THEMES = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: PcCase }
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setTheme(saved);
    applyTheme(saved);

    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function applyTheme(selected) {
    let t = selected;
    if (t === "system") {
      t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.classList.toggle("dark", t === "dark");
  }

  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
  }, [theme]);

  const CurrentIcon = THEMES.find(t => t.name === theme)?.icon || Sun;

  return (
    <div className="relative border border-transparent hover:border-blue-200 hover:bg-blue-100 p-2 rounded-xl cursor-pointer" ref={menuRef}>
      <button
        aria-label="Elige el tema"
        className="appearance-none border-none flex items-center text-black cursor-pointer"
        onClick={() => setMenuOpen(v => !v)}
        type="button"
      >
        <CurrentIcon className="size-5 transition-all" />
      </button>
      {menuOpen && (
        <div
          className="absolute z-50 top-[30px] left-[-110px] min-w-[8rem] rounded-md border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-500/20 shadow-lg backdrop-blur-md animate-scale-up"
        >
          <ul>
            {THEMES.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-black dark:text-white hover:bg-neutral-400/40 dark:hover:bg-gray-500/50 rounded-sm transition"
                onClick={() => handleThemeChange(name)}
              >
                <Icon className="size-4" />
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        .animate-scale-up {
          animation: scale-up-center 0.15s cubic-bezier(0.25,0.46,0.45,0.94) both;
        }
        @keyframes scale-up-center {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
} 