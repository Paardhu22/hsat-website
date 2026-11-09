import { Link } from "react-router";

export function Icon({ name = "arrow", className = "", ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    northeast: (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    down: (
      <>
        <path d="M12 5v14m-6-6 6 6 6-6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3a14 14 0 0 0 6 6l3-3 5 3c-1 5-5 5-9 3A20 20 0 0 1 4 12C2 8 2 4 7 3Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    rotate: (
      <>
        <path d="M20 11a8 8 0 1 0-2 7M20 4v7h-7" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </>
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

export function Brand({ compact = false }) {
  return (
    <Link
      to="/"
      className={`brand${compact ? " brand-compact" : ""}`}
      aria-label="H SAT Edu Solutions home"
    >
      <img
        className="brand-logo"
        src="/logo.png?v=original"
        alt="H SAT Edu Solutions"
        width="797"
        height="313"
        fetchPriority={compact ? "auto" : "high"}
      />
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  light = false,
  className = "",
  ...props
}) {
  return (
    <Link
      to={to}
      className={`button ${light ? "button-light" : ""} ${className}`}
      {...props}
    >
      <span>{children}</span>
      <Icon name="northeast" />
    </Link>
  );
}

export function Shape({ type = "sun", className = "" }) {
  return (
    <svg
      className={`shape ${className}`}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      {type === "sun" && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x="45"
              y="2"
              width="10"
              height="96"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="31" />
        </>
      )}
      {type === "steps" && <path d="M4 96V65h30V35h31V4h31v92Z" />}
      {type === "flower" && (
        <>
          <ellipse
            cx="50"
            cy="50"
            rx="22"
            ry="49"
            transform="rotate(45 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="22"
            ry="49"
            transform="rotate(-45 50 50)"
          />
        </>
      )}
      {type === "arch" && (
        <path d="M5 96V49a45 45 0 0 1 90 0v47H70V49a20 20 0 0 0-40 0v47Z" />
      )}
    </svg>
  );
}

export { FoundationArt, SwissPoster } from "./Artwork.jsx";
