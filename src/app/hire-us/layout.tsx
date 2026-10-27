import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire us — Biibisoft",
  description:
    "Hire Biibisoft to design and build web, mobile and AI products. See an itemised estimate, download a PDF quote, and reach us on WhatsApp or email.",
};

export default function HireUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
