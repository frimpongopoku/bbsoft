import React from "react";

export default function BackgroundGrid() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        transform: "translateZ(0)",
        contain: "strict",
        background:
          "radial-gradient(circle at 80% 20%, rgba(201, 169, 110, 0.10) 0%, transparent 55%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(11,11,12,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,11,12,0.035)_1px,transparent_1px)] bg-size-[40px_40px]"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/0 to-background" />
    </div>
  );
}
