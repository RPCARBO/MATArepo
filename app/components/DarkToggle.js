"use client";
import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    // Render a placeholder to avoid mismatch
    return <button className="text-2xl opacity-0">☀</button>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative text-2xl text-black dark:text-white hover:scale-110 transition-all duration-300 bg-transparent"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === "light" ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        ☀
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === "dark" ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        ☾
      </span>
      <span className="opacity-0">☀</span>
    </button>
  );
}
