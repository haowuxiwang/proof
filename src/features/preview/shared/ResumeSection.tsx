import type { ReactNode } from 'react';

interface ResumeSectionProps {
  title: string;
  color: string;
  fontFamily: string;
  children: ReactNode;
  variant?: 'classic' | 'minimal' | 'modern';
}

export default function ResumeSection({
  title,
  color,
  fontFamily,
  children,
  variant = 'classic',
}: ResumeSectionProps) {
  if (variant === 'minimal') {
    return (
      <div className="mb-5">
        <h2
          className="text-xs font-semibold mb-3 uppercase tracking-wider"
          style={{
            color,
            fontFamily,
            letterSpacing: '0.1em',
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    );
  }

  if (variant === 'modern') {
    return (
      <div className="mb-6">
        <h2
          className="text-xs font-semibold pb-1.5 mb-3 uppercase tracking-wider"
          style={{
            color,
            fontFamily,
            borderBottom: `1px solid ${color}30`,
            letterSpacing: '0.08em',
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    );
  }

  // Classic (default)
  return (
    <div className="mb-7">
      <h2
        className="text-sm font-semibold pb-2 mb-4 uppercase tracking-wider"
        style={{
          color,
          fontFamily,
          borderBottom: `2px solid ${color}`,
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
