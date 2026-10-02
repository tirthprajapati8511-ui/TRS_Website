const STATUS_STYLES = {
  accent: "bg-accent-soft text-accent-dim",
  good: "bg-good-soft text-good",
  neutral: "bg-navy text-on-navy",
};

// A live ("good") status gets a softly pulsing dot, like a status indicator.
export default function StatusPill({ tone, children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        STATUS_STYLES[tone] ?? STATUS_STYLES.neutral
      } ${className}`}
    >
      {tone === "good" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-current animate-ping-slow" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
