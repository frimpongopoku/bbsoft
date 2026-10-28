import { Plus } from "lucide-react";

export default function FaqList({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  return (
    <div className="border-t border-obsidian/15">
      {faqs.map((f) => (
        <details key={f.q} className="group border-b border-obsidian/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[19px] font-medium leading-snug">{f.q}</h3>
            <Plus className="mt-1 h-5 w-5 shrink-0 text-brass transition-transform group-open:rotate-45" />
          </summary>
          <p className="-mt-1 max-w-[720px] pb-7 text-[17px] leading-relaxed text-taupe">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
