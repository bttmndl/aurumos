export default function Ingot({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="grms-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6dd8b" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a67c1a" />
        </linearGradient>
      </defs>
      <path
        d="M9 11 L23 11 L27 22 L5 22 Z"
        fill="url(#grms-gold)"
        stroke="#7a5a12"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <path d="M9 11 L11 14 L21 14 L23 11 Z" fill="#fbeec0" opacity="0.65" />
    </svg>
  );
}
