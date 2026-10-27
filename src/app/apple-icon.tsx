import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0C",
        }}
      >
        <svg width="104" height="100" viewBox="6 4 100 96">
          <line x1="16" y1="8" x2="16" y2="92" stroke="#F4F1EB" strokeWidth="12" />
          <circle cx="36" cy="68" r="20" fill="none" stroke="#F4F1EB" strokeWidth="12" />
          <circle cx="76" cy="68" r="20" fill="none" stroke="#F4F1EB" strokeWidth="12" />
          <line x1="56" y1="8" x2="56" y2="92" stroke="#C9A96E" strokeWidth="12" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
