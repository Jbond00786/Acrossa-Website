const AcrossaLogoEmblem = ({ className = 'w-14 md:w-16 h-14 md:h-16', dark = false }) => (
  <svg
    viewBox="0 0 100 82"
    className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bold Top Apex / Chevron Peak */}
    <path
      d="M29 41 L45 18 L55 18 L71 41 L59 41 L50 28 L41 41 Z"
      fill={dark ? '#FFF2DF' : '#262D35'}
    />

    {/* Bold Sage Green Diagonal Bar & Node + Left Loop */}
    <path
      d="M24 49 C15 49 9 55 9 62 C9 69 15 74 24 74 C34 74 42 65 51 52 L75 25"
      stroke="#788B7B"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="79" cy="21" r="7" fill="#788B7B" />

    {/* Left Loop Arch */}
    <path d="M24 49 C32 49 39 55 45 62" stroke="#788B7B" strokeWidth="9" strokeLinecap="round" />

    {/* Bold Warm Terracotta / Copper Right Loop */}
    <path
      d="M48 53 C54 62 61 74 71 74 C79 74 85 69 85 62 C85 53 79 49 71 49 C65 49 59 52 53 58"
      stroke="#BA7C4D"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AcrossaLogoEmblem;
