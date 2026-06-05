interface ProofLogoProps {
  size?: number;
  className?: string;
}

export function ProofLogo({ size = 20, className = '' }: ProofLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Two overlapping rotated rectangles — minimalist geometric mark */}
      <rect
        x="4"
        y="4"
        width="12"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-6 10 12)"
      />
      <rect
        x="8"
        y="4"
        width="12"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(6 14 12)"
      />
    </svg>
  );
}
