// lucide-react dropped brand/social glyphs a while back, so the handful we
// need (Instagram, LinkedIn, YouTube, X) are small hand-drawn stand-ins
// instead of a second icon-library dependency. Same stroke-icon language as
// the rest of the site (24x24, currentColor, rounded joins).

function base(props) {
  return {
    width: props.size ?? 16,
    height: props.size ?? 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: props.strokeWidth ?? 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: props.className,
  };
}

export function Instagram(props) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedIn(props) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.7 1-2.8 2.6-2.8s2.4 1 2.4 2.8V17" />
    </svg>
  );
}

export function YouTube(props) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.3v5.4l4.8-2.7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function X(props) {
  return (
    <svg {...base(props)}>
      <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" />
      <line x1="19.5" y1="4.5" x2="4.5" y2="19.5" />
    </svg>
  );
}

export const SOCIAL_ICONS = { Instagram, LinkedIn, YouTube, X };
