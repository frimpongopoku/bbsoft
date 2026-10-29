/**
 * QuotePDF.tsx
 * Biibisoft Project Quote — redesigned per biibisoft-quote-redesign-spec.md
 *
 * Design principles:
 *  - Obsidian (#0B0B0C) is the primary brand expression, on a bone/white page
 *  - Champagne (#C9A96E) is the accent on dark surfaces; brass (#7A5C26) on light ones
 *  - Instrument Serif (the website's display face) for display text, Inter for everything else.
 *    Its lining figures keep prices even; Playfair's old-style figures bounced.
 *  - GHS used instead of ₵ (Helvetica subset cannot render it)
 *  - No emoji / Unicode glyph icons for app stores
 *  - No accent backgrounds, no pill badges on tech stack, no empty states
 */

import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Svg, Line, Circle } from "@react-pdf/renderer";
import { EMAIL, revealPhone } from "@/content/contact";

// ─── Font registration ────────────────────────────────────────────────────────
// Fonts are served from /public/fonts/ — bundled at build time, no network dependency.
// Using WOFF format (universally supported by @react-pdf/renderer across all versions).
Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/inter-latin-400-normal.woff", fontWeight: 400 },
    { src: "/fonts/inter-latin-500-normal.woff", fontWeight: 500 },
    { src: "/fonts/inter-latin-600-normal.woff", fontWeight: 600 },
    { src: "/fonts/inter-latin-700-normal.woff", fontWeight: 700 },
  ],
});

Font.register({
  family: "Serif",
  fonts: [
    { src: "/fonts/instrument-serif-latin-400-normal.woff", fontWeight: 400 },
    { src: "/fonts/instrument-serif-latin-400-italic.woff", fontWeight: 400, fontStyle: "italic" },
  ],
});

// Never break words with hyphens ("Web Applica-tion"); wrap whole words instead.
Font.registerHyphenationCallback((word) => [word]);

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  obsidian:    "#0B0B0C",
  graphite:    "#1E1C19",
  umber:       "#2A2825",
  ash:         "#8C877E",
  champagne:   "#C9A96E",
  brass:       "#7A5C26",
  white:       "#FFFFFF",
  offWhite:    "#F4F1EB",
  border:      "#E6E0D4",
  borderLight: "#EFEBE3",
  textPrimary: "#0B0B0C",
  textSecond:  "#6E6A63",
  textLabel:   "#8C877E",
  textBody:    "#55514A",
};

// ─── Stylesheet ───────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontWeight: 400,
    backgroundColor: C.white,
    paddingBottom: 52,
  },

  brandInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  // ── Header (obsidian, page 1 only) ─────────────────────────────────────────────
  header: {
    backgroundColor: C.obsidian,
    paddingHorizontal: 36,
    paddingTop: 26,
    paddingBottom: 22,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  headerLeft: {
    flex: 1,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 14,
  },
  brandName: {
    fontFamily: "Serif",
    fontWeight: 400,
    fontSize: 20,
    color: C.white,
  },
  brandTagline: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 8,
    color: C.ash,
    letterSpacing: 0.8,
    marginTop: 2,
  },
  quoteTitle: {
    fontFamily: "Serif",
    fontWeight: 400,
    fontSize: 30,
    color: C.white,
    marginBottom: 8,
    lineHeight: 1,
  },
  quoteSubtitle: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 8,
    color: C.ash,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 14,
  },
  priceAmount: {
    fontFamily: "Serif",
    fontWeight: 400,
    fontSize: 52,
    color: C.champagne,
    lineHeight: 1,
  },
  priceCurrencyLabel: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 12,
    color: C.ash,
    marginBottom: 0,
  },
  priceDivider: {
    width: 1,
    height: 24,
    backgroundColor: C.umber,
    marginBottom: 2,
    marginHorizontal: 2,
  },
  priceGHS: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 11,
    color: C.ash,
    marginBottom: 0,
  },

  // ── Summary card (right column of header) ─────────────────────────────────
  summaryCard: {
    width: 210,
    backgroundColor: C.graphite,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: C.umber,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  summaryRowDivider: {
    height: 0.5,
    backgroundColor: C.umber,
  },
  summaryLabel: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 8,
    color: C.ash,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    flex: 0.7,
  },
  summaryValue: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 11,
    color: C.white,
    textAlign: "right",
    flex: 1.5,
  },
  summaryValueAccent: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 11,
    color: C.champagne,
    textAlign: "right",
    flex: 1.5,
  },

  // ── Meta bar ──────────────────────────────────────────────────────────────
  metaBar: {
    backgroundColor: C.offWhite,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    paddingHorizontal: 36,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 8,
    color: C.textLabel,
    letterSpacing: 0.4,
  },
  metaValue: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 8,
    color: C.textPrimary,
  },

  // ── Page 2 running header ─────────────────────────────────────────────────
  runningHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    paddingHorizontal: 36,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: C.white,
  },
  runningHeaderBrand: {
    fontFamily: "Serif",
    fontWeight: 400,
    fontSize: 12,
    color: C.obsidian,
  },
  runningHeaderRight: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 8,
    color: C.textLabel,
  },

  // ── Body ──────────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 36,
    paddingTop: 16,
  },

  eyebrow: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
    color: C.textLabel,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  // ── Project Configuration card ────────────────────────────────────────────
  card: {
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: C.white,
  },
  cardHeader: {
    backgroundColor: C.offWhite,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  cardHeaderText: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
    color: C.textPrimary,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  cardBody: {
    paddingHorizontal: 14,
    paddingBottom: 2,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: C.borderLight,
  },
  tableRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableLabel: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 11,
    color: C.textSecond,
    flex: 1,
  },
  tableValue: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 11,
    color: C.textPrimary,
    textAlign: "right",
    flex: 1.4,
  },
  tableValueAccent: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 11,
    color: C.brass,
    textAlign: "right",
    flex: 1.4,
  },

  // ── Features (chip grid, if modules selected) ─────────────────────────────
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
  },
  chip: {
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: C.offWhite,
  },
  chipText: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 9,
    color: C.textSecond,
  },

  pairRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  pairCell: {
    flex: 1,
    marginBottom: 0,
  },

  // ── Tech Stack block — clean label + value, no pill ───────────────────────
  stackBlock: {
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: C.white,
  },
  stackEyebrow: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
    color: C.textLabel,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  stackValue: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 13,
    color: C.textPrimary,
    letterSpacing: 0.1,
  },

  // ── Total Estimate block — brass left border, no border-radius ───────────
  totalBlock: {
    borderLeftWidth: 3,
    borderLeftColor: C.brass,
    backgroundColor: C.offWhite,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalEyebrow: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
    color: C.textLabel,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  totalAmount: {
    fontFamily: "Serif",
    fontWeight: 400,
    fontSize: 30,
    color: C.textPrimary,
    textAlign: "right",
    lineHeight: 1,
  },
  totalCurrency: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 11,
    color: C.textLabel,
  },
  totalGHS: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 9,
    color: C.textLabel,
    textAlign: "right",
    marginTop: 5,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: C.border,
    paddingHorizontal: 36,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: C.white,
  },
  footerBrand: {
    fontFamily: "Serif",
    fontWeight: 400,
    fontSize: 11,
    color: C.obsidian,
    marginBottom: 1,
  },
  footerTagline: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 7,
    color: C.textLabel,
  },
  footerRight: {
    alignItems: "flex-end",
  },
  footerEmail: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 8,
    color: C.textSecond,
    marginBottom: 1,
  },
  footerRef: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 7,
    color: C.textLabel,
  },

  // ── Page 2: Section title with brass underline ───────────────────────────
  p2SectionTitle: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: 700,
    color: C.textPrimary,
    letterSpacing: 0.3,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: C.brass,
    paddingBottom: 4,
    alignSelf: "flex-start",
  },

  // ── Store cards ───────────────────────────────────────────────────────────
  storeGrid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  storeCard: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    padding: 14,
    backgroundColor: C.white,
  },
  storeCardTitle: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 10,
    color: C.textPrimary,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    marginBottom: 7,
  },
  storeSubLabel: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 8,
    color: C.brass,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 3,
    marginTop: 6,
  },
  storeSubLabelFirst: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 8,
    color: C.brass,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  storeBody: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 11,
    color: C.textBody,
    lineHeight: 1.6,
    marginBottom: 1,
  },

  // ── Deploy option card ────────────────────────────────────────────────────
  deployCard: {
    backgroundColor: C.offWhite,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },
  deployCardSelected: {
    backgroundColor: C.offWhite,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },
  deployCardTitle: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 12,
    color: C.textPrimary,
    marginBottom: 5,
  },
  deployCardBody: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 11,
    color: C.textBody,
    lineHeight: 1.6,
  },
  deployCardFee: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 10,
    color: C.textSecond,
    marginTop: 6,
  },
});

// ─── Props ────────────────────────────────────────────────────────────────────
export interface QuotePDFProps {
  projectType: string;
  projectTypeId: string;
  /** Set when the client already started the project; null for a fresh build. */
  startingPoint: string | null;
  codeCheckUSD: number;
  rescueFixed: string[];
  techStack: string;
  designTier: string;
  deliveryPace: string;
  paceMultiplier: number;
  selectedFeatures: string[];
  totalCostUSD: number;
  totalWeeks: number;
  mobileDeployOption: "own-brand" | "biibisoft-umbrella" | null;
  generatedAt: string;
  refNumber: string;
}

const USD_TO_GHS = 14.8;

const FEATURE_LABELS: Record<string, string> = {
  auth:     "User Accounts",
  payments: "Payments",
  admin:    "Admin Dashboard",
  ai:       "AI Features",
  realtime: "Real-time Updates",
  push:     "Push Notifications",
};

// ─── Brand mark (Shared Stem) ─────────────────────────────────────────────────
function BrandMark({ size, color }: { size: number; color: string }) {
  return (
    <Svg viewBox="6 4 100 96" width={size * (100 / 96)} height={size}>
      <Line x1={16} y1={8} x2={16} y2={92} stroke={color} strokeWidth={11} />
      <Circle cx={36} cy={68} r={20} fill="none" stroke={color} strokeWidth={11} />
      <Circle cx={76} cy={68} r={20} fill="none" stroke={color} strokeWidth={11} />
      <Line x1={56} y1={8} x2={56} y2={92} stroke={C.champagne} strokeWidth={11} />
    </Svg>
  );
}

// ─── Shared footer ────────────────────────────────────────────────────────────
function DocFooter({ refNumber }: { refNumber: string }) {
  return (
    <View style={s.footer} fixed>
      <View>
        <View style={s.brandInline}>
          <BrandMark size={10} color={C.obsidian} />
          <Text style={s.footerBrand}>Biibisoft</Text>
        </View>
        <Text style={s.footerTagline}>Delivery-Focused Engineering · Accra, Ghana</Text>
      </View>
      <View style={s.footerRight}>
        <Text style={s.footerEmail}>{EMAIL} · WhatsApp {revealPhone().display}</Text>
        <Text style={s.footerRef}>
          {refNumber} · Valid 30 days · Final quote may vary by requirement
        </Text>
      </View>
    </View>
  );
}

// ─── Running header (page 2+) ─────────────────────────────────────────────────
function RunningHeader({ refNumber }: { refNumber: string }) {
  return (
    <View style={s.runningHeader} fixed>
      <View style={s.brandInline}>
        <BrandMark size={11} color={C.obsidian} />
        <Text style={s.runningHeaderBrand}>Biibisoft</Text>
      </View>
      <Text
        style={s.runningHeaderRight}
        render={({ pageNumber, totalPages }) =>
          `Ref: ${refNumber}  ·  Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
}

// ─── Main PDF component ───────────────────────────────────────────────────────
export default function QuotePDF({
  projectType,
  projectTypeId,
  startingPoint,
  codeCheckUSD,
  rescueFixed,
  techStack,
  designTier,
  deliveryPace,
  paceMultiplier,
  selectedFeatures,
  totalCostUSD,
  totalWeeks,
  mobileDeployOption,
  generatedAt,
  refNumber,
}: QuotePDFProps) {
  const isMobile   = projectTypeId === "mobileapp";
  const deployFee  = mobileDeployOption === "biibisoft-umbrella" ? 50 : 0;
  const grand      = totalCostUSD + deployFee;
  const grandGHS   = Math.round(grand * USD_TO_GHS).toLocaleString();

  const hasFeatures = selectedFeatures.length > 0;

  const deployTitle =
    mobileDeployOption === "biibisoft-umbrella"
      ? "Option B — Biibisoft Umbrella (Managed Publishing)"
      : mobileDeployOption === "own-brand"
      ? "Option A — Own Brand (Self-Hosted Accounts)"
      : null;

  const deployDesc =
    mobileDeployOption === "biibisoft-umbrella"
      ? "Your app is published under the Biibisoft developer namespace. No Apple or Google accounts are required from you. Biibisoft manages all submissions, certificates, and store listings end-to-end."
      : mobileDeployOption === "own-brand"
      ? "Your app is published under your own company accounts. You register and own the Apple Developer Program ($99/yr) and Google Play Console ($25 one-time) accounts. Biibisoft handles all technical submission work on your behalf."
      : null;

  return (
    <Document
      title={`Biibisoft Project Quote — ${refNumber}`}
      author="Biibisoft Engineering"
      subject="Custom Software Development Estimate"
      keywords="quote, estimate, software, biibisoft"
    >
      {/* ═════════════════════════════ PAGE 1 ═════════════════════════════ */}
      <Page size="A4" style={s.page}>
        {/* ── Obsidian header ───────────────────────────────────────────────── */}
        <View style={s.header}>
          {/* Left: branding + title + price */}
          <View style={s.headerLeft}>
            <View style={s.brandRow}>
              <BrandMark size={22} color={C.white} />
              <View>
                <Text style={s.brandName}>Biibisoft</Text>
                <Text style={s.brandTagline}>ENGINEERING SERVICES · ACCRA, GHANA</Text>
              </View>
            </View>

            <Text style={s.quoteTitle}>Project Quote{"\n"}Estimate</Text>
            <Text style={s.quoteSubtitle}>Custom Software Development</Text>

            <View style={s.priceRow}>
              <Text style={s.priceAmount}>${grand.toLocaleString()}</Text>
              <Text style={s.priceCurrencyLabel}>USD</Text>
              <View style={s.priceDivider} />
              <Text style={s.priceGHS}>GHS {grandGHS}</Text>
            </View>
          </View>

          {/* Right: summary card — graphite card receding inside the header */}
          <View style={s.summaryCard}>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Project</Text>
              <Text style={s.summaryValue}>{projectType}</Text>
            </View>
            <View style={s.summaryRowDivider} />
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Design</Text>
              <Text style={s.summaryValue}>{designTier}</Text>
            </View>
            <View style={s.summaryRowDivider} />
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Timeline</Text>
              {/* Orange accent for Timeline */}
              <Text style={s.summaryValueAccent}>{totalWeeks} weeks</Text>
            </View>
            <View style={s.summaryRowDivider} />
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Pace</Text>
              <Text style={s.summaryValue}>{deliveryPace}</Text>
            </View>
            {hasFeatures && (
              <>
                <View style={s.summaryRowDivider} />
                <View style={s.summaryRow}>
                  <Text style={s.summaryLabel}>Modules</Text>
                  <Text style={s.summaryValue}>{selectedFeatures.length} selected</Text>
                </View>
              </>
            )}
            <View style={s.summaryRowDivider} />
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Ref</Text>
              {/* Orange accent for Ref */}
              <Text style={s.summaryValueAccent}>{refNumber}</Text>
            </View>
          </View>
        </View>

        {/* ── Meta bar ──────────────────────────────────────────────────── */}
        <View style={s.metaBar}>
          <Text style={s.metaLabel}>
            Generated{" "}
            <Text style={s.metaValue}>{generatedAt}</Text>
          </Text>
          <Text style={s.metaLabel}>
            Reference{" "}
            <Text style={s.metaValue}>{refNumber}</Text>
          </Text>
          <Text style={s.metaLabel}>
            Valid{" "}
            <Text style={s.metaValue}>30 days from issue</Text>
          </Text>
        </View>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <View style={s.body}>
          {/* Eyebrow */}
          <Text style={s.eyebrow}>Quote Breakdown</Text>

          {/* Project configuration */}
          <View style={s.card} wrap={false}>
            <View style={s.cardHeader}>
              <Text style={s.cardHeaderText}>Project Configuration</Text>
            </View>
            <View style={s.cardBody}>
              <View style={s.tableRow}>
                <Text style={s.tableLabel}>Project Type</Text>
                <Text style={s.tableValue}>{projectType}</Text>
              </View>
              {startingPoint && (
                <>
                  <View style={s.tableRow}>
                    <Text style={s.tableLabel}>Starting Point</Text>
                    <Text style={s.tableValue}>{startingPoint}</Text>
                  </View>
                  <View style={s.tableRow}>
                    <Text style={s.tableLabel}>Code Check (credited)</Text>
                    <Text style={s.tableValueAccent}>${codeCheckUSD}</Text>
                  </View>
                  {rescueFixed.map((label) => (
                    <View key={label} style={s.tableRow}>
                      <Text style={s.tableLabel}>Included</Text>
                      <Text style={s.tableValue}>{label}</Text>
                    </View>
                  ))}
                </>
              )}
              <View style={s.tableRow}>
                <Text style={s.tableLabel}>Design Tier</Text>
                <Text style={s.tableValue}>{designTier}</Text>
              </View>
              <View style={s.tableRow}>
                <Text style={s.tableLabel}>Delivery Pace</Text>
                <Text style={s.tableValue}>{deliveryPace}</Text>
              </View>
              <View style={s.tableRow}>
                <Text style={s.tableLabel}>Pace Multiplier</Text>
                <Text style={s.tableValueAccent}>{paceMultiplier}x</Text>
              </View>
              <View
                style={
                  isMobile && deployTitle ? s.tableRow : s.tableRowLast
                }
              >
                <Text style={s.tableLabel}>Estimated Timeline</Text>
                <Text style={s.tableValueAccent}>{totalWeeks} weeks</Text>
              </View>
              {/* App store publishing row — only if mobile + option selected */}
              {isMobile && deployTitle && (
                <View style={s.tableRowLast}>
                  <Text style={s.tableLabel}>App Store Publishing</Text>
                  <Text style={s.tableValue}>
                    {mobileDeployOption === "biibisoft-umbrella"
                      ? "Biibisoft Umbrella"
                      : "Own Brand"}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Modules and tech stack side by side, so the total always fits on page 1 */}
          <View style={s.pairRow} wrap={false}>
            {hasFeatures && (
              <View style={[s.card, s.pairCell]}>
                <View style={s.cardHeader}>
                  <Text style={s.cardHeaderText}>
                    Functional Modules  ({selectedFeatures.length})
                  </Text>
                </View>
                <View style={s.chipGrid}>
                  {selectedFeatures.map((f) => (
                    <View key={f} style={s.chip}>
                      <Text style={s.chipText}>{FEATURE_LABELS[f] ?? f}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Tech stack — clean label + value, no pill/badge */}
            <View style={[s.stackBlock, s.pairCell]}>
              <Text style={s.stackEyebrow}>Recommended Technology Stack</Text>
              <Text style={s.stackValue}>{techStack}</Text>
            </View>
          </View>

          {/* Total Estimate — brass left border, no border-radius */}
          <View style={s.totalBlock} wrap={false}>
            <Text style={s.totalEyebrow}>Total Estimate</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={s.totalAmount}>
                ${grand.toLocaleString()} <Text style={s.totalCurrency}>USD</Text>
              </Text>
              <Text style={s.totalGHS}>approx. GHS {grandGHS}</Text>
            </View>
          </View>

        </View>

        {/* Footer — fixed, all pages */}
        <DocFooter refNumber={refNumber} />
      </Page>

      {/* ═════════════════════════════ PAGE 2 ═════════════════════════════ */}
      {/* Only rendered when project type is Mobile App */}
      {isMobile && (
        <Page size="A4" style={s.page}>
          {/* Minimal running header */}
          <RunningHeader refNumber={refNumber} />

          <View style={s.body}>
            {/* Section title with tight brass underline */}
            <Text style={s.p2SectionTitle}>Platform Review Overview</Text>

            {/* Store cards — 2-column grid */}
            <View style={s.storeGrid}>
              {/* Apple App Store */}
              <View style={s.storeCard}>
                <Text style={s.storeCardTitle}>Apple App Store</Text>

                <Text style={s.storeSubLabelFirst}>Review Time</Text>
                <Text style={s.storeBody}>1–3 business days (avg. 24–48 hrs)</Text>

                <Text style={s.storeSubLabel}>Account Cost</Text>
                <Text style={s.storeBody}>$99 / year — Apple Developer Program</Text>

                <Text style={s.storeSubLabel}>Key Requirements</Text>
                <Text style={s.storeBody}>• Bundle ID (unique reverse-domain format)</Text>
                <Text style={s.storeBody}>• Screenshots — 6.5″ iPhone + 5.5″ legacy + iPad</Text>
                <Text style={s.storeBody}>• Privacy Policy URL (mandatory for all apps)</Text>
                <Text style={s.storeBody}>• Privacy Manifest file (required since 2024)</Text>
                <Text style={s.storeBody}>• App icon — 1024×1024 px, no transparency</Text>
                <Text style={s.storeBody}>• Age rating questionnaire + category selection</Text>
                <Text style={s.storeBody}>• App must not crash on any review device</Text>

                <Text style={s.storeSubLabel}>Approval Notes</Text>
                <Text style={s.storeBody}>
                  Apple reviews are thorough. A first-submission rejection is common
                  and expected — Biibisoft handles resubmission at no additional cost.
                </Text>
              </View>

              {/* Google Play Store */}
              <View style={s.storeCard}>
                <Text style={s.storeCardTitle}>Google Play Store</Text>

                <Text style={s.storeSubLabelFirst}>Review Time</Text>
                <Text style={s.storeBody}>1–3 days (avg. ~2 hrs for simple apps)</Text>

                <Text style={s.storeSubLabel}>Account Cost</Text>
                <Text style={s.storeBody}>$25 one-time — Google Play Console</Text>

                <Text style={s.storeSubLabel}>Key Requirements</Text>
                <Text style={s.storeBody}>• Package name — cannot be changed after publish</Text>
                <Text style={s.storeBody}>• App icon — 512×512 px</Text>
                <Text style={s.storeBody}>• Feature graphic — 1024×500 px</Text>
                <Text style={s.storeBody}>• Screenshots — phone, 7″ tablet, 10″ tablet</Text>
                <Text style={s.storeBody}>• Privacy Policy URL</Text>
                <Text style={s.storeBody}>• Data Safety form (collection & sharing)</Text>
                <Text style={s.storeBody}>• Signed Android App Bundle (AAB)</Text>
                <Text style={s.storeBody}>• Target API level per Google’s annual minimum</Text>

                <Text style={s.storeSubLabel}>Approval Notes</Text>
                <Text style={s.storeBody}>
                  Google Play is generally faster. Annual API-level upgrades are
                  required — Biibisoft keeps your app compliant year over year.
                </Text>
              </View>
            </View>

            {/* Publishing option — only shown when user made a selection */}
            {deployTitle && deployDesc && (
              <>
                <Text style={[s.eyebrow, { marginTop: 4 }]}>
                  Selected Publishing Option
                </Text>
                <View style={s.deployCard} wrap={false}>
                  <Text style={s.deployCardTitle}>{deployTitle}</Text>
                  <Text style={s.deployCardBody}>{deployDesc}</Text>
                  {mobileDeployOption === "biibisoft-umbrella" && (
                    <Text style={s.deployCardFee}>
                      Deployment Fee: $50 for the first app · $10 per additional app
                    </Text>
                  )}
                </View>
              </>
            )}
          </View>

          <DocFooter refNumber={refNumber} />
        </Page>
      )}
    </Document>
  );
}
