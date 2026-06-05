import { lazy, Suspense, useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useResumeStore } from '../../store/resumeStore';
import { Button } from '@/components/ui/button';
import SingleColumnLayout from '../preview/layouts/SingleColumnLayout';
import TwoColumnLayout from '../preview/layouts/TwoColumnLayout';
import SidebarLayout from '../preview/layouts/SidebarLayout';
import TemplateSelector from '../templates/TemplateSelector';
import { hasResumeContent } from '../preview/utils/hasResumeContent';
import { Download, FileText, X } from 'lucide-react';

// Lazy-load ExportDialog
const ExportDialog = lazy(() => import('../export/ExportDialog'));

interface FloatingPreviewProps {
  expanded: boolean;
  onClose: () => void;
}

export default function FloatingPreview({ expanded, onClose }: FloatingPreviewProps) {
  const { t } = useTranslation();
  const resume = useResumeStore((s) => s.resume);
  const template = useResumeStore((s) => s.template);
  const [showExport, setShowExport] = useState(false);

  // Escape key handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && expanded) {
      onClose();
    }
  }, [expanded, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  const hasContent = hasResumeContent(resume);

  return (
    <AnimatePresence>
      {expanded && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full sm:w-[480px]"
            style={{
              background: 'var(--bg)',
              borderLeft: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xl)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label={t('preview.title')}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
            >
              <div className="section-heading mb-0">{t('preview.title')}</div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setShowExport(true)}
                  className="gap-1.5 rounded-xl"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('actions.export')}</span>
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label={t('preview.close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-subtle)' }}>
              {/* Resume preview */}
              <div className="p-4">
                <div
                  className="rounded-lg resume-preview-content"
                  style={{
                    background: '#ffffff',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border)',
                    minHeight: '400px',
                  }}
                >
                  {hasContent ? (
                    <>
                      {template.layout === 'sidebar' ? (
                        <SidebarLayout resume={resume} template={template} />
                      ) : template.layout === 'two-column' ? (
                        <TwoColumnLayout resume={resume} template={template} />
                      ) : (
                        <SingleColumnLayout resume={resume} template={template} />
                      )}
                    </>
                  ) : (
                    <div className="empty-state py-20">
                      <div className="empty-state-icon" style={{ width: 48, height: 48 }}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="empty-state-title">{t('preview.empty')}</div>
                      <div className="empty-state-desc">{t('preview.emptyDesc')}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template selector */}
              <div
                className="px-4 pb-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="pt-4">
                  <TemplateSelector />
                </div>
              </div>
            </div>

            {/* Export dialog with lazy loading */}
            {showExport && (
              <Suspense fallback={null}>
                <ExportDialog onClose={() => setShowExport(false)} />
              </Suspense>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
