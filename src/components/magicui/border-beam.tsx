import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 250,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#3b82f6",
  colorTo = "#8b5cf6",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={{
        "--border-beam-size": `${size}px`,
        "--border-beam-duration": `${duration}s`,
        "--border-beam-anchor": `${anchor}%`,
        "--border-beam-border-width": `${borderWidth}px`,
        "--border-beam-color-from": colorFrom,
        "--border-beam-color-to": colorTo,
        "--border-beam-delay": `-${delay}s`,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          padding: "var(--border-beam-border-width)",
          background: `conic-gradient(from var(--border-beam-anchor), transparent, var(--border-beam-color-from), var(--border-beam-color-to), transparent) var(--border-beam-size)`,
          animation: `border-beam-rotate var(--border-beam-duration) linear infinite`,
          animationDelay: "var(--border-beam-delay)",
        }}
      />
      <style>{`
        @keyframes border-beam-rotate {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
}
