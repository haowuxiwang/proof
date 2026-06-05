import type { ReactNode } from 'react';

interface SectionGroupProps {
  title: string;
  children: ReactNode;
  showDivider?: boolean;
}

export default function SectionGroup({ title, children, showDivider = true }: SectionGroupProps) {
  return (
    <div className="mb-6">
      <h3
        className="text-[11px] font-medium tracking-wide uppercase mb-4 text-neutral-400"
        style={{ letterSpacing: '0.1em' }}
      >
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
      {showDivider && (
        <div
          className="mt-6 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3), transparent)',
          }}
        />
      )}
    </div>
  );
}
