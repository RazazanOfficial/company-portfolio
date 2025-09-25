"use client";

export default function HeroBackground({
  heightClass = "h-[820px] sm:h-[900px] md:h-[960px]",
  showGrid = true,
}) {
  return (
    <div>
      <div
        className={`absolute inset-x-0 top-[-100px] ${heightClass} z-0 pointer-events-none`}
        aria-hidden="true"
      >
        {showGrid && <div className="absolute inset-0 bg-grid opacity-60" />}
        <div className="absolute inset-0 hero-glow" />
      </div>
      <TopHalfCircle />
    </div>
  );
}

function TopHalfCircle() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[40vw] w-[183vw] max-w-none scale-y-[-2]"
      viewBox="0 0 1440 810"
      fill="none"
      aria-hidden="true"
      id="hero-arc-svg"
    >
      <defs>
        <radialGradient
          id="heroFill"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(720 810) rotate(180) scale(930 620)"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.06" />
          <stop offset="0.65" stopColor="white" stopOpacity="0.03" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* خط مرزی آرچ */}
      <path
        id="hero-arc-path"
        d="M0 810 A810 810 0 0 1 1440 810"
        stroke="rgba(255,255,255,.16)"
        strokeWidth="0.6"
      />
      {/* پرکردن داخل نیم‌دایره */}
      <path
        d="M0 810 A810 810 0 0 1 1440 810 L1440 0 L0 0 Z"
        fill="url(#heroFill)"
      />
    </svg>
  );
}
