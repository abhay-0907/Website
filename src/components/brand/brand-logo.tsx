type BrandEmblemProps = {
  size?: "header" | "footer";
  tone?: "crimson" | "champagne";
};

/** Swap the SVG and wordmark here when the final brewn logo asset is available. */
export function BrandEmblem({ size = "header", tone = "crimson" }: BrandEmblemProps) {
  const dimensions = size === "footer" ? "h-32 w-32 sm:h-36 sm:w-36" : "h-[52px] w-[52px] sm:h-[60px] sm:w-[60px]";

  return (
    <a
      href="#home"
      aria-label="LOGO — home"
      className="inline-flex shrink-0 items-center gap-2.5 rounded-full transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className={`shrink-0 ${dimensions}`}
      >
        <defs>
          {/* Golden ring gradient */}
          <linearGradient id="gold-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C66A" />
            <stop offset="30%" stopColor="#C89B63" />
            <stop offset="50%" stopColor="#F0D5A8" />
            <stop offset="70%" stopColor="#C89B63" />
            <stop offset="100%" stopColor="#A67C4A" />
          </linearGradient>
          {/* Inner golden ring gradient (slightly different for depth) */}
          <linearGradient id="gold-ring-inner" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#C89B63" />
            <stop offset="40%" stopColor="#F0D5A8" />
            <stop offset="60%" stopColor="#C89B63" />
            <stop offset="100%" stopColor="#E8C66A" />
          </linearGradient>
          {/* Crimson background gradient */}
          <radialGradient id="crimson-bg" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#A01215" />
            <stop offset="100%" stopColor="#6B0507" />
          </radialGradient>
          {/* Text gold gradient */}
          <linearGradient id="text-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0D5A8" />
            <stop offset="50%" stopColor="#E8C66A" />
            <stop offset="100%" stopColor="#C89B63" />
          </linearGradient>
          {/* Clip circle for inner content */}
          <clipPath id="inner-clip">
            <circle cx="100" cy="100" r="82" />
          </clipPath>
        </defs>

        {/* Outer golden ring */}
        <circle cx="100" cy="100" r="94" fill="none" stroke="url(#gold-ring)" strokeWidth="4" />
        {/* Inner golden ring */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="url(#gold-ring-inner)" strokeWidth="1.5" />

        {/* Crimson filled background */}
        <circle cx="100" cy="100" r="82" fill="url(#crimson-bg)" />

        {/* Subtle wave texture lines inside circle */}
        <g clipPath="url(#inner-clip)" opacity="0.1" stroke="#F0D5A8" strokeWidth="0.6" fill="none">
          <path d="M18,60 Q60,50 100,65 Q140,80 182,60" />
          <path d="M18,75 Q60,65 100,80 Q140,95 182,75" />
          <path d="M18,90 Q60,80 100,95 Q140,110 182,90" />
          <path d="M18,105 Q60,95 100,110 Q140,125 182,105" />
          <path d="M18,120 Q60,110 100,125 Q140,140 182,120" />
          <path d="M18,135 Q60,125 100,140 Q140,155 182,135" />
          <path d="M18,45 Q60,35 100,50 Q140,65 182,45" />
          <path d="M18,150 Q60,140 100,155 Q140,170 182,150" />
        </g>

        {/* Subtle inner glow */}
        <circle cx="100" cy="90" r="50" fill="#F0D5A8" opacity="0.04" />

        {/* Main text: LOGO */}
        <text
          x="100"
          y="106"
          textAnchor="middle"
          fill="url(#text-gold)"
          fontFamily="var(--font-poppins), 'Segoe UI', sans-serif"
          fontSize="42"
          fontWeight="700"
          letterSpacing="3"
        >
          LOGO
        </text>

        {/* Thin decorative line below text */}
        <line x1="55" y1="118" x2="145" y2="118" stroke="url(#gold-ring)" strokeWidth="0.8" opacity="0.5" />

        {/* Tagline */}
        <text
          x="100"
          y="134"
          textAnchor="middle"
          fill="#F0D5A8"
          fontFamily="var(--font-poppins), 'Segoe UI', sans-serif"
          fontSize="10"
          fontWeight="400"
          letterSpacing="3"
          opacity="0.85"
        >
          DEMO PLACEHOLDER
        </text>
      </svg>

      {size === "header" && (
        <span className="hidden font-ui text-[9px] font-semibold uppercase tracking-[.14em] text-espresso sm:inline sm:text-[10px]">
          Your Brand
        </span>
      )}
    </a>
  );
}
