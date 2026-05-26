import React from "react";
import Link from "next/link";
import { Mail, MapPin, Cpu } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Biibisoft Home"
          >
            <div className="p-2 rounded-xl bg-linear-to-tr from-brand-orange to-brand-amber flex items-center justify-center text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-white select-none">
              Biibi<span className="text-brand-orange">soft</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            We deliver cutting-edge web, mobile, and software solutions,
            custom-built for high performance, visual beauty, and seamless
            usability.
          </p>
          {/* <div className="flex items-center gap-3 mt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-brand-orange transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-brand-orange transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-brand-orange transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div> */}
        </div>

        {/* Services column */}
        <div>
          <h3 className="font-bold text-white tracking-widest uppercase text-xs mb-4">
            Services
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link
                href="/hire-us#services"
                className="hover:text-brand-orange transition-colors"
              >
                Web Applications
              </Link>
            </li>
            <li>
              <Link
                href="/hire-us#services"
                className="hover:text-brand-orange transition-colors"
              >
                Mobile Applications
              </Link>
            </li>
            <li>
              <Link
                href="/hire-us#services"
                className="hover:text-brand-orange transition-colors"
              >
                Corporate Websites
              </Link>
            </li>
            <li>
              <Link
                href="/hire-us#services"
                className="hover:text-brand-orange transition-colors"
              >
                Custom Cloud APIs
              </Link>
            </li>
          </ul>
        </div>

        {/* Company column */}
        <div>
          <h3 className="font-bold text-white tracking-widest uppercase text-xs mb-4">
            Company
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-brand-orange transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/hire-us#tech-stack"
                className="hover:text-brand-orange transition-colors"
              >
                Tech Stack
              </Link>
            </li>
            <li>
              <Link
                href="/hire-us#estimator"
                className="hover:text-brand-orange transition-colors"
              >
                Cost Estimator
              </Link>
            </li>
            <li>
              <Link
                href="/hire-us#contact"
                className="hover:text-brand-orange transition-colors"
              >
                Inquiries
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-brand-orange transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info column */}
        <div>
          <h3 className="font-bold text-white tracking-widest uppercase text-xs mb-4">
            Registry & Location
          </h3>
          <address className="not-italic flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
              <span className="text-slate-300 leading-relaxed">
                <strong>Biibisoft Ghana Ltd.</strong>
                <br />
                Accra, Greater Accra Region
                <br />
                Ghana (Registered Ltd)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <a
                href="mailto:message@biibisoft.com"
                className="hover:text-brand-orange transition-colors"
              >
                message@biibisoft.com
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {currentYear} Biibisoft. All rights reserved.</p>
        <div className="flex items-center gap-1.5">
          <span>Registered in the Republic of Ghana</span>
          <span className="inline-block w-3.5 h-2.5 relative rounded-xs overflow-hidden border border-slate-800">
            <span className="absolute inset-y-0 left-0 w-1/3 bg-[#dd0000]" />
            <span className="absolute inset-y-0 left-1/3 w-1/3 bg-[#ffd200]" />
            <span className="absolute inset-y-0 right-0 w-1/3 bg-[#006b3f]" />
          </span>
        </div>
      </div>
    </footer>
  );
}
