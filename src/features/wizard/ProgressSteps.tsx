import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { steps } from '../editor/steps';
import { useResumeStore } from '../../store/resumeStore';
import type { SectionId } from '../../store/resumeStore';
import { isSectionComplete } from '../editor/utils';
import type { KeyboardEvent } from 'react';

interface ProgressStepsProps {
  activeSection: SectionId;
  onSectionChange: (id: SectionId) => void;
}

export default function ProgressSteps({ activeSection, onSectionChange }: ProgressStepsProps) {
  const { t } = useTranslation();
  const resume = useResumeStore((s) => s.resume);

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentIdx = steps.findIndex((s) => s.id === activeSection);
    if (e.key === 'ArrowRight' && currentIdx < steps.length - 1) {
      e.preventDefault();
      onSectionChange(steps[currentIdx + 1].id);
    } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
      e.preventDefault();
      onSectionChange(steps[currentIdx - 1].id);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center gap-4 sm:gap-6 py-5"
      role="tablist"
      aria-label={t('progress.title')}
      onKeyDown={handleKeyDown}
    >
      {/* Horizontal connector line */}
      <div
        className="absolute top-[13px] left-[15%] right-[15%] h-[1px]"
        style={{ background: 'var(--border)' }}
      />

      {steps.map((step, idx) => {
        const isActive = step.id === activeSection;
        const isDone = isSectionComplete(step.id, resume);
        const Icon = step.icon;

        return (
          <div key={step.id} className="relative flex flex-col items-center">
            {/* Step circle */}
            <motion.button
              onClick={() => onSectionChange(step.id)}
              className="relative z-10 rounded-full flex items-center justify-center cursor-pointer"
              role="tab"
              aria-selected={isActive}
              aria-label={t(step.labelKey)}
              animate={{
                width: isActive ? 26 : 22,
                height: isActive ? 26 : 22,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{
                background: isActive
                  ? 'var(--accent)'
                  : isDone
                  ? 'var(--color-success)'
                  : 'var(--bg)',
                border: isActive
                  ? '1.5px solid var(--accent)'
                  : isDone
                  ? '1.5px solid var(--color-success)'
                  : '1px solid var(--border)',
                boxShadow: isActive
                  ? '0 0 12px var(--accent-glow)'
                  : 'none',
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {isDone && !isActive ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="icon"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Icon
                      className="w-3 h-3"
                      style={{ color: isActive ? 'white' : 'var(--text-muted)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Step number — subtle below circle */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
