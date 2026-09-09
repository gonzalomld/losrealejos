/**
 * Horizonte de Los Realejos. Diseño propio, decorativo.
 * Tres capas: ladera y Teide (fondo), pueblo con dos campanarios (media),
 * costa y roques (delantera). En móvil se muestra solo la capa media.
 */
export function HorizonteRealejos() {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="block h-28 w-full sm:h-40"
    >
      {/* Capa trasera: ladera y perfil del Teide */}
      <g className="hidden sm:block">
        <path d="M0 120 L520 120 L660 30 L730 30 L880 120 L1440 120 L1440 220 L0 220 Z" fill="#9db3ad" />
        <path d="M660 30 L730 30 L705 8 L685 8 Z" fill="#7d968f" />
      </g>
      {/* Capa media: pueblo, dos campanarios, casas de teja y palmeras */}
      <g>
        <rect x="0" y="140" width="1440" height="80" fill="#b9a98c" />
        <g fill="#f4f1ea">
          <rect x="120" y="120" width="80" height="60" />
          <rect x="300" y="110" width="70" height="70" />
          <rect x="560" y="115" width="90" height="65" />
          <rect x="900" y="110" width="80" height="70" />
          <rect x="1150" y="120" width="90" height="60" />
        </g>
        <g fill="#8a4f2e">
          <path d="M120 120 L160 100 L200 120 Z" />
          <path d="M300 110 L335 92 L370 110 Z" />
          <path d="M560 115 L605 95 L650 115 Z" />
          <path d="M900 110 L940 92 L980 110 Z" />
          <path d="M1150 120 L1195 100 L1240 120 Z" />
        </g>
        <g>
          <rect x="450" y="70" width="34" height="110" fill="#f4f1ea" />
          <path d="M450 70 L467 52 L484 70 Z" fill="#8a4f2e" />
          <rect x="459" y="90" width="16" height="24" fill="#0e4b4a" />
          <rect x="1020" y="78" width="30" height="102" fill="#f4f1ea" />
          <path d="M1020 78 L1035 62 L1050 78 Z" fill="#8a4f2e" />
          <rect x="1028" y="96" width="14" height="22" fill="#0e4b4a" />
        </g>
        <g stroke="#2f4a3a" strokeWidth="6" strokeLinecap="round">
          <line x1="240" y1="180" x2="240" y2="132" />
          <line x1="760" y1="180" x2="760" y2="130" />
          <line x1="1300" y1="180" x2="1300" y2="134" />
        </g>
        <g fill="#2f4a3a">
          <ellipse cx="240" cy="126" rx="34" ry="12" />
          <ellipse cx="760" cy="124" rx="36" ry="12" />
          <ellipse cx="1300" cy="128" rx="32" ry="11" />
        </g>
      </g>
      {/* Capa delantera: costa y roques */}
      <g className="hidden sm:block">
        <path d="M0 180 L1440 180 L1440 220 L0 220 Z" fill="#0e4b4a" />
        <path d="M80 200 L150 165 L220 200 Z" fill="#123332" />
        <path d="M1150 205 L1230 160 L1310 205 Z" fill="#123332" />
        <ellipse cx="650" cy="205" rx="110" ry="14" fill="#123332" />
      </g>
    </svg>
  );
}
