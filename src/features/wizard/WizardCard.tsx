import { type ReactNode } from 'react';
import { motion } from 'motion/react';

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    scale: 0.99,
  }),
};

interface WizardCardProps {
  children: ReactNode;
  direction: number;
  sectionKey: string;
}

export default function WizardCard({ children, direction, sectionKey }: WizardCardProps) {
  return (
    <motion.div
      key={sectionKey}
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 350, damping: 30, mass: 0.6 },
        opacity: { duration: 0.2, ease: 'easeOut' },
        scale: { duration: 0.2, ease: 'easeOut' },
      }}
      className="w-full max-w-full sm:max-w-[680px] mx-auto"
    >
      <div
        className="relative p-8 sm:p-10 lg:p-12 rounded-lg"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
