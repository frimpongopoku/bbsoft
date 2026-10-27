// Contact channels. WhatsApp and email are the preferred routes; phone is a fallback.

export const EMAIL = "message@biibisoft.com";
export const PHONE_E164 = "+233391142821";
export const PHONE_DISPLAY = "+233 39 114 2821";

const WHATSAPP_NUMBER = PHONE_E164.replace("+", "");

export function whatsappLink(text?: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function mailtoLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${EMAIL}${query ? `?${query}` : ""}`;
}
