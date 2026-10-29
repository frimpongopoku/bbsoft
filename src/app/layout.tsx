import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAIL, SITE_URL } from "@/content/contact";
import { SERVICES } from "@/content/services";
import JsonLd from "@/components/JsonLd";

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

const DESCRIPTION =
  "Biibisoft is a software development studio in Accra, Ghana. We design, build and launch websites, web apps, mobile apps and AI systems for companies and first-time founders, and run products of our own.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Biibisoft — Software development studio in Accra, Ghana",
    template: "%s — Biibisoft",
  },
  description: DESCRIPTION,
  applicationName: "Biibisoft",
  keywords: [
    "Biibisoft",
    "software development company Ghana",
    "software company Accra",
    "web development Ghana",
    "website design Accra",
    "software developers for hire",
    "AI integration for businesses",
    "AI consulting Ghana",
    "mobile app development Ghana",
    "app developers Accra",
    "AI development Ghana",
    "MVP development for startups",
    "custom software development",
    "hire developers Ghana",
  ],
  authors: [{ name: "Biibisoft", url: SITE_URL }],
  creator: "Biibisoft",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: "Biibisoft",
    title: "Biibisoft — Ideas, shipped.",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Biibisoft — Ideas, shipped.",
    description: DESCRIPTION,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

// Structured data for search engines. The phone number is deliberately left out.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "Biibisoft",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/biibisoft-mark.svg`,
      image: `${SITE_URL}/opengraph-image`,
      description: DESCRIPTION,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Accra",
        addressRegion: "Greater Accra",
        addressCountry: "GH",
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "Software development",
        "Website development",
        "Web application development",
        "Mobile app development",
        "Custom software development",
        "Artificial intelligence integration",
        "Large language models",
      ],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: EMAIL, availableLanguage: ["English"] },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Biibisoft",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
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
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <Header />
        <main className="grow flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
