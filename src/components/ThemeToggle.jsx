import { Sun, Moon } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

const OPTIONS = [
  { key: "light", label: "Light theme", Icon: Sun },
  { key: "dark", label: "Dark theme", Icon: Moon },
];

/**
 * Two-way light/dark switch. Highlights the resolved theme (so it reads
 * correctly even before a user has made an explicit choice) and clicking
 * either option sets it explicitly from then on.
 */
export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-bg-muted p-0.5 ${className}`}
    >
      {OPTIONS.map(({ key, label, Icon }) => {
        const active = resolvedTheme === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(key)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
              active
                ? "bg-accent text-on-accent"
                : "text-ink-faint hover:text-ink hover:bg-bg-elevated"
            }`}
          >
            {/* Status-indicator pulse on the active option — a small "powered
                on" read-out rather than a decorative glow. */}
            {active && (
              <span className="absolute inset-0 rounded-full bg-accent animate-ping-slow" />
            )}
            <Icon
              size={15}
              strokeWidth={2.25}
              className={`relative transition-transform duration-500 ${active ? "rotate-[360deg]" : ""}`}
            />
          </button>
        );
      })}
    </div>
  );
}
