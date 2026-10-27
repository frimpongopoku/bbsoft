// Contact channels. WhatsApp and email are the preferred routes; phone is a fallback.

export const SITE_URL = "https://biibisoft.com";
export const EMAIL = "message@biibisoft.com";

// The phone number never appears as plain text in the HTML or the JS bundle. It is stored
// scrambled (digits reversed, then split) and only assembled in the browser after the page
// loads — see components/Phone.tsx — so scrapers reading the page source can't harvest it.
const PHONE_SCRAMBLED = ["1282", "4119", "3332"];

/** Shown in place of the number before the browser reveals it (and to non-JS crawlers). */
export const PHONE_MASK = "+233 ·· ··· ····";

export type Phone = { e164: string; display: string };

export function revealPhone(): Phone {
  const d = PHONE_SCRAMBLED.join("").split("").reverse().join("");
  return {
    e164: `+${d}`,
    display: `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`,
  };
}

/** Only call this in the browser (event handlers, or after mount) — never during render on the server. */
export function whatsappLink(text?: string) {
  const number = revealPhone().e164.slice(1);
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function mailtoLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${EMAIL}${query ? `?${query}` : ""}`;
}
