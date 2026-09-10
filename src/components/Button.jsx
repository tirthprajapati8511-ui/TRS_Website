import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-all duration-200 whitespace-nowrap active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// The arrow nudges forward on hover — a small "engaged" cue, not a bounce.
const arrowCls = "transition-transform duration-200 group-hover/btn:translate-x-0.5";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-2 text-[13px]",
};

const variants = {
  // Solid TRS blue — the one strong CTA action on a given screen.
  primary: "bg-accent text-on-accent hover:bg-accent-dim",
  // Bordered, neutral — secondary action on a light/panel background.
  outline: "border border-line-strong text-ink hover:border-accent hover:text-accent bg-transparent",
  // Bordered white — secondary action sitting on the hero photograph.
  onImage: "border border-white/70 text-white hover:bg-white hover:text-navy bg-transparent",
  // Text-only.
  link: "text-accent hover:text-accent-dim px-0 py-0 underline-offset-4 hover:underline",
};

// Internal paths ("/join", "#contact") go through react-router's Link so
// navigation doesn't trigger a full page reload; anything else (an absolute
// URL, a mailto:, a not-yet-known href) stays a plain anchor.
function isInternalPath(href) {
  return typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));
}

export default function Button({
  as,
  href = "#",
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (as === "button") {
    return (
      <button className={classes} {...props}>
        {children}
        {icon && <ArrowRight size={15} strokeWidth={2.25} className={arrowCls} />}
      </button>
    );
  }

  if (!as && isInternalPath(href) && !href.startsWith("#")) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
        {icon && <ArrowRight size={15} strokeWidth={2.25} className={arrowCls} />}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
      {icon && <ArrowRight size={15} strokeWidth={2.25} className={arrowCls} />}
    </a>
  );
}
