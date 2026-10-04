/** Tiny four-point star that gently twinkles. Purely decorative. */
export default function Sparkle({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`animate-twinkle ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 1c.6 5.2 2.8 9.4 11 11-8.2 1.6-10.4 5.8-11 11-.6-5.2-2.8-9.4-11-11C9.2 10.4 11.4 6.2 12 1z"
        fill="currentColor"
      />
    </svg>
  );
}
