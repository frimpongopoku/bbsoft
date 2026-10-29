import { ImageResponse } from "next/og";

export const alt = "Biibisoft — Ideas, shipped. Web, mobile & AI product studio in Accra, Ghana.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 15% 85%, #4a3a22 0%, #0B0B0C 55%)",
          color: "#F4F1EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="50" viewBox="6 4 100 96">
            <line x1="16" y1="8" x2="16" y2="92" stroke="#F4F1EB" strokeWidth="11" />
            <circle cx="36" cy="68" r="20" fill="none" stroke="#F4F1EB" strokeWidth="11" />
            <circle cx="76" cy="68" r="20" fill="none" stroke="#F4F1EB" strokeWidth="11" />
            <line x1="56" y1="8" x2="56" y2="92" stroke="#C9A96E" strokeWidth="11" />
          </svg>
          <span style={{ fontSize: 40, letterSpacing: -1 }}>Biibisoft</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 120, lineHeight: 0.95, letterSpacing: -6 }}>Ideas,</span>
          <span style={{ fontSize: 120, lineHeight: 0.95, letterSpacing: -4, color: "#C9A96E", fontStyle: "italic" }}>
            shipped.
          </span>
        </div>
        <span style={{ fontSize: 26, color: "#A9A49B", letterSpacing: 2, textTransform: "uppercase" }}>
          Web · Mobile · AI — Accra, Ghana
        </span>
      </div>
    ),
    { ...size },
  );
}
