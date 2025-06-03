import type React from 'react';

const NourishNetPinIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Pin shape */}
    <path
      d="M16 2C9.92487 2 5 6.92487 5 13C5 22 16 30 16 30C16 30 27 22 27 13C27 6.92487 22.0751 2 16 2Z"
      fill="#A8D5BA" // Light green from logo image
      stroke="#3A7D44" // Dark green from logo image
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Simplified Fork */}
    <path
      d="M16 10V18M13 13L16 10L19 13"
      stroke="#000000" // Black, as in logo
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Simplified Cycle Dots */}
    <circle cx="16" cy="14" r="4.5" stroke="#000000" strokeWidth="1" fill="none" strokeDasharray="2 2" />
    <circle cx="16" cy="9.5" r="1" fill="#000000" />
    <circle cx="20.5" cy="15.5" r="1" fill="#000000" />
    <circle cx="11.5" cy="15.5" r="1" fill="#000000" />
  </svg>
);

export default NourishNetPinIcon;
