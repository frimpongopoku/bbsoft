import { ArrowUpRight, Mail } from "lucide-react";
import { EMAIL, mailtoLink } from "@/content/contact";
import { PhoneLink, PhoneNumber, WhatsAppLink } from "@/components/Phone";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Dark-surface contact options, ordered by preference: WhatsApp, email, then phone. */
export default function ContactChannels() {
  return (
    <div className="flex flex-col gap-3">
      <WhatsAppLink
        text="Hi Biibisoft, I'd like to talk about a project."
        className="group flex items-center justify-between gap-4 rounded-[22px] bg-champagne p-5 text-obsidian transition-colors hover:bg-bone sm:p-6"
      >
        <span className="flex items-center gap-4">
          <WhatsAppIcon className="h-7 w-7 shrink-0" />
          <span>
            <span className="block font-serif text-[28px] leading-none">WhatsApp us</span>
            <span className="mt-1.5 block text-sm opacity-80">Fastest reply · <PhoneNumber /></span>
          </span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </WhatsAppLink>

      <a
        href={mailtoLink()}
        className="group flex items-center justify-between gap-4 rounded-[22px] border border-bone/15 p-5 transition-colors hover:border-bone/40 sm:p-6"
      >
        <span className="flex min-w-0 items-center gap-4">
          <Mail className="h-6 w-6 shrink-0 text-champagne" strokeWidth={1.6} />
          <span className="min-w-0">
            <span className="block font-serif text-[28px] leading-none">Email us</span>
            <span className="mt-1.5 block truncate text-sm text-fog">{EMAIL}</span>
          </span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

      <p className="px-1 pt-1 text-sm text-ash">
        Prefer a call?{" "}
        <PhoneLink className="ulink text-fog hover:text-bone" />{" "}
        — we usually reply faster on WhatsApp.
      </p>
    </div>
  );
}
