import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Us | Biibisoft Engineering Services",
  description:
    "Hire Biibisoft to design and build high-performance web, mobile, and AI products for your organization.",
};

export default function HireUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
