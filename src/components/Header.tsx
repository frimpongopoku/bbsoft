"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Cpu, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Sync state with DOM on mount safely to avoid synchronous cascading render warning
    const isDark = document.documentElement.classList.contains("dark");
    const timer = setTimeout(() => {
      setTheme(isDark ? "dark" : "light");
    }, 0);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        const nextTheme = e.matches ? "dark" : "light";
        setTheme(nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute("data-theme", "light");
        }
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Estimator", href: "#estimator" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 glass-panel border-b border-brand-border-theme"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Biibisoft Home"
          >
            <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-brand-text-title select-none">
              Biibi<span className="text-brand-orange">soft</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-brand-text-body hover:text-brand-orange transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-full border border-brand-border-theme hover:border-brand-orange/40 bg-brand-card-bg-theme text-brand-text-body hover:text-brand-orange transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            
            <Link
              href="#estimator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-brand-orange focus:outline-none dark:bg-brand-orange dark:hover:bg-brand-orange-hover"
            >
              Get Estimation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-full border border-brand-border-theme bg-brand-card-bg-theme text-brand-text-body hover:text-brand-orange transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            
            <button
              className="p-2 rounded-lg text-brand-text-body hover:text-brand-text-title hover:bg-brand-card-bg-theme transition-colors focus:outline-none cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-border-theme">
          <div className="scroll-progress-indicator h-full bg-gradient-to-r from-brand-orange via-brand-amber to-brand-orange w-full" />
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-40 bg-brand-card-bg-theme/95 backdrop-blur-md md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-center p-8">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-brand-text-body hover:text-brand-orange active:text-brand-orange-hover transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#estimator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-colors dark:bg-brand-orange dark:hover:bg-brand-orange-hover"
            >
              Get Estimation
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
