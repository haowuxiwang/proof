import { type ReactNode } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedList({ children, className }: AnimatedListProps) {
  const [ref] = useAutoAnimate<HTMLDivElement>({
    duration: 200,
    easing: 'ease-in-out',
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
