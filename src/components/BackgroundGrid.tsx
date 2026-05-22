import React from "react";

export default function BackgroundGrid() {
  return (
    <div 
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" 
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.07) 0%, transparent 50%),
          radial-gradient(circle at 15% 45%, rgba(251, 191, 36, 0.04) 0%, transparent 45%),
          radial-gradient(circle at 50% 80%, rgba(220, 38, 38, 0.03) 0%, transparent 50%)
        `
      }}
    >
      {/* Base Grid Overlay (De-animated to resolve GPU layout/paint lag and achieve 60fps scrolling) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(220,100,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,100,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80"
        style={{
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 40%, #000 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 40%, #000 65%, transparent 100%)"
        }}
      />

      {/* Radial overlay to blend into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
