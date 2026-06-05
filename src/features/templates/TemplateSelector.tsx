import { useRef, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useResumeStore } from '../../store/resumeStore';
import { templates } from './templateRegistry';
import { Check } from 'lucide-react';

const templateNameKeys = {
  classic: 'template.classic',
  minimal: 'template.minimal',
  modern: 'template.modern',
  executive: 'template.executive',
} as const;

const layoutKeys = {
  'single-column': 'template.single',
  'two-column': 'template.twoCol',
  'sidebar': 'template.sidebar',
} as const;

function TemplateCard({
  tmpl,
  isActive,
  onClick,
}: {
  tmpl: typeof templates[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);
  const nameKey = templateNameKeys[tmpl.id as keyof typeof templateNameKeys];

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-pressed={isActive}
      className="relative flex flex-col items-start gap-2 p-3.5 rounded-xl text-left"
      style={{
        background: isActive ? 'var(--accent-dim)' : 'var(--bg)',
        border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        boxShadow: isActive
          ? '0 0 20px var(--accent-glow), var(--shadow-md)'
          : 'var(--shadow-sm)',
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Layout preview mini */}
      <div
        className="w-full h-10 rounded-md overflow-hidden mb-1"
        style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
        }}
      >
        {tmpl.layout === 'sidebar' ? (
          <div className="flex h-full">
            <div className="w-1/3 h-full" style={{ background: tmpl.colors.primary, opacity: 0.3 }} />
            <div className="flex-1 p-1">
              <div className="h-1 w-3/4 rounded-sm mb-0.5" style={{ background: 'var(--text-muted)', opacity: 0.3 }} />
              <div className="h-1 w-1/2 rounded-sm" style={{ background: 'var(--text-muted)', opacity: 0.2 }} />
            </div>
          </div>
        ) : tmpl.layout === 'two-column' ? (
          <div className="flex h-full p-1 gap-1">
            <div className="flex-1">
              <div className="h-1 w-full rounded-sm mb-0.5" style={{ background: 'var(--text-muted)', opacity: 0.3 }} />
              <div className="h-1 w-2/3 rounded-sm" style={{ background: 'var(--text-muted)', opacity: 0.2 }} />
            </div>
            <div className="flex-1">
              <div className="h-1 w-full rounded-sm mb-0.5" style={{ background: 'var(--text-muted)', opacity: 0.2 }} />
              <div className="h-1 w-1/2 rounded-sm" style={{ background: 'var(--text-muted)', opacity: 0.15 }} />
            </div>
          </div>
        ) : (
          <div className="p-1">
            <div className="h-1 w-1/2 mx-auto rounded-sm mb-0.5" style={{ background: 'var(--text-muted)', opacity: 0.3 }} />
            <div className="h-1 w-3/4 mx-auto rounded-sm" style={{ background: 'var(--text-muted)', opacity: 0.2 }} />
          </div>
        )}
      </div>

      {/* Color dots + Name */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex gap-0.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: tmpl.colors.primary }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: tmpl.colors.accent }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-medium truncate"
            style={{ color: isActive ? 'var(--accent)' : 'var(--text)' }}
          >
            {nameKey ? t(nameKey) : tmpl.name}
          </div>
          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {t(layoutKeys[tmpl.layout] || tmpl.layout)}
          </div>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent)' }}
          >
            <Check className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

export default function TemplateSelector() {
  const { t } = useTranslation();
  const template = useResumeStore((s) => s.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);

  return (
    <div>
      <div className="section-heading mb-3">{t('template.title')}</div>
      <div className="grid grid-cols-2 gap-2.5">
        {templates.map((tmpl) => (
          <TemplateCard
            key={tmpl.id}
            tmpl={tmpl}
            isActive={template.id === tmpl.id}
            onClick={() => setTemplate(tmpl)}
          />
        ))}
      </div>
    </div>
  );
}
