import Link from "next/link";
import { EMAIL, mailtoLink } from "@/content/contact";
import { PhoneNumber, WhatsAppLink } from "@/components/Phone";

const FOOTER_LINKS = [
  { name: "Services", href: "/#services" },
  { name: "Team", href: "/#team" },
  { name: "Work", href: "/#work" },
  { name: "Lab", href: "/#lab" },
  { name: "Estimator", href: "/hire-us#estimator" },
  { name: "Hire us", href: "/hire-us" },
  { name: "Privacy", href: "/privacy-policy" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-obsidian text-bone">
      <div className="mx-auto max-w-[1360px] px-5 pt-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 border-t border-bone/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[15px] text-ash">© {year} Biibisoft · Accra, Ghana</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
              <WhatsAppLink className="ulink text-champagne hover:text-bone">
                WhatsApp <PhoneNumber />
              </WhatsAppLink>
              <a href={mailtoLink()} className="ulink text-fog hover:text-bone">
                {EMAIL}
              </a>
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-fog transition-colors hover:text-bone">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Wordmark bleeding off the bottom edge */}
      <div aria-hidden="true" className="mt-10 h-[clamp(96px,19vw,280px)] overflow-hidden">
        <div className="whitespace-nowrap text-center font-serif text-[30vw] leading-[0.82] tracking-[-0.045em] text-champagne select-none">
          Biibisoft
        </div>
      </div>
    </footer>
  );
}
