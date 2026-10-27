/** Simple speech-bubble glyph for WhatsApp links (not the trademarked logo). */
export default function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" />
      <path d="M9 9.2c.2 1.9 1.9 4 3.8 4.9.5.2 1 .1 1.3-.3l.5-.6-1.6-1-.7.5c-.8-.4-1.6-1.2-2-2l.5-.7-1-1.6-.6.5c-.3.3-.3.7-.2 1.3z" />
    </svg>
  );
}
