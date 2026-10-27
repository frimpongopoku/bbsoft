import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire us: web, mobile & AI development",
  description:
    "Hire Biibisoft to design and build your website, web app, mobile app or AI system. For companies and first-time founders alike: get an itemised estimate and PDF quote in minutes.",
  alternates: { canonical: "/hire-us" },
  openGraph: { url: "/hire-us" },
};

export default function HireUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
