"use client";
import { useEffect, useState } from "react";
import DarkToggle from "./DarkToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <nav
        className={`
          transition-all duration-500 ease-in-out
          bg-white/95 dark:bg-slate-900/90 backdrop-blur-md 
          shadow-md dark:shadow-lg dark:shadow-white/20
          ${
            scrolled
              ? "w-full mx-auto mt-0 py-4 rounded-none"
              : "w-[95%] lg:w-[80rem] mx-auto mt-3 lg:mt-6 py-4 rounded-xl lg:rounded-full"
          }
        `}
        style={{
          boxShadow: scrolled
            ? undefined
            : "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
        }}
      >
        {/* Inner container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">

          <h1 className="font-bold text-blue-600 dark:text-blue-400 text-lg lg:text-xl">
            RALPH CARBO
          </h1>

          {/* Desktop Nav - Only show on large screens (1024px+) */}
          <div className="hidden lg:flex items-center space-x-8 text-black dark:text-white uppercase font-montserrat">
            <a href="/" className="nav-link">Home</a>
            <a href="/projects" className="nav-link">Projects</a>
            <a href="/contact" className="nav-link">Contact</a>
            <DarkToggle />
          </div>

          {/* Mobile/Tablet Nav - Show on screens smaller than 1024px */}
          <div className="flex lg:hidden items-center space-x-4">
            <DarkToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black dark:text-white text-2xl focus:outline-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

        </div>

        {/* Mobile/Tablet Dropdown */}
        <div
          className={`
            lg:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="mt-4 px-6 py-4 flex flex-col items-center space-y-4 border-t border-gray-200 dark:border-gray-700 uppercase font-montserrat">
            <a onClick={() => setMenuOpen(false)} href="/" className="nav-link">Home</a>
            <a onClick={() => setMenuOpen(false)} href="/projects" className="nav-link">Projects</a>
            <a onClick={() => setMenuOpen(false)} href="/contact" className="nav-link">Contact</a>
          </div>
        </div>

      </nav>
    </div>
  );
}