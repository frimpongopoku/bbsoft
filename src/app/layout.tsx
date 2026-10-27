import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#0b0b0c",
};

export const metadata: Metadata = {
  title: "Biibisoft — Software, considered.",
  description:
    "Biibisoft is a Ghanaian product lab and engineering studio. We design, build and run our own products, and bring the same care to the web, mobile and AI products we build for you.",
  keywords: [
    "Biibisoft",
    "Software Company Ghana",
    "Product Innovation",
    "Web Development Ghana",
    "Mobile App Development",
    "AI Engineering",
    "Custom Software Solutions",
  ],
  authors: [{ name: "Biibisoft" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://biibisoft.com",
    title: "Biibisoft | Product Innovation and Engineering Services",
    description:
      "Ghanaian software company building internal products and delivering engineering services for client teams.",
    siteName: "Biibisoft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biibisoft | Product Innovation and Engineering Services",
    description:
      "Ghanaian software company for innovation-led products and partner engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="grow flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
