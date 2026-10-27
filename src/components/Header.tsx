"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { EMAIL, mailtoLink } from "@/content/contact";
import { WhatsAppLink } from "@/components/Phone";

const NAV_LINKS = [
  { name: "Services", href: "/#services" },
  { name: "Team", href: "/#team" },
  { name: "Work", href: "/#work" },
  { name: "Lab", href: "/#lab" },
  { name: "Estimator", href: "/hire-us#estimator" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setIsScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const close = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-bone transition-[background-color,border-color] duration-300 border-b ${
          isScrolled || isMenuOpen
            ? "bg-obsidian/85 backdrop-blur-md border-bone/10"
            : "bg-obsidian/60 backdrop-blur-sm border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Logo />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-bone/10 bg-bone/[0.06] p-1.5 text-sm lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-fog transition-colors hover:text-bone"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/#enquire"
              className="hidden h-11 items-center gap-2 rounded-full bg-bone px-5 text-[15px] font-medium text-obsidian transition-colors hover:bg-champagne sm:inline-flex"
            >
              Start a project
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-obsidian text-bone transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-between px-5 pb-10 pt-28 sm:px-8"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li key={link.name} className="border-b border-bone/10">
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="font-serif text-5xl leading-none">{link.name}</span>
                  <span className="font-mono text-xs text-ash">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <Link
              href="/#enquire"
              onClick={close}
              className="inline-flex h-14 items-center justify-between rounded-full bg-champagne px-7 text-base font-medium text-obsidian"
            >
              Start a project
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <WhatsAppLink
                onClick={close}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-bone/20 text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </WhatsAppLink>
              <a
                href={mailtoLink()}
                aria-label={`Email ${EMAIL}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-bone/20 text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
