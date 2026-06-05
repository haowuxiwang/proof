import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Trash2, Check } from 'lucide-react';
import { Spotlight } from '@/components/magicui';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  onDelete?: () => void;
  defaultExpanded?: boolean;
  children: ReactNode;
  isComplete?: boolean;
}

export default function ExpandableCard({
  title,
  subtitle,
  onDelete,
  defaultExpanded = false,
  children,
  isComplete,
}: ExpandableCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      layout
      className="relative group"
      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
    >
      <Spotlight spotlightColor="rgba(59, 130, 246, 0.06)">
        <motion.div
          className="card"
          style={expanded ? {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 1px var(--accent-dim), 0 8px 24px rgba(0,0,0,0.06)',
          } : {}}
          whileHover={!expanded ? {
            y: -2,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div
            className="card-header"
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <motion.div
                animate={{ rotate: expanded ? 0 : -90 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                <ChevronDown className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
              </motion.div>
              <div className="min-w-0 flex items-center gap-2">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                  {title || t('expandableCard.untitled')}
                </div>
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-success)' }} />
                  </motion.div>
                )}
              </div>
            </div>
            {subtitle && (
              <div className="text-xs truncate mr-auto ml-3" style={{ color: 'var(--text-muted)' }}>
                {subtitle}
              </div>
            )}
            {onDelete && (
              <motion.button
                className="btn-icon danger shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                aria-label={t('resume.delete')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { type: 'spring', stiffness: 300, damping: 28, mass: 0.8 },
                  opacity: { duration: 0.2, ease: 'easeOut' },
                }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div
                  className="card-body"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05, duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Spotlight>
    </motion.div>
  );
}
