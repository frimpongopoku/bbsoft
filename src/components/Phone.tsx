"use client";

import { useSyncExternalStore, type ComponentProps } from "react";
import { PHONE_MASK, revealPhone, whatsappLink, type Phone } from "@/content/contact";

let cached: Phone | null = null;
const getPhone = () => (cached ??= revealPhone());
const subscribe = () => () => {};

/** The phone number, or null on the server and during hydration — so it never lands in the HTML. */
export function usePhone() {
  return useSyncExternalStore(subscribe, getPhone, () => null);
}

type LinkProps = Omit<ComponentProps<"a">, "href" | "target" | "rel">;

/** WhatsApp chat link. Until the number is revealed it points at the contact section instead. */
export function WhatsAppLink({ text, ...props }: LinkProps & { text?: string }) {
  const phone = usePhone();
  return phone ? (
    <a {...props} href={whatsappLink(text)} target="_blank" rel="noopener noreferrer nofollow" />
  ) : (
    <a {...props} href="/hire-us#contact" rel="nofollow" />
  );
}

export function PhoneNumber() {
  return <>{usePhone()?.display ?? PHONE_MASK}</>;
}

export function PhoneLink(props: LinkProps) {
  const phone = usePhone();
  return (
    <a {...props} href={phone ? `tel:${phone.e164}` : "/hire-us#contact"} rel="nofollow">
      {phone?.display ?? PHONE_MASK}
    </a>
  );
}
